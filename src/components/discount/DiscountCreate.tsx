import React, { useContext, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useApi } from "../../api/api";
import TextInput from "../TextInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import { EligibleDiscountProductSelect } from "./EligibleDiscountProductSelect";
import Table from "../Table";
import { RiDeleteBin7Line } from "react-icons/ri";
import Select from "../Select";

interface DiscountCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function DiscountCreate({
  isOpen,
  onClose,
}: DiscountCreateProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>({ products: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const { handleFormValidation } = useContext(GlobalContext);
  const [isOpenVariantSelect, setIsOpenVariantSelect] =
    useState<boolean>(false);


  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    api
      .createDiscount(formData)
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };

  const handleDeleteSelectedProduct = (item: any) => {
    setFormData((prev: any) => {
      const newPrevProdId = prev?.products?.filter(
        (prodId: any) => prodId !== item?.id
      );
      const newPrevProd = prev?.product_data?.filter(
        (product: any) => product?.id !== item?.id
      );

      return { ...prev, products: newPrevProdId, product_data: newPrevProd };
    });
  };

  const columns = [
    {
      label: "ID",
      accessor: "id",
    },
    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Category",
      accessor: "category",
    },
    {
      label: "",
      accessor: "",
      render: (item: any) => (
        <button onClick={() => handleDeleteSelectedProduct(item)}>
          <RiDeleteBin7Line className="hover:text-red-500 text-gray-700" />
        </button>
      ),
    },
  ];

  const onSave = (value: any) => {
    const productIDs = Array.isArray(value)
      ? value.map((item) => item?.id)
      : value?.id;

    setFormData((prev: any) => ({
      ...prev,
      products: [...(prev.product || []), ...productIDs],
      product_data: [...(prev?.product_data || []), ...value],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create product">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="text-sm font-medium mt-4">
          Select discount eligible product
        </div>

        {formData?.products?.length !== 0 && (
          <div>
            <Table columns={columns as any} data={formData?.product_data} />
          </div>
        )}
        <div>
          <div
            onClick={() => setIsOpenVariantSelect(!isOpenVariantSelect)}
            className="border border-gray-200 rounded-md mt-2 p-4 text-center group"
          >
            <span className="text-sm cursor-pointer group-hover:underline">
              Add
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <TextInput
            id="name"
            type="text"
            name="name"
            placeholder="Type your discount name.."
            value={formData?.name || ""}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-sm font-medium">
            Discount Type
          </label>

          <Select name="type" value={formData?.type || ""} onChange={onChange}>
            <option value="" disabled>
              Choose an option
            </option>
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="discount_amount" className="text-sm font-medium">
            Discount Amount
          </label>
          <TextInput
            id="discount_amount"
            type="number"
            name="discount_amount"
            placeholder="Type your discount amount.."
            value={formData?.discount_amount || ""}
            onChange={onChange}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button btntype="DangerOutline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            btntype="Normal"
            type="submit"
            className="flex gap-2 items-center duration-200"
            disabled={
              !handleFormValidation(formData, [
                "name",
                "type",
                "discount_amount",
                "products",
              ])
            }
          >
            {loading ? <div className=" spinner"></div> : <div>Create</div>}
          </Button>
        </div>

        {isOpenVariantSelect && (
          <EligibleDiscountProductSelect
            isOpen={isOpenVariantSelect}
            onClose={() => setIsOpenVariantSelect(!isOpen)}
            prevSelectedProducts={formData?.product_data}
            onSave={(value) => onSave(value)}
          />
        )}
      </form>
    </Modal>
  );
}
