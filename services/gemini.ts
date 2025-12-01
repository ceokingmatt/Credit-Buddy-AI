
import { GoogleGenAI, Type } from "@google/genai";
import { DisputeItem, ClientInfo, DisputeStrategy, ScanInput } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const EXTRACTION_MODEL = "gemini-2.5-flash";
const LETTER_MODEL = "gemini-2.5-flash";

export const extractDisputeItems = async (input: ScanInput): Promise<Partial<DisputeItem>[]> => {
  try {
    let contents;
    
    if (input.type === 'file') {
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: input.mimeType,
              data: input.value
            }
          },
          { 
            text: `Analyze this credit report document (PDF or Image) and extract all negative items, collections, charge-offs, or late payments. Return a list of these items.` 
          }
        ]
      };
    } else {
      contents = `Analyze the following credit report text and extract all negative items, collections, charge-offs, or late payments. 
      Return a list of these items.
      
      Credit Report Text:
      ${input.value}`;
    }

    const response = await ai.models.generateContent({
      model: EXTRACTION_MODEL,
      contents: contents,
      config: {
        systemInstruction: "You are an expert credit report analyst. Your job is to extract negative items from unstructured text, PDFs, or images of credit reports.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              creditorName: { type: Type.STRING, description: "Name of the creditor or collection agency" },
              accountNumber: { type: Type.STRING, description: "Account number" },
              reason: { type: Type.STRING, description: "Why this is negative (e.g., Late Payment, Charge Off)" },
              amount: { type: Type.STRING, description: "Amount owed, if available" },
              status: { type: Type.STRING, description: "Current status of the account" }
            },
            required: ["creditorName", "reason", "status"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Extraction Failed:", error);
    throw new Error("Failed to analyze report. Please try again.");
  }
};

export const generateLetterContent = async (
  client: ClientInfo,
  items: DisputeItem[],
  bureauName: string,
  round: number = 1
): Promise<string> => {
  try {
    // ---------------------------------------------------------
    // 🧠 DYNAMIC STRATEGY ENGINE BASED ON ROUNDS
    // ---------------------------------------------------------
    
    let toneInstruction = "";
    let legalInstruction = "";
    let openingStyle = "";

    if (round === 1) {
        // ROUND 1: The "Confused Consumer" (Human, Not Litigious yet)
        // Goal: Bypass OCR/e-OSCAR filters by sounding like a real person.
        toneInstruction = "TONE: Confused, polite, but concerned. You are a regular person who pulled their report and found mistakes. Do NOT sound like a lawyer or a repair template.";
        legalInstruction = "Do NOT quote specific laws (like 'Pursuant to FCRA 611') yet. Just state the facts: these items are wrong or you don't recognize them.";
        openingStyle = "Start by saying you were looking at your credit report to buy a house/car and noticed some things that don't look right.";
    } else if (round === 2) {
        // ROUND 2: The "Frustrated Citizen" (Procedural Challenge)
        // Goal: Challenge the "Verification" if they ignored Round 1.
        toneInstruction = "TONE: Frustrated and firm. You already asked them to fix this, and they didn't. You are now annoying.";
        legalInstruction = "Demand the 'Method of Verification'. Reference FCRA Section 611 (15 U.S.C. § 1681i). Ask for the specific name and phone number of the person who verified the debt.";
        openingStyle = "State clearly: 'I previously disputed these items, and you failed to conduct a reasonable investigation.'";
    } else {
        // ROUND 3+: The "Litigious Threat" (Aggressive)
        // Goal: Threaten legal action and CFPB complaints.
        toneInstruction = "TONE: Extremely aggressive, formal, and litigious. You are preparing to sue.";
        legalInstruction = "Cite FCRA Section 616 (Civil Liability) and Section 617. Threaten to file complaints with the CFPB (Consumer Financial Protection Bureau) and the FTC immediately.";
        openingStyle = "FINAL NOTICE: You are knowingly reporting inaccurate information in violation of federal law.";
    }

    const prompt = `
      Write a highly personalized credit dispute letter to ${bureauName} from ${client.fullName}.
      
      CURRENT ROUND: ${round}
      
      SENDER INFO:
      ${client.fullName}
      ${client.address}
      ${client.city}, ${client.state} ${client.zip}
      DOB: ${client.dob}
      SSN: ***-**-${client.ssnLast4}
      
      *** STRATEGY INSTRUCTIONS (FOLLOW STRICTLY) ***
      1. ${toneInstruction}
      2. ${legalInstruction}
      3. ${openingStyle}
      
      *** HUMANIZATION RULES (CRITICAL) ***
      - **NO ROBOTIC LANGUAGE**: Do NOT use phrases like "I am writing to you pursuant to..." or "Please delete the following." 
      - **Make it flow**: Use transition words. Sound like a human telling a story about why these accounts are wrong.
      - **Mention Impact**: Briefly mention how this is hurting you (e.g., "This is stressing me out" or "I need to fix this for my mortgage").
      - **Vary the phrasing**: Do not use the same sentence structure for every account.
      
      ITEMS TO DISPUTE:
      ${items.map(item => `
        - Creditor: ${item.creditorName}
        - Account Number: ${item.accountNumber ? item.accountNumber.replace(/[*]/g, '') : 'Unknown'}
        - The Issue: ${item.reason}
        - Current Status on Report: ${item.status}
      `).join('\n')}
      
      FORMATTING:
      - Plain text, single spaced.
      - Clearly list the account numbers so the scanner reads them, but embed them in the natural text if possible (e.g., "The account ending in 1234 from Chase...").
      - Sign off as ${client.fullName}.
    `;

    const response = await ai.models.generateContent({
      model: LETTER_MODEL,
      contents: prompt,
      config: {
        temperature: 0.85, // Higher temp for more "human" variance and less robotic output
      }
    });

    return response.text || "Error generating letter.";
  } catch (error) {
    console.error("Letter Gen Failed:", error);
    throw new Error("Failed to generate letter.");
  }
};
