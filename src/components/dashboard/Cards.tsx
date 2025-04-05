import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";



interface CardsProps {
  data: any;
}

export default function Cards({ data }: CardsProps) {

  interface cardItemsProps {
      label: string;
      icon: any;
      value: string;
  }

  const cardItems: cardItemsProps[] = [
      {
          label: "Order",
          icon: <MdOutlineSell className="text-blue-500 dark:text-blue-100"/>,
          value: data?.totol_order
      },
      {
          label: "Product", 
          icon: <AiOutlineProduct className="text-blue-500 dark:text-blue-100"/>,
          value: data?.total_variant

      },
      {
          label: "Customer",
          icon: <FaPeopleGroup className="text-blue-500 dark:text-blue-100"/>,
          value: data?.customers
      },
      {
          label: "Stock",
          icon: <TbBuildingWarehouse className="text-blue-500 dark:text-blue-100"/>,
          value: data?.stock
      }
      
  ]

  return (
    <div className="grid grid-cols-2 ml:grid-cols-4 gap-3">
      {cardItems.map((item, index)=>(
        <div key={index} className="p-4 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="bg-blue-100 dark:bg-blue-950 w-fit rounded-full p-2">
                {item.icon}
              </div>
              <div className="text-blue-500 font-bold dark:text-blue-100">{item.label}</div>
            </div>

            <div className="text-3xl font-bold text-blue-500 dark:text-blue-100">{item?.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
