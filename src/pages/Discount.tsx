import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import { GlobalContext } from "../contexts/GlobalContext";
import { MdDelete, MdOutlineClear } from "react-icons/md";
import { IoEyeOutline, IoFilterOutline } from "react-icons/io5";
import DropdownMenu from "../components/DropdownMenu";
import { CiEdit, CiFilter } from "react-icons/ci";
import TextInput from "../components/TextInput";
import { useSearchParams } from "react-router-dom";
import Table from "../components/Table";
import Select from "../components/Select";
import Paginator from "../components/Paginator";
import { useApi } from "../api/api";
import DeleteConsent from "../components/deleteConsent";
import DiscountCreate from "../components/discount/DiscountCreate";
import { DiscountEdit } from "../components/discount/DiscountEdit";
import { DiscountView } from "../components/discount/DiscountView";
import DiscountFilter from "../components/discount/DiscountFilter";

function Discount() {
  const api = useApi();
  const [discounts, setDiscounts] = useState<any>();
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);
  const [dlt, setDlt] = useState<any>(null);
  const [create, setCreate] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "10" });
  const [search, setSearch] = useState<string>();
  const {
    filter,
    handleClear,
    handleFilter,
    handleSearch,
    handleSelectItemPerPage,
  } = useContext(GlobalContext);


  const onCloseProductCreate = () => {
    setCreate(false);
    fetchDiscounts(searchParams);
  };

  const getActiveMenu = (orderName: string) => {
    return searchParams.get("ordering") === orderName;
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
            <IoEyeOutline className="w-5 h-5" />
          </button>
          <button
            className=" hover:text-blue-500"
            onClick={() => setEdit("ygyug")}
          > 
            <CiEdit className="w-5 h-5" />
          </button>
          <button
            className=" hover:text-red-500"
            onClick={() => setDlt(item)}
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const menuGroups = [
    [
      {
        label: "Name - ascending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "name");
            return newParams;
          }),
        isActive: getActiveMenu("name"),
      },
      {
        label: "Name - descending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "-name");
            return newParams;
          }),
        isActive: getActiveMenu("-name"),
      },
    ],

    [
      {
        label: "Price - ascending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "variants__price");
            return newParams;
          }),
        isActive: getActiveMenu("variants__price"),
      },
      {
        label: "Price - descending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "-variants__price");
            return newParams;
          }),
        isActive: getActiveMenu("-variants__price"),
      },
    ],

    [
      {
        label: "Created - ascending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "created_at");
            return newParams;
          }),
        isActive: getActiveMenu("created_at"),
      },
      {
        label: "Created - descending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "-created_at");
            return newParams;
          }),
        isActive: getActiveMenu("-created_at"),
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
        <Button type="Normal" onClick={()=>setCreate(!create)}>Create Discount</Button>
      </div>

      <Wrapper className="mb-2 flex flex-col">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <TextInput
            id="search"
            name="search"
            placeholder="search product"
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
            items={menuGroups}
          />
          <Button type="white-btn" onClick={handleClear} hoverText="Clear">
            <MdOutlineClear className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex gap-4 items-center justify-between w-full text-[12px]">
          <div>
            <strong className="text-gray-500 dark:text-gray-200">
              Items:{" "}
            </strong>
            <strong className="text-gray-700 dark:text-gray-200">
              {discounts?.results?.length}
            </strong>
          </div>
          <div>
            <strong className="text-gray-500 dark:text-gray-200">
              Total:{" "}
            </strong>
            <strong className="text-gray-700 dark:text-gray-200">
              {discounts?.count}
            </strong>
          </div>
        </div>
      </Wrapper>

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
        {edit && (
          <DiscountEdit
            isOpen={edit ? true : false}
            onClose={() => setEdit(null)}
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
