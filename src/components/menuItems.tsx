import { JSX, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoIosPeople } from "react-icons/io";
import { IoQrCodeOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
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
      icon: <GoHome className="w-5 h-5" />,
    },
    {
      name: "Products",
      icon: <AiOutlineProduct className="w-5 h-5" />,
      // count: 12,
      url: "/products",
      subMenu: [
        {
          name: 'Category',
          icon: <MdOutlineCategory className="w-5 h-5"/>,
          url: '/products/categories',
        }
      ]
    },
    {
      name: "Orders",
      icon: < BiPurchaseTagAlt  className="w-5 h-5" />,
      url: "/orders"
    },
    {
      name: "Customers",
      url: "/customers",
      icon: <IoIosPeople className="w-5 h-5" />,
    },
    {
      name: "Qr Code",
      url: "/qr-code",
      icon: <IoQrCodeOutline className="w-5 h-5"/>,
    },
    {
      name: "Discount",
      url: "/discount",
      icon: <CiDiscount1 className="w-5 h-5"/>,
    },
  
  ]);

  return menuItems;
};

export default useMenuItems;
