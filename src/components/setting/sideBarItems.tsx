import React from "react";
import { CiBellOn, CiCreditCard2, CiUser } from "react-icons/ci";

interface SidebarProps{
    name: string;
    url: string;
    icon: React.ReactNode;
}

export const sideBarItems: SidebarProps[] = [
    {
        name: 'Profile',
        url: '/store-settings/',
        icon: <CiUser className="w-5 h-5" />
    },
    {
        name: 'Notification',
        url: '/store-settings/notification',
        icon: <CiBellOn className="w-5 h-5" />
    },
    {
        name: 'Payment',
        url: '/store-settings/payment',
        icon: <CiCreditCard2 className="w-5 h-5" />
    },
    // {
    //     name: 'Profile',
    //     url: '/profile',
    //     icon: <CiUser />
    // },
    // {
    //     name: 'Profile',
    //     url: '/profile',
    //     icon: <CiUser />
    // },

]