import { useEffect, useState } from "react";
import { useApi } from "../../api/api";
import Drawer from "../Drawer";
import Table from "../Table";
import { OrderView } from "../order/OrderView";
import { IoEyeOutline } from "react-icons/io5";
import CustomerEdit from "./CustomerEdit";

interface CustomerViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
  refresh: VoidFunction;
}

export function CustomerView({
  isOpen,
  onClose,
  id,
  refresh,
}: CustomerViewProps) {
  const api = useApi();
  const [customer, setCustomer] = useState<any>();
  const [orderView, setOrderView] = useState<any>(null);
  const [customerEdit, setCustomerEdit] = useState<any>(null);

  const fetchCustomer = () => {
    api
      .getCustomerDetail(id)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const columns = [
    {
      label: "ID",
      accessor: "id",
      render: (item: any) => <div>#{item.id}</div>,
    },
    { label: "Retailer Name", accessor: "retailer_name" },
    { label: "Total Price", accessor: "total_price" },
    { label: "Total Quantity", accessor: "total_qty" },
    {
      label: "",
      accessor: "",
      render: (item: any) => (
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

  if (!customer) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="bg-white dark:bg-gray-800 h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Customer Detail">
      <div className="bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-200">
        <div className="border border-slate-300 dark:border-slate-700 p-4 rounded-md mb-4">
          <div className="flex justify-end">
            <button
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => setCustomerEdit(customer)}
            >
              Edit
            </button>
          </div>
          <div>
            <div className="flex gap-2">
              <div>ID: </div>
              <div>{customer?.id}</div>
            </div>
            <div className="flex gap-2">
              <div>Name: </div>
              <div>
                {customer?.first_name} {customer?.last_name}
              </div>
            </div>
            <div className="flex gap-2">
              <div>UserName: </div>
              <div> {customer?.username}</div>
            </div>
            <div className="flex gap-2">
              <div>Phone: </div>
              <div>{customer?.phone}</div>
            </div>
            <div className="flex gap-2">
              <div>Email: </div>
              <div>{customer?.email}</div>
            </div>
          </div>
        </div>

        {customer?.orders?.length !== 0 && (
          <Table columns={columns} data={customer?.orders} />
        )}

        {orderView && (
          <OrderView
            isOpen={orderView ? true : false}
            onClose={() => setOrderView(null)}
            id={orderView}
          />
        )}

        {customerEdit && (
          <CustomerEdit
            isOpen={customerEdit ? true : false}
            onClose={()=>setCustomerEdit(null)}
            data={customerEdit}
            refresh={()=>{
              fetchCustomer()
              refresh()
            }}
          />
        )}
      </div>
    </Drawer>
  );
}
