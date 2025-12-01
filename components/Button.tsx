import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading,
  icon,
  ...props 
}) => {
  // Base Styles
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-white transform hover:-translate-y-0.5 active:translate-y-0";
  
  const variants = {
    // Red -> Orange Gradient for new Brand
    primary: "bg-gradient-to-r from-[#DC2626] to-[#FF3B30] text-white shadow-[0_4px_14px_0_rgba(220,38,38,0.4)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.3)] border border-transparent",
    
    // Light Mode Secondary
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 shadow-sm",
    
    // Ghost
    ghost: "text-gray-500 hover:text-brand-neon hover:bg-brand-neon/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon}
          {children}
        </span>
      )}
    </button>
  );
};