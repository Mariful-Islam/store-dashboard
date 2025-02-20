import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useApi } from "../api/api";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import ProductView from "../components/product/ProductView";
import ProductEdit from "../components/product/ProductEdit";
import Button from "../components/Button";
import ProductCreate from "../components/product/ProductCreate";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const api = useApi();
  const [products, setProducts] = useState<any>();

  const [productView, setProductView] = useState<any>(null);
  const [productEdit, setProductEdit] = useState<any>(null);
  const [productCreate, setProductCreate] = useState<any>(null)

  const [searchParams] = useSearchParams()

  const columns = [
    { label: "ID", accessor: "id" },
    // { label: "Created", accessor: "created_at" },
    // { label: "Phone", accessor: "updated_at" },
    { label: "Name", accessor: "name" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
    { label: "Slug", accessor: "slug" },
    { label: "Category", accessor: "category" },

    {
      Label: "",
      accessor: "",
      render: (item:any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setProductView(item.slug)}
          >
            <IoEyeOutline />
          </button>
          <button
            className=" hover:text-blue-500"
            onClick={() => setProductEdit("ygyug")}
          >
            <CiEdit />
          </button>
        </div>
      ),
    },
  ];


  const fetchProducts = (searchParams:any) => {
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

  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-2xl">
          Products          
        </h1>
       <Button type="Normal" onClick={()=>setProductCreate(true)}>Create Product</Button>
      </div>

      <Table columns={columns as any} data={products} />
      
      {products && <Paginator data={products}/>}


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
        <ProductCreate
          isOpen={productCreate}
          onClose={()=>setProductCreate(false)}
        />
      )}
    </div>
  );
}
