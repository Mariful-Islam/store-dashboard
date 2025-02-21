import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { useApi } from "../api/api";
import { OrderView } from "../components/order/OrderView";
import OrderCreate from "../components/order/OrderCreate";
import moment from "moment";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";

export default function Orders() {
    const api = useApi();
    const [orders, setOrders] = useState<any>();
  
    const [orderView, setOrderView] = useState<any>(null);
    const [orderCreate, setOrderCreate] = useState<any>(null);
    const [searchParams] = useSearchParams()


    const columns = [
      { label: "ID", accessor: "id", render: (item:any)=>(
        <div className="text-sm text-gray-400">
          #{item.id}
        </div>
      ) },
      // { label: "Update", accessor: "updated_at" },
      { label: "Customer Name", accessor: "customer_name" },
      { label: "Retailer Name", accessor: "retailer_name" },

      { label: "Total price", accessor: "total_price", render: (item:any)=>(
        <div>
          ${item.total_price}
        </div>
      ) },

      { label: "Total Quantity", accessor: "total_qty", render: (item:any)=>(
        <div>
          {item.total_qty}
        </div>
      ) },
     
      { label: "Time", accessor: "created_at", render: (item:any) => (
        <div>
          {moment(item.created_at).format('DD MMM YYYY HH:MM A')}
        </div>
      ) },

      {
        Label: "",
        accessor: "",
        render: (item:any) => (
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              className=" hover:text-blue-500"
              onClick={() => setOrderView(item?.id)}
            >
              <IoEyeOutline />
            </button>
          </div>
        ),
      },
    ];
  
    const fetchOrders = (searchParams?:any) => {
      api
        .getOrders(searchParams)
        .then((response) => { 
          setOrders(response.data);
        })
        .catch(() => console.log("Erorr"));
    };
  
    useEffect(() => {
      fetchOrders(searchParams);
    }, [searchParams]);

  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-2xl">Orders</h1>
        <Button type="Normal" onClick={()=>setOrderCreate(true)}>Create Order</Button>
      </div>
      <Table columns={columns as any} data={orders} />
      {orders && <Paginator data={orders}/>}

      {orderView && (
        <OrderView
          isOpen={orderView ? true : false}
          onClose={() => setOrderView(null)}
          id={orderView}
        />
      )}
      {orderCreate && (
        <OrderCreate
          isOpen={orderCreate ? true : false}
          onClose={() => setOrderCreate(null)}
          refresh={fetchOrders}
        />
      )}
    </div>
  );
}
