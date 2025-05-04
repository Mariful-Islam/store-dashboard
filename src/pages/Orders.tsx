import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import { CiFilter } from "react-icons/ci";
import { IoEyeOutline, IoFilterOutline } from "react-icons/io5";
import { useApi } from "../api/api";
import { OrderView } from "../components/order/OrderView";
import OrderCreate from "../components/order/OrderCreate";
import moment from "moment";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";
import TextInput from "../components/TextInput";
import { MdOutlineClear } from "react-icons/md";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import OrderFilter from "../components/order/OrderFilter";
import DropdownMenu from "../components/DropdownMenu";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Orders() {
  const api = useApi();
  const [orders, setOrders] = useState<any>();
  const [orderView, setOrderView] = useState<any>(null);
  const [orderCreate, setOrderCreate] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "10" });
  const [search, setSearch] = useState<string>();
  const {filter, handleClear, handleFilter, handleSearch, handleSelectItemPerPage} = useContext(GlobalContext)
  

  const columns = [
    {
      label: "ID",
      accessor: "id",
      render: (item: any) => (
        <div className="text-sm text-gray-400">#{item.id}</div>
      ),
    },
    // { label: "Update", accessor: "updated_at" },
    { label: "Customer", accessor: "customer_name" },
    // { label: "Retailer", accessor: "retailer_name" },

    {
      label: "Price",
      accessor: "total_price",
      render: (item: any) => <div>${item.total_price}</div>,
    },

    {
      label: "Quantity",
      accessor: "total_qty",
      render: (item: any) => <div>{item.total_qty}</div>,
    },

    {
      label: "Status",
      accessor: "payment_status",
      render: (item: any) => (
        <div>
          {item?.payment_status == 0.0 ? (
            <div className="text-green-500 bg-green-100 dark:bg-green-900 rounded-md px-4 py-1 w-fit font-medium border border-green-500">
              Clear
            </div>
          ) : (
            <div className="">
              {item?.payment_status > 0 ? (
                <div className="flex flex-row gap-2">
                  <div className="bg-blue-100 text-blue-500 border border-blue-500 px-4 py-1 rounded-md font-medium">
                    +{item?.payment_status.toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <div className="bg-red-100 text-red-500 border border-red-500 px-4 py-1 rounded-md font-medium">
                    {item?.payment_status.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ),
    },

    {
      Label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            className=" hover:text-blue-500"
            onClick={() => setOrderView(item?.id)}
          >
            <IoEyeOutline className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const fetchOrders = (searchParams?: any) => {
    api
      .getOrders(searchParams)
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchOrders(searchParams);
  }, [searchParams]);

  const getActiveMenu = (orderName: string) => {
    return searchParams.get("ordering") === orderName;
  };

  const menuGroups = [
    [
      {
        label: "Total price - ascending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "total_price");
            return newParams;
          }),
        isActive: getActiveMenu("total_price"),
      },
      {
        label: "Total price - descending",
        onClick: () =>
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("ordering", "-total_price");
            return newParams;
          }),
        isActive: getActiveMenu("-total_price"),
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

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Orders</h3>
        <Button type="Normal" onClick={() => setOrderCreate(true)}>
          Create Order
        </Button>
      </div>

      <Wrapper style={{ gap: 12 }} className="mb-2 flex flex-col">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <TextInput
            id="search"
            name="search"
            placeholder="Search orders"
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
            <strong className="text-gray-500 dark:text-gray-200">Items: </strong>
            <strong className="text-gray-700 dark:text-gray-200">
              {orders?.results?.length}
            </strong>
          </div>
          <div>
            <strong className="text-gray-500 dark:text-gray-200">Total: </strong>
            <strong className="text-gray-700 dark:text-gray-200">{orders?.count}</strong>
          </div>
        </div>
      </Wrapper>

      <Table columns={columns as any} data={orders} />

      <Wrapper className="mt-2">
        <div>{orders && <Paginator data={orders} />}</div>

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

      {orderView && (
        <OrderView
          isOpen={orderView ? true : false}
          onClose={() => setOrderView(null)}
          id={orderView}
          refresh={() => fetchOrders(searchParams)}
        />
      )}
      {orderCreate && (
        <OrderCreate
          isOpen={orderCreate ? true : false}
          onClose={() => setOrderCreate(null)}
          refresh={fetchOrders}
        />
      )}

      {filter && (
        <OrderFilter isOpen={filter} onClose={handleFilter} />
      )}
    </div>
  );
}
