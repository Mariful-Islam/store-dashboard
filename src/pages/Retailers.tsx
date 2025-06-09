import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { IoEyeOutline } from "react-icons/io5";
import Button from "../components/Button";
import Paginator from "../components/Paginator";
import { RetailerView } from "../components/retailer/RetailerView";
import RetailerCreate from "../components/retailer/RetailerCreate";
import { useSearchParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import { GlobalContext } from "../contexts/GlobalContext";
import SearchFilter from "../components/SearchFilter";

export default function Retailers() {
  const api = useApi();
  const [retailers, setRetailers] = useState<any>();
  const [retailerCreate, setRetailerCreate] = useState<boolean>(false);
  const [retailerView, setRetailerView] = useState<any>(null);
  const [retailerEdit, setRetailerEdit] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>();
  const { handleSelectItemPerPage } = useContext(GlobalContext);

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
            <IoEyeOutline className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const fetchRetailers = (searchParams?: any) => {
    api
      .getRetailers(searchParams)
      .then((response) => {
        setRetailers(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchRetailers(searchParams);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Retailers</h3>
        <Button btntype="Normal" onClick={() => setRetailerCreate(true)}>
          Create Retailers
        </Button>
      </div>

      <SearchFilter data={retailers} menuGroupsItems={[]} />

      <Table columns={columns as any} data={retailers} />

      <Wrapper className="mt-2">
        <div>{retailers && <Paginator data={retailers} />}</div>

        <div>
          <Select
            value={searchParams.get("pages") || ""}
            onChange={handleSelectItemPerPage}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </Select>
        </div>
      </Wrapper>

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
