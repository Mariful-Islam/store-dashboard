import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import ProductEdit from "../components/product/ProductEdit";
import Button from "../components/Button";
import CustomerCreate from "../components/customer/CustomerCreate";
import Paginator from "../components/Paginator";
import { CustomerView } from "../components/customer/CustomerView";

export default function Customers() {
  const api = useApi();
  const [customers, setCustomers] = useState<any>();

  const [customerView, setCustomerView] = useState<any>(null);
  const [customerEdit, setCustomerEdit] = useState<any>(null);
  const [customerCreate, setCustomerCreate] = useState<boolean>(false);


  const columns = [
    { label: "ID", accessor: "id" },
    // { label: "Created", accessor: "created_at" },
    // { label: "Phone", accessor: "updated_at" },
    { label: "Name", accessor: "username" },
    { label: "Phone", accessor: "phone" },
    { label: "Email", accessor: "email" },

    {
      Label: "",
      accessor: "",
      render: (item:any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setCustomerView(item?.id)}
          >
            <IoEyeOutline />
          </button>
        </div>
      ),
    },
  ];

  const fetchCustomers = () => {
    api
      .getCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-2xl">
        Customers          
        </h1>
       <Button type="Normal" onClick={()=>setCustomerCreate(true)}>Create Customer</Button>
      </div>
      <Table columns={columns as any} data={customers} />
      
      {customers && <Paginator data={customers}/>}

      {customerView && (
        <CustomerView
          isOpen={customerView ? true : false}
          onClose={() => setCustomerView(null)}
          id={customerView}
          refresh={fetchCustomers}
        />
      )}
      {customerEdit && (
        <ProductEdit
          isOpen={customerEdit ? true : false}
          onClose={() => setCustomerEdit(null)}
        />
      )}
      {customerCreate && (
        <CustomerCreate
          isOpen={customerCreate}
          onClose={()=>setCustomerCreate(false)}
          refresh={fetchCustomers}
        />
      )}
    </div>
  );
}
