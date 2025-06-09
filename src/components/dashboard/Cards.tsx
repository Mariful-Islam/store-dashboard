import React, { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { API_URL } from "../../api/interceptor";
import { useApi } from "../../api/api";
import { useSearchParams } from "react-router-dom";

interface cardItemsProps {
  label: string;
  icon: any;
  value: string;
}

export default function Cards() {
  const api = useApi();
  const [data, setData] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams()

  const fetchDashboardDetail = (searchParams:any) => {
    api
      .getDashboard(searchParams)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => console.log("Error"));
  };

  useEffect(() => {
    fetchDashboardDetail(searchParams);
  }, [searchParams]);

  useEffect(() => {
    const ws = new WebSocket(`${API_URL}/ws/dashboard/cards/`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ value: "hello how are you" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
    };

    ws.onclose = () => {
      console.log("Disconnected.........");
    };
  }, []);


  const cardItems: cardItemsProps[] = [
    {
      label: "Order",
      icon: <MdOutlineSell className="text-blue-500 dark:text-blue-100" />,
      value: data?.total_orders,
    },
    {
      label: "Product",
      icon: <AiOutlineProduct className="text-blue-500 dark:text-blue-100" />,
      value: data?.total_variant,
    },
    {
      label: "Customer",
      icon: <FaPeopleGroup className="text-blue-500 dark:text-blue-100" />,
      value: data?.customers,
    },
    {
      label: "Stock",
      icon: (
        <TbBuildingWarehouse className="text-blue-500 dark:text-blue-100" />
      ),
      value: data?.stock,
    },
  ];

  return (
    <div className="grid grid-cols-2 ml:grid-cols-4 gap-3">
      {cardItems.map((item, index) => (
        <div
          key={index}
          className="p-4 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900"
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="bg-blue-50 dark:bg-blue-950 w-fit rounded-full p-2">
                {item.icon}
              </div>
              <div className="text-blue-500 font-bold dark:text-blue-100">
                {item.label}
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-500 dark:text-blue-100">
              {item?.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
