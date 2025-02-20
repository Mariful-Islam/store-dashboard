import { useEffect, useState } from "react";
import Drawer from "../Drawer";
import { useApi } from "../../api/api";
import moment from "moment";

interface ProductViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
}

export function OrderView({ isOpen, onClose, id }: ProductViewProps) {
  const api = useApi();
  const [order, setOrder] = useState<any>();

  const fetchOrders = () => {
    api
      .getOrderDetail(id)
      .then((response) => {
        setInterval(()=>{
          setOrder(response.data);
        }, 2000)
        
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    if (id) {
      fetchOrders();
    }
  }, [id]);

  if(!order){
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="bg-white dark:bg-gray-800 h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </Drawer>
    )
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
      <div className="bg-white dark:bg-gray-800 text-sm dark:text-slate-100">
        <h1>Order info</h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md">
          <div className="flex gap-2">
            <div>ID: </div>
            <div>{order?.id}</div>
          </div>
          <div className="flex gap-2">
            <div>Ordered Time: </div>
            <div>
              {moment(order?.created_at).format("HH:MM A DD MMMM YYYY")}
            </div>
          </div>
          <div className="flex gap-2">
            <div>Total Price: </div>
            <div>{order?.total_price}</div>
          </div>
        </div>

        <h1 className="mt-4">Ordered Items</h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md">
          {order?.variants?.map((item: any, index: number) => (
            <div key={index} className="border-b border-slate-300 dark:border-slate-700 pb-2 m-2">
              <div className="flex gap-2">
                <div>ID: </div>
                <div>{item?.id}</div>
              </div>
              <div className="flex gap-2">
                <div>Item Name </div>
                <div>{item?.name}</div>
              </div>
              <div className="flex gap-2">
                <div>Unit Price: </div>
                <div>{item?.unit_price}</div>
              </div>
              <div className="flex gap-2">
                <div>Item Quantity: </div>
                <div>{item?.quantity}</div>
              </div>
              <div className="flex gap-2">
                <div>Price </div>
                <div>{item?.price}</div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="mt-4">Customer</h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md">
          <div className="flex gap-2">
            <div>ID: </div>
            <div>{order?.id}</div>
          </div>
          <div className="flex gap-2">
            <div>Name: </div>
            <div>
              {order?.customer.first_name} {order?.customer.last_name}
            </div>
          </div>
          <div className="flex gap-2">
            <div>Username: </div>
            <div>{order?.customer.username}</div>
          </div>
          <div className="flex gap-2">
            <div>Email: </div>
            <div>{order?.customer.email}</div>
          </div>
          <div className="flex gap-2">
            <div>Phone: </div>
            <div>{order?.customer.phone}</div>
          </div>
        </div>

        <h1 className="mt-4">Retailer</h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md">
          <div className="flex gap-2">
            <div>ID: </div>
            <div>{order?.retailer.id}</div>
          </div>
          <div className="flex gap-2">
            <div>Name: </div>
            <div>
              {order?.retailer.first_name} {order?.retailer.last_name}
            </div>
          </div>
          <div className="flex gap-2">
            <div>Username: </div>
            <div>{order?.retailer.username}</div>
          </div>
          <div className="flex gap-2">
            <div>Email: </div>
            <div>{order?.retailer.email}</div>
          </div>
          <div className="flex gap-2">
            <div>Phone: </div>
            <div>{order?.retailer.phone}</div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
