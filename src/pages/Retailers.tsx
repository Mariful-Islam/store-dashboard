import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import ProductView from "../components/product/ProductView";
import ProductEdit from "../components/product/ProductEdit";
import Button from "../components/Button";
import Paginator from "../components/Paginator";

export default function Retailers() {
  const api = useApi();
  const [retailers, setRetailers] = useState<any>();

  const [productView, setProductView] = useState<any>(null);
  const [productEdit, setProductEdit] = useState<any>(null);

  const columns = [
    { label: "ID", accessor: "id" },
    // { label: "Created", accessor: "created_at" },
    // { label: "Phone", accessor: "updated_at" },
    { label: "Name", accessor: "", render: (item:any)=>(
      <div>
        {item.first_name} {item.last_name}
      </div>
    ) },
    { label: "Phone", accessor: "phone" },
    { label: "Email", accessor: "email" },

    {
      Label: "",
      accessor: "",
      render: () => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setProductView("ygyug")}
          >
            <IoEyeOutline />
          </button>
          <button
            className=" hover:text-blue-500"
            onClick={() => setProductEdit("ygyug")}
          >
            <CiEdit />
          </button>
        </div>
      ),
    },
  ];

  const fetchRetailers= () => {
    api
      .getRetailers()
      .then((response) => {
        setRetailers(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-2xl">
          Retailers          
        </h1>
       <Button type="Normal">Create Retailers</Button>
      </div>
      <Table columns={columns as any} data={retailers} />
      {retailers && <Paginator data={retailers}/>}

      {productView && (
        <ProductView
          isOpen={productView ? true : false}
          onClose={() => setProductView(null)}
        />
      )}
      {productEdit && (
        <ProductEdit
          isOpen={productEdit ? true : false}
          onClose={() => setProductEdit(null)}
        />
      )}
    </div>
  );
}
