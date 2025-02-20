import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { GlobalContext } from "../contexts/GlobalContext";

export default function RootLayout({
  children,
}: {
  children?: any;
}) {
    const {openHeaderSidebar, toggleHeaderSidebar} = useContext(GlobalContext)
  return (
    <div>
      <div className="flex gap-0 w-full bg-white dark:bg-gray-800 text-black dark:text-white">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div
            className={`bg-slate-50 dark:bg-slate-800 p-6 h-screen overflow-auto ${openHeaderSidebar ? 'ml-0 mh:ml-[250px] blur-md mh:blur-none' : 'ml-0 mh:ml-12'} duration-200`}
          >
            {children}
            <Outlet/>
          </div>
        </div>
      </div>
      
    </div>
  );
}
