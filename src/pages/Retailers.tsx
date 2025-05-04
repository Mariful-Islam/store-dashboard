import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { CiEdit, CiFilter } from "react-icons/ci";
import { IoEyeOutline, IoFilterOutline } from "react-icons/io5";
import Button from "../components/Button";
import Paginator from "../components/Paginator";
import { RetailerView } from "../components/retailer/RetailerView";
import { RetailerEdit } from "../components/retailer/RetailerEdit";
import RetailerCreate from "../components/retailer/RetailerCreate";
import { useSearchParams } from "react-router-dom";
import TextInput from "../components/TextInput";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import { GlobalContext } from "../contexts/GlobalContext";
import { MdOutlineClear } from "react-icons/md";
import DropdownMenu from "../components/DropdownMenu";

export default function Retailers() {
  const api = useApi();
  const [retailers, setRetailers] = useState<any>();
  const [retailerCreate, setRetailerCreate] = useState<boolean>(false);
  const [retailerView, setRetailerView] = useState<any>(null);
  const [retailerEdit, setRetailerEdit] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>();
  const {
    filter,
    handleClear,
    handleFilter,
    handleSearch,
    handleSelectItemPerPage,
  } = useContext(GlobalContext);

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
        <Button type="Normal" onClick={() => setRetailerCreate(true)}>
          Create Retailers
        </Button>
      </div>

      <Wrapper style={{ gap: 12 }} className="mb-2 flex flex-col">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <TextInput
            id="search"
            name="search"
            placeholder="Search retailers"
            value={search}
            onChange={handleSearch}
          />

          <Button type="white-btn" hoverText="filter" onClick={handleFilter}>
            <CiFilter className="w-5 min-w-5 h-5 min-h-5" />
          </Button>

          <DropdownMenu
            buttonLabel={
              <Button type="white-btn" hoverText="Sort">
                <IoFilterOutline className="w-5 min-w-5 h-5 min-h-5" />
              </Button>
            }
            items={[]}
          />
          <Button type="white-btn" onClick={handleClear} hoverText="Clear">
            <MdOutlineClear className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex gap-4 items-center justify-between w-full text-[12px]">
          <div>
            <strong className="text-gray-500 dark:text-gray-200">Items: </strong>
            <strong className="text-gray-700 dark:text-gray-200">
              {retailers?.results?.length}
            </strong>
          </div>
          <div>
            <strong className="text-gray-500 dark:text-gray-200">Total: </strong>
            <strong className="text-gray-700 dark:text-gray-200">{retailers?.count}</strong>
          </div>
        </div>
      </Wrapper>

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
