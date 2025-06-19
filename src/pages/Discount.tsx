import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import { GlobalContext } from "../contexts/GlobalContext";
import { MdDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import Table from "../components/Table";
import Select from "../components/Select";
import Paginator from "../components/Paginator";
import { useApi } from "../api/api";
import DeleteConsent from "../components/deleteConsent";
import DiscountCreate from "../components/discount/DiscountCreate";
import { DiscountView } from "../components/discount/DiscountView";
import DiscountFilter from "../components/discount/DiscountFilter";
import SearchFilter from "../components/SearchFilter";

function Discount() {
  const api = useApi();
  const [discounts, setDiscounts] = useState<any>();
  const [view, setView] = useState<any>(null);
  const [dlt, setDlt] = useState<any>(null);
  const [create, setCreate] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "10" });
  const {
    filter,
    handleFilter,
    handleSelectItemPerPage,
  } = useContext(GlobalContext);


  const onCloseProductCreate = () => {
    setCreate(false);
    fetchDiscounts(searchParams);
  };

  const columns = [
    { label: "ID", accessor: "id" },
    {
      label: "Name",
      accessor: "name",
      render: (item: any) => (
        <div className="flex gap-2 items-center">
          <img src={item?.image} alt="" className="h-8 w-8" />
          <div>{item?.name}</div>
        </div>
      ),
    },
    { label: "Type", accessor: "type" },
    { label: "Discount", accessor: "discount_amount" },

    {
      Label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-green-500"
            onClick={() => setView(item?.id)}
          >
            <IoEyeOutline className="w-4 h-4" />
          </button>
          <button
            className=" hover:text-red-500"
            onClick={() => setDlt(item)}
          >
            <MdDelete className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const menuGroups = [
    [
      {
        label: "Name - ascending",
        key: "name"
      },
      {
        label: "Name - descending",
        key: "-name"
      },
    ],

    [
      {
        label: "Price - ascending",
        key: "variants__price"
      },
      {
        label: "Price - descending",
        key: "-variants__price"
      },
    ],

    [
      {
        label: "Created - ascending",
        key: "created_at"
      },
      {
        label: "Created - descending",
        key: "-created_at"
      },
    ],
  ];

  const fetchDiscounts = (searchParams: any) => {
    api
      .getDiscounts(searchParams)
      .then((response) => {
        setDiscounts(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchDiscounts(searchParams);
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Discount</h3>
        <Button btntype="Normal" onClick={()=>setCreate(!create)}>Create Discount</Button>
      </div>

      <SearchFilter data={discounts} menuGroupsItems={menuGroups} />
      
      <Table columns={columns as any} data={discounts} />

      <Wrapper className="mt-2">
        <div>{discounts && <Paginator data={discounts} />}</div>

        <div>
          <Select
            value={searchParams.get("pages") || ""}
            onChange={handleSelectItemPerPage}
          >
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

        {view && (
          <DiscountView
            isOpen={view ? true : false}
            onClose={() => setView(null)}
            id={view}
          />
        )}

        {create && (
          <DiscountCreate
            isOpen={create}
            onClose={onCloseProductCreate}
          />
        )}

        {dlt && (
          <DeleteConsent
            isOpen={dlt ? true : false}
            onClose={() => setDlt(null)}
            item={dlt}
            path={`store/discount/api/discounts/${dlt?.id}/`}
            refresh={() => fetchDiscounts(searchParams)}
            name="discount"
          />
        )}

        {filter && <DiscountFilter isOpen={filter} onClose={handleFilter} />}
      </Wrapper>
    </div>
  );
}

export default Discount;
