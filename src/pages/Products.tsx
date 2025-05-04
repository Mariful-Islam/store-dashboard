import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { CiEdit, CiFilter } from "react-icons/ci";
import { IoEyeOutline, IoFilterOutline } from "react-icons/io5";
import ProductView from "../components/product/ProductView";
import ProductEdit from "../components/product/ProductEdit";
import Button from "../components/Button";
import ProductCreate from "../components/product/ProductCreate";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";
import DeleteConsent from "../components/deleteConsent";
import { MdDelete, MdOutlineClear } from "react-icons/md";
import TextInput from "../components/TextInput";
import ProductFilter from "../components/product/ProductFilter";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import DropdownMenu from "../components/DropdownMenu";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Products() {
  const api = useApi();
  const [products, setProducts] = useState<any>();
  const [productView, setProductView] = useState<any>(null);
  const [productEdit, setProductEdit] = useState<any>(null);
  const [productDlt, setProductDlt] = useState<any>(null);
  const [productCreate, setProductCreate] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "10" });
  const [search, setSearch] = useState<string>();
  const {filter, handleClear, handleFilter, handleSearch, handleSelectItemPerPage} = useContext(GlobalContext)
  

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
    { label: "Category", accessor: "category" },
    { label: "Total stock", accessor: "total_stock" },

    {
      Label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-green-500"
            onClick={() => setProductView(item.slug)}
          >
            <IoEyeOutline className="w-5 h-5" />
          </button>
          <button
            className=" hover:text-blue-500"
            onClick={() => setProductEdit("ygyug")}
          >
            <CiEdit className="w-5 h-5" />
          </button>
          <button
            className=" hover:text-red-500"
            onClick={() => setProductDlt(item)}
          >
            <MdDelete className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const fetchProducts = (searchParams: any) => {
    api
      .getProducts(searchParams)
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchProducts(searchParams);
  }, [searchParams]);

  const onCloseProductCreate = () => {
    setProductCreate(false);
    fetchProducts(searchParams);
  };

  const getActiveMenu = (orderName: string) => {
    return searchParams.get("ordering") === orderName;
  };

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

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Products</h3>
        <Button type="Normal" onClick={() => setProductCreate(true)}>
          Create Product
        </Button>
      </div>

      <Wrapper style={{gap:12}} className="mb-2 flex flex-col">
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
            <strong className="text-gray-500 dark:text-gray-200">Items: </strong>
            <strong className="text-gray-700 dark:text-gray-200">{products?.results?.length}</strong>
          </div>
          <div>
            <strong className="text-gray-500 dark:text-gray-200">Total: </strong>
            <strong className="text-gray-700 dark:text-gray-200">{products?.count}</strong>
          </div>
        </div>
      </Wrapper>

      <Table columns={columns as any} data={products} />

      <Wrapper className="mt-2">
        <div>{products && <Paginator data={products} />}</div>

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
      </Wrapper>

      {/* ............. */}

      {productView && (
        <ProductView
          isOpen={productView ? true : false}
          onClose={() => setProductView(null)}
          slug={productView}
        />
      )}
      {productEdit && (
        <ProductEdit
          isOpen={productEdit ? true : false}
          onClose={() => setProductEdit(null)}
        />
      )}
      {productCreate && (
        <ProductCreate isOpen={productCreate} onClose={onCloseProductCreate} />
      )}

      {productDlt && (
        <DeleteConsent
          isOpen={productDlt ? true : false}
          onClose={() => setProductDlt(null)}
          item={productDlt}
          path={`store/product/api/products/${productDlt?.slug}/`}
          refresh={() => fetchProducts(searchParams)}
          name="product"
        />
      )}

      {filter && (
        <ProductFilter isOpen={filter} onClose={handleFilter} />
      )}
    </div>
  );
}
