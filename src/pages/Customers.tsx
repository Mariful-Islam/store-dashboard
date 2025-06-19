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
import SearchFilter from "../components/SearchFilter";
import { useToast } from "../contexts/Notification";


export default function Customers() {
  const api = useApi();
  const [customers, setCustomers] = useState<any>();
  const [customerView, setCustomerView] = useState<any>(null);
  const [customerEdit, setCustomerEdit] = useState<any>(null);
  const [customerCreate, setCustomerCreate] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>();
  const {filter, handleClear, handleFilter, handleSearch, handleSelectItemPerPage} = useContext(GlobalContext)
  const {addToast} = useToast()

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "", render: (item:any)=>(
      <div>
        {item?.first_name} {item?.last_name}
      </div>
    ) },
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
            <IoEyeOutline className="w-4 h-4" />
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
      .catch(() => addToast("Error", "error"));
  };

  useEffect(() => {
    fetchCustomers(searchParams);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Customers</h3>
        <Button btntype="Normal" onClick={() => setCustomerCreate(true)}>
          Create Customer
        </Button>
      </div>

      <SearchFilter data={customers} menuGroupsItems={[]}/>

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
