import { JSX, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { IoIosPeople } from "react-icons/io";
import { RiUserLine } from "react-icons/ri";


export type MenuItemType = {
  name: string;
  url?: string;
  icon: JSX.Element;
  count?: number,
  subMenu?: any[];
};

const useMenuItems = () => {
  const [menuItems] = useState<MenuItemType[]>([
    {
      name: "Home",
      url: "/",
      icon: <GoHome className="w-6 h-6" />,
    },
    {
      name: "Products",
      icon: <AiOutlineProduct className="w-6 h-6" />,
      // count: 12,
      url: "/products"
    },
    {
      name: "Orders",
      icon: < BiPurchaseTagAlt  className="w-6 h-6" />,
      url: "/orders"
    },
    {
      name: "Customers",
      url: "/customers",
      icon: <IoIosPeople className="w-6 h-6" />,
    },
     {
      name: "Retailers",
      url: "/retailers",
      icon: <RiUserLine className="w-6 h-6"/>,
    },
  
  ]);

  return menuItems;
};

export default useMenuItems;
