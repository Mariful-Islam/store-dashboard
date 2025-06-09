import { useEffect, useRef, useState } from "react";
import Drawer from "../Drawer";
import { useApi } from "../../api/api";
import moment from "moment";
import { FiPrinter } from "react-icons/fi";
import Invoice from "./Invoice";
import { useReactToPrint } from "react-to-print";
import PaymentForm from "./PaymentForm";
import Button from "../Button";
import { Tooltip } from "react-tooltip";

interface ProductViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
  refresh: VoidFunction;
}

export function OrderView({ isOpen, onClose, id, refresh }: ProductViewProps) {
  const api = useApi();
  const [order, setOrder] = useState<any>();
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const fetchOrderDetail = () => {
    api
      .getOrderDetail(id)
      .then((response) => {
        setOrder(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  if (!order) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="bg-white dark:bg-gray-800 h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </Drawer>
    );
  }

  const date = new Date(order?.created_at);

  // Convert to Bangladesh time by adding 6 hours
  const bangladeshOffset = 6 * 60; // in minutes
  const OrderDate = date.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // This enables AM/PM format
  });

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
      <div className="bg-white dark:bg-gray-800 text-sm dark:text-slate-100">
        <div className="flex gap-2 justify-end group cursor-pointer">
          <Button
            btntype="white-btn"
            onClick={() => reactToPrintFn()}
            data-tooltip-id={`print-invoice`}
            data-tooltip-content={"Print Invoice"}
          >
            <FiPrinter className=" group-hover:text-blue-500 duration-200 w-5 h-5 " />
          </Button>

          <Tooltip id={`print-invoice`} place="bottom" style={{fontSize: 12, fontWeight: 'bold'}}/>

        </div>

        {/* Payments */}
        <div className="flex flex-row gap-4 items-center mb-4">
          <h1 className="font-black text-slate-500 dark:text-slate-300">
            Payment
          </h1>
          <div>
            {order?.payment_status == 0.0 ? (
              <div className="text-green-500 bg-green-100 dark:bg-green-900 rounded-md px-4 py-1 w-fit">
                Clear
              </div>
            ) : (
              <div>
                {order?.payment_status > 0 ? (
                  <div className="flex flex-row gap-2">
                    <div className="bg-blue-100 text-blue-500 border border-blue-500 px-4 py-1 rounded-md font-medium">
                      +{order?.payment_status.toFixed(2)}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <div className="bg-red-100 text-red-500 border border-red-500 px-4 py-1 rounded-md font-medium">
                      {order?.payment_status.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-black text-slate-500 dark:text-slate-300">
              Payment history
            </h1>

            <Button btntype="Outline" onClick={() => setPaymentModal(true)}>
              + Add Payment
            </Button>
          </div>
          <div>
            {order?.payments?.map((pay: any, index: number) => (
              <div
                className="border border-slate-300 dark:border-slate-600 p-4 rounded-md mt-2"
                key={index}
              >
                <div className="flex gap-2">
                  <div>Amount: </div>
                  <div> {pay?.amount}</div>
                </div>
                <div className="flex gap-2">
                  <div>Amount: </div>
                  <div> {pay?.payment_method}</div>
                </div>
                <div className="flex gap-2">
                  <div>Payment date: </div>
                  <div>
                    {moment(pay?.payment_date).format("HH:MM A DD MMMM YYYY")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="font-black text-slate-500 dark:text-slate-300 mt-4">
          Order info
        </h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md mt-2">
          <div className="flex gap-2">
            <div>ID: </div>
            <div>{order?.id}</div>
          </div>
          <div className="flex gap-2">
            <div>Ordered Time: </div>
            <div>
              {/* {moment(order?.created_at).format("HH:MM A DD MMMM YYYY")} */}
              {/* {order?.created_at} */}
              {OrderDate.toString()}
            </div>
          </div>
          <div className="flex gap-2">
            <div>Total Price: </div>
            <div>{order?.total_price}</div>
          </div>
        </div>

        <h1 className="mt-4 font-black text-slate-500 dark:text-slate-300">
          Ordered Items
        </h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md mt-2">
          {order?.variants?.map((item: any, index: number) => (
            <div
              key={index}
              className="border-b border-slate-300 dark:border-slate-700 pb-2 m-2"
            >
              <div className="flex gap-2">
                <div className="font-bold">ID: </div>
                <div>{item?.id}</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">Item Name </div>
                <div>{item?.name}</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">Unit Price: </div>
                <div>{item?.unit_price.toFixed(2)}</div>
              </div>

              <div className="flex gap-2">
                <div className="font-bold">Item Quantity: </div>
                <div>{item?.quantity}</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">Total Price </div>
                <div>{item?.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="mt-4 font-black text-slate-500 dark:text-slate-300">
          Customer
        </h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md mt-2">
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

        <h1 className="mt-4 font-black text-slate-500 dark:text-slate-300">
          Retailer
        </h1>
        <div className="border border-slate-300 dark:border-slate-600 p-4 rounded-md mt-2">
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

        {order && <Invoice data={order} ref={contentRef} />}
        {paymentModal && (
          <PaymentForm
            isOpen={paymentModal}
            onClose={() => setPaymentModal(false)}
            orderId={id}
            refresh={() => {
              fetchOrderDetail();
              refresh();
            }}
          />
        )}
      </div>
    </Drawer>
  );
}
