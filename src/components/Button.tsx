import React, { useRef, useState } from "react";

interface OutlineButtonProps {
  children: React.ReactNode;
  type?:
    | "Outline"
    | "Normal"
    | "Danger"
    | "DangerOutline"
    | "Warning"
    | "white-btn";
  submit?: boolean;
  onClick?: (e: any) => void;
  className?: string;
  hoverText?: string;
  hoverTextAlignClass?: string;
  disable?: boolean;
}

function Button({
  children,
  type,
  submit,
  onClick,
  className,
  hoverText,
  hoverTextAlignClass = "-top-10",
  disable,
}: OutlineButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimeout = useRef<any>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowTooltip(true);
    }, 1000); // Show after 3 seconds
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setShowTooltip(false); // Hide immediately
    setIsHover(false);
  };

  return (
    <div className="relative">
      {showTooltip && hoverText && (
        <div
          className={`absolute ${hoverTextAlignClass} border border-gray-300 bg-gray-800 text-white rounded-md px-4 py-1 z-10`}
        >
          {hoverText}
        </div>
      )}
      <button
        type={submit ? "submit" : "button"}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          ${
            type === "Outline" &&
            `px-4 py-1 duration-200 text-sm font-medium border border-blue-500 rounded-sm text-blue-500 hover:text-white hover:bg-blue-500`
          }
            ${
              type === "Normal" &&
              `${
                !disable
                  ? "border border-blue-500 bg-blue-500 hover:bg-blue-700"
                  : "border border-blue-200 bg-blue-200"
              } px-4 py-1 duration-200 text-sm font-medium  hover:border-blue-400 rounded-sm text-white hover:text-white `
            }
            ${
              type === "Danger" &&
              `px-4 py-1 duration-200 text-sm font-medium border border-red-500 hover:border-red-400 rounded-sm text-white hover:text-white bg-red-500 hover:bg-red-400`
            }
            ${
              type === "DangerOutline" &&
              `px-4 py-1 duration-200 text-sm font-medium border border-red-500 hover:border-red-400 rounded-sm text-red-500 hover:text-white hover:bg-red-500`
            }
            ${
              type === "Warning" &&
              `px-4 py-1 duration-200 text-sm font-medium border border-yellow-500 hover:border-yellow-500 rounded-sm text-white bg-yellow-500 hover:bg-yellow-400`
            }
            ${
              type === "white-btn" &&
              `border border-gray-200 dark:border-gray-700 p-[6px] rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-white dark:hover:bg-black duration-150`
            }
            ${className}
          
        `}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
