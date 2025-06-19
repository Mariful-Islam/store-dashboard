import React, { ButtonHTMLAttributes } from "react";

interface StoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btntype?:
    | "Outline"
    | "Normal"
    | "Danger"
    | "DangerOutline"
    | "Warning"
    | "white-btn"
    | "circle";
}

function Button(rest: StoreButtonProps) {
  return (
    <button
      {...rest}
      className={`
          ${
            rest.btntype === "Outline" &&
            `px-4 py-1 duration-200 text-sm font-medium border border-blue-500 rounded-sm text-blue-500 hover:text-white hover:bg-blue-500`
          }
            ${
              rest.btntype === "Normal" &&
              `${
                !rest.disabled
                  ? "border border-blue-500 bg-blue-500 hover:bg-blue-700"
                  : "border border-blue-200 bg-blue-200"
              } px-4 py-1 duration-200 text-sm font-medium  hover:border-blue-400 rounded-sm text-white hover:text-white `
            }
            ${
              rest.btntype === "Danger" &&
              `px-4 py-1 duration-200 text-sm font-medium border border-red-500 hover:border-red-400 rounded-sm text-white hover:text-white bg-red-500 hover:bg-red-400`
            }
            ${
              rest.btntype === "DangerOutline" &&
              `px-4 py-1 duration-200 text-sm font-medium border border-red-500 hover:border-red-400 rounded-sm text-red-500 hover:text-white hover:bg-red-500`
            }
            ${
              rest.btntype === "Warning" &&
              `px-4 py-1 duration-200 text-sm font-medium border border-yellow-500 hover:border-yellow-500 rounded-sm text-white bg-yellow-500 hover:bg-yellow-400`
            }
            ${
              rest.btntype === "white-btn" &&
              `border border-gray-200 dark:border-gray-700 p-[6px] rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-white dark:hover:bg-black duration-150`
            }
                ${
                  rest.btntype === "circle" &&
                  `border border-gray-200 dark:border-gray-700 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-white dark:hover:bg-black duration-150`
                }

            ${rest.className}

            cursor-pointer
          
        `}
    >
      {rest.children}
    </button>
  );
}

export default Button;
