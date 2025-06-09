import React, { useContext, useEffect, useState } from "react";

import { CiBellOn, CiMail, CiMenuFries, CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Search from "./Search";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineNightlight } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";
import { Tooltip } from "react-tooltip";

function Header() {
  const { openHeaderSidebar, toggleHeaderSidebar } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const {theme, handleTheme} = useTheme()

  useEffect(() => {
    if (window.innerWidth < 860) {
      toggleHeaderSidebar();
    }
  }, [pathname]);

  return (
    <div
      className={`sticky z-50 dark:bg-gray-800 bg-white top-0 right-0 border-b border-slate-200 dark:border-slate-600 ${
        openHeaderSidebar && " blur-md mh:blur-none"
      }`}
    >
      <div className="flex items-center gap-4 sm:gap-8 pr-10">
        <div
          className="flex mh:hidden flex-col gap-[6px] pl-6"
          role="button"
          onClick={toggleHeaderSidebar}
        >
          <CiMenuFries className=" rotate-180" />
        </div>
        <div className="flex gap-4 mh:gap-8 items-center w-full justify-end py-2 pr-4 pl-2 mh:pl-10">
          <button
            className="flex gap-2 items-center text-slate-500 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-slate-700 p-1 rounded-full"
            onClick={() => setIsOpenSearch(true)}
            data-tooltip-id={`search`} data-tooltip-content={'Search'}
          >
            <CiSearch className="w-5 h-5" />{" "}
          </button>

          <Tooltip id={`search`} place="bottom" style={{fontSize: 12, fontWeight: 'bold'}}/>

          {isOpenSearch && (
            <Search
              isOpen={isOpenSearch}
              onClose={() => setIsOpenSearch(!isOpenSearch)}
            />
          )}
        </div>

        <button>
          <div data-tooltip-id={`message`} data-tooltip-content={'Message'} className=" relative cursor-pointer p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-700 duration-200">
            <CiMail className="h-5 w-5 " />

            <div className="bg-blue-500 text-white rounded-full w-[14px] h-[14px] absolute -top-0 -right-0 text-[8px] flex justify-center items-center">
              33
            </div>
          </div>
        </button>
        <Tooltip id={`message`} place="bottom" style={{fontSize: 12, fontWeight: 'bold'}}/>

        

        <button>
          <div data-tooltip-id={`notification`} data-tooltip-content={'Notification'} className=" relative cursor-pointer p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-700 duration-200">
            <CiBellOn className="h-5 w-5 " />
            <div className="bg-blue-500 text-white rounded-full w-[14px] h-[14px] absolute -top-0 -right-0 text-[8px] flex justify-center items-center">
              33
            </div>
          </div>
        </button>
        <Tooltip id={`notification`} place="bottom" style={{fontSize: 12, fontWeight: 'bold'}}/>


        {/* <ThemeToggle /> */}
        <div
          data-tooltip-id={`dark-light`} data-tooltip-content={'Dark Light Switch'}
          onClick={handleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-700 duration-200"
        >
          {theme === "light" ? (
            <IoSunnyOutline className="text-black w-5 h-5" />
          ) : (
            <MdOutlineNightlight className="text-white w-4 h-4" />
          )}
        </div>

        <Tooltip id={`dark-light`} place="bottom" style={{fontSize: 12, fontWeight: 'bold'}}/>

        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-slate-400 rounded-full max-w-8 min-w-8 h-8 "></div>
            <div className=" font-bold text-nowrap hidden sm:block">
              Md Mariful Islam
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
