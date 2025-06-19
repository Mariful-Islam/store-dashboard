import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { IoEyeOutline } from "react-icons/io5";
import ProductView from "../components/product/ProductView";
import Button from "../components/Button";
import ProductCreate from "../components/product/ProductCreate";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";
import DeleteConsent from "../components/deleteConsent";
import { MdDelete } from "react-icons/md";
import ProductFilter from "../components/product/ProductFilter";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import { GlobalContext } from "../contexts/GlobalContext";
import SearchFilter from "../components/SearchFilter";

export default function Products() {
  const api = useApi();
  const [products, setProducts] = useState<any>();
  const [productView, setProductView] = useState<any>(null);
  const [productDlt, setProductDlt] = useState<any>(null);
  const [productCreate, setProductCreate] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "10" });
  const {
    filter,
    handleFilter,
    handleSelectItemPerPage,
  } = useContext(GlobalContext);

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
            <IoEyeOutline className="w-4 h-4" />
          </button>

          <button
            className=" hover:text-red-500"
            onClick={() => setProductDlt(item)}
          >
            <MdDelete className="w-4 h-4" />
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

  const menuGroupsItems = [
    [
      {
        label: "Name - ascending",
        key: "name",
      },
      {
        label: "Name - descending",
        key: "-name",
      },
    ],
    
    [
      {
        label: "Price - ascending",
        key: "variants__price",
      },
      {
        label: "Price - descending",
        key: "-name",
      },
    ],

    [
      {
        label: "Created - ascending",
        key: "created_at",
      },
      {
        label: "Created - descending",
        key: "-created_at",
      },
    ],
  ];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Products</h3>
        <Button btntype="Normal" onClick={() => setProductCreate(true)}>
          Create Product
        </Button>
      </div>

      <SearchFilter data={products} menuGroupsItems={menuGroupsItems} />

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
          refresh={()=>fetchProducts(searchParams)}
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

      {filter && <ProductFilter isOpen={filter} onClose={handleFilter} />}
    </div>
  );
}
