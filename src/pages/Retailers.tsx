import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import Button from "../components/Button";
import Paginator from "../components/Paginator";
import { RetailerView } from "../components/retailer/RetailerView";
import { RetailerEdit } from "../components/retailer/RetailerEdit";
import RetailerCreate from "../components/retailer/RetailerCreate";

export default function Retailers() {
  const api = useApi();
  const [retailers, setRetailers] = useState<any>();

  const [retailerCreate, setRetailerCreate] = useState<boolean>(false);

  const [retailerView, setRetailerView] = useState<any>(null);
  const [retailerEdit, setRetailerEdit] = useState<any>(null);

  const columns = [
    { label: "ID", accessor: "id" },
    // { label: "Created", accessor: "created_at" },
    // { label: "Phone", accessor: "updated_at" },
    {
      label: "Name",
      accessor: "",
      render: (item: any) => (
        <div>
          {item.first_name} {item.last_name}
        </div>
      ),
    },
    { label: "Phone", accessor: "phone" },
    { label: "Email", accessor: "email" },

    {
      Label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setRetailerView(item?.id)}
          >
            <IoEyeOutline />
          </button>
        </div>
      ),
    },
  ];

  const fetchRetailers = () => {
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
        <h1 className="text-2xl">Retailers</h1>
        <Button type="Normal" onClick={()=>setRetailerCreate(true)}>Create Retailers</Button>
      </div>
      <Table columns={columns as any} data={retailers} />
      {retailers && <Paginator data={retailers} />}

      {retailerView && (
        <RetailerView
          isOpen={retailerView ? true : false}
          onClose={() => setRetailerView(null)}
          id={retailerView}
          refresh={fetchRetailers}
        />
      )}

      {retailerCreate && (
        <RetailerCreate
          isOpen={retailerCreate}
          onClose={() => setRetailerCreate(false)}
          refresh={fetchRetailers}
        />
      )}
    </div>
  );
}
