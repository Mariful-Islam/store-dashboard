import React from "react";

interface OutlineButtonProps {
  children: React.ReactNode;
  type: "Outline" | "Normal" | "Danger" | "DangerOutline" | "Warning";
  submit?: boolean;
  onClick?: (e:any) => void;
  className?: string;
}

function Button({ children, type, submit, onClick, className }: OutlineButtonProps) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={`
          ${
            type === "Outline" &&
            "px-4 py-1 duration-200 text-sm font-medium border border-blue-500 rounded-sm text-blue-500 hover:text-white hover:bg-blue-500"
          }
            ${
              type === "Normal" &&
              "px-4 py-1 duration-200 text-sm font-medium border border-blue-500 hover:border-blue-400 rounded-sm text-white hover:text-white bg-blue-500 hover:bg-blue-400"
            }
            ${
              type === "Danger" &&
              "px-4 py-1 duration-200 text-sm font-medium border border-red-500 hover:border-red-400 rounded-sm text-white hover:text-white bg-red-500 hover:bg-red-400"
            }
            ${
              type === "DangerOutline" &&
              "px-4 py-1 duration-200 text-sm font-medium border border-red-500 hover:border-red-400 rounded-sm text-red-500 hover:text-white hover:bg-red-500"
            }
            ${
              type === "Warning" &&
              "px-4 py-1 duration-200 text-sm font-medium border border-yellow-500 hover:border-yellow-500 rounded-sm text-white bg-yellow-500 hover:bg-yellow-400"
            }
            ${className}
          
        `}
    >
      {children}
    </button>
  );
}

export default Button;
