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
  prevSelectedProducts: any;
  onSave: (products: any) => void;
}

export function EligibleDiscountProductSelect({
  isOpen,
  onClose,
  prevSelectedProducts,
  onSave,
}: VariantSelectProps) {
  const api = useApi();
  const [prods, setProds] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search] = useState<string>();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const fetchProducts = (searchParams: any) => {
    api
      .getProducts(searchParams)
      .then((res) => setProds(res.data))
      .catch(() => console.log("Error fetch products"));
  };

  useEffect(() => {
    fetchProducts(searchParams);
  }, [searchParams]);

  const handleSearch = (e: any) => {
    setSearchParams((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSelectProduct = (product: any) => {
    setSelectedProducts((prev) => {
      const isAlreadySelected = prev?.some((prod) => prod?.id === product?.id);

      if (isAlreadySelected) {
        // Remove product
        return prev.filter((preProd) => preProd?.id !== product?.id);
      } else {
        // Add product
        return [...prev, product];
      }
    });
  };

  const handleAddProduct = () => {
    onSave(selectedProducts);
    onClose();
  };

  console.log(selectedProducts, prevSelectedProducts);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex justify-end items-center gap-3 mb-2">
        <Button onClick={onClose} btntype="DangerOutline">
          Back
        </Button>
        <Button
          onClick={handleAddProduct}
          btntype="Normal"
          disabled={selectedProducts.length === 0 ? true : false}
        >
          Add
        </Button>
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
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 duration-100 rounded-md p-2"
          >
            <label
              className={`flex gap-4 items-center ${
                prevSelectedProducts?.some(
                  (item: any) => item?.id === prod.id
                ) && "text-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className={`duration-200 rounded-full focus:ring-0 focus:outline-0 focus:border-0`}
                onChange={() => handleSelectProduct(prod)}
                checked={selectedProducts.some((item) => item?.id === prod?.id)}
                disabled={prevSelectedProducts?.some(
                  (item: any) => item?.id === prod.id
                )}
              />
              <div className="flex flex-col gap-0">
                <span className="text-sm font-bold">{prod.name}</span>
                <span className="text-[12px] text-gray-500">
                  {prod.category}
                </span>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="mt-2">{prods && <Paginator data={prods} />}</div>
    </Modal>
  );
}
