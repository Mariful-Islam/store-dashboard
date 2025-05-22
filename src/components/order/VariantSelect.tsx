import React, { useEffect, useState } from "react";
import { useApi } from "../../api/api";
import Paginator from "../Paginator";
import Modal from "../Modal";
import { useSearchParams } from "react-router-dom";
import Button from "../Button";
import TextInput from "../TextInput";

interface VariantSelectProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onSave: (products:any)=>void;
}

function VariantSelect({ isOpen, onClose, onSave }: VariantSelectProps) {
  const api = useApi();
  const [prods, setProds] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search] = useState<string>();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])

  const fetchProducts = (searchParams:any) => {
    api
      .productsWithVariants(searchParams)
      .then((res) => setProds(res.data))
      .catch(() => console.log("Error fetch products"));
  };


  useEffect(() => {
    fetchProducts(searchParams);
  }, [searchParams]);


  const handleSearch = (e:any) => {
    setSearchParams((prev)=>({...prev, search: e.target.value}))
  }


  const handleSelectProduct = (product:any) => {
    
    const isExisted = product?.variants.some((item1:any) => selectedProducts.some((item2)=>item1.id===item2.id))
    
    if(isExisted){
      product?.variants.map((variant:any)=>(
        setSelectedProducts((prev:any)=>prev.filter((item:any)=>item.id!==variant.id))
      ))
    } else {
      product?.variants.map((variant:any)=>(
        setSelectedProducts((prev:any)=>[...prev, variant])
      ))
    }
  
  }


  const handleSelectVariant = (variant:any) => {

    setSelectedProducts((prevSelected) => {

      const isSelected = prevSelected.some(item => item.id === variant.id);

      if (isSelected) {
        // Remove variant from selected list
        return prevSelected.filter(item => item.id !== variant.id);
      } else {
        // Add variant to selected list
        return [...prevSelected, variant];
      }
    });

    
  };


  const handleAddProduct = () => {
    onSave(selectedProducts)
    onClose()
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex justify-end items-center gap-3 mb-2">
        <Button onClick={onClose} type="DangerOutline">Back</Button>
        <Button onClick={handleAddProduct} type="Normal" disable={selectedProducts.length === 0 ? true : false}>Add</Button>
      </div>
      
        <TextInput
          id="search"
          name="search"
          placeholder="search product"
          value={search}
          onChange={handleSearch}
        />
      <div className="my-2 flex gap-3 items-center justify-between">
        <div className="text-nowrap text-[12px]  text-red-500 font-bold">
          Selected: {selectedProducts.length}
        </div>
        <div className="text-nowrap text-[12px] text-green-500 dark:text-green-400 font-bold">
          Total: {prods?.count}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {prods?.results?.map((prod: any, index: number) => (
          <div key={index} className="border border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 duration-100 rounded-md p-2">
            <label className="flex gap-4 items-center">
              <input
                type="checkbox"
                className="duration-200 rounded-full focus:ring-0 focus:outline-0 focus:border-0 "
                onChange={()=>handleSelectProduct(prod)}
                checked={selectedProducts.some((item) => item.product === prod.id)}
              />
              <div className="flex flex-col gap-0">
                <span className="text-sm font-bold">{prod.name}</span>
                <span className="text-[12px] text-gray-500">{prod.category}</span>
              </div>
            </label>

            <div className="ml-5 mt-2 flex flex-col gap-2">
              {prod?.variants?.map((variant: any, index: number) => (
                <label key={index} className="flex gap-2 items-center" >
                  <input
                    type="checkbox"
                    className="duration-200 rounded-full focus:ring-0 focus:outline-0 focus:border-0"
                    onChange={() => handleSelectVariant(variant)}
                    checked={selectedProducts.some((item) => item.id === variant.id)}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm">{variant.name}</span>
                    <div className="text-[12px] text-gray-400">
                      {variant.price===variant.discount_price ? (
                        <span>{variant.discount_price}</span>
                      ): (
                        <div>
                          <span className="line-through">{variant.price.toFixed(2)}</span>
                          <span className="ml-2">{variant.discount_price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2">
        {prods && <Paginator data={prods} />}
      </div>
    </Modal>
  );
}

export default VariantSelect;
