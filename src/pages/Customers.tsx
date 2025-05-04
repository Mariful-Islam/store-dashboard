import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { IoEyeOutline, IoFilterOutline } from "react-icons/io5";
import ProductEdit from "../components/product/ProductEdit";
import Button from "../components/Button";
import CustomerCreate from "../components/customer/CustomerCreate";
import Paginator from "../components/Paginator";
import { CustomerView } from "../components/customer/CustomerView";
import { useSearchParams } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import TextInput from "../components/TextInput";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import { MdOutlineClear } from "react-icons/md";
import { GlobalContext } from "../contexts/GlobalContext";
import DropdownMenu from "../components/DropdownMenu";


export default function Customers() {
  const api = useApi();
  const [customers, setCustomers] = useState<any>();
  const [customerView, setCustomerView] = useState<any>(null);
  const [customerEdit, setCustomerEdit] = useState<any>(null);
  const [customerCreate, setCustomerCreate] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>();
  const {filter, handleClear, handleFilter, handleSearch, handleSelectItemPerPage} = useContext(GlobalContext)
  

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
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setCustomerView(item?.id)}
          >
            <IoEyeOutline className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const fetchCustomers = (searchParams?: any) => {
    api
      .getCustomers(searchParams)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchCustomers(searchParams);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Customers</h3>
        <Button type="Normal" onClick={() => setCustomerCreate(true)}>
          Create Customer
        </Button>
      </div>

      <Wrapper style={{ gap: 12 }} className="mb-2 flex flex-col">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <TextInput
            id="search"
            name="search"
            placeholder="Search customers"
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
              {customers?.results?.length}
            </strong>
          </div>
          <div>
            <strong className="text-gray-500 dark:text-gray-200">Total: </strong>
            <strong className="text-gray-700 dark:text-gray-200">{customers?.count}</strong>
          </div>
        </div>
      </Wrapper>

      <Table columns={columns as any} data={customers} />

      <Wrapper className="mt-2">
        <div>{customers && <Paginator data={customers} />}</div>

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
          onClose={() => setCustomerCreate(false)}
          refresh={fetchCustomers}
        />
      )}
    </div>
  );
}
