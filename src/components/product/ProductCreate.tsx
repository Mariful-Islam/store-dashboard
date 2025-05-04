import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import TextInput from "../TextInput";
import { GlobalContext } from "../../contexts/GlobalContext";

interface ProductCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function ProductCreate({ isOpen, onClose }: ProductCreateProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {handleFormValidation} = useContext(GlobalContext)

  const navigate = useNavigate();

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    setLoading(true);
    api
      .createProduct(formData)
      .then(() => {
        setLoading(false);
        onClose();
        navigate(`/products`);
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create product">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <TextInput
            id="name"
            type="text"
            name="name"
            placeholder="Type your product name.."
            value={formData?.name || ""}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <TextInput
            id="description"
            type="text"
            name="description"
            placeholder="Type your product description.."
            value={formData?.description || ""}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug
          </label>
          <TextInput
            id="slug"
            type="text"
            name="slug"
            placeholder="Type your product name.."
            value={formData?.slug || ""}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <TextInput
            id="category"
            type="text"
            name="category"
            placeholder="Type your product category.."
            value={formData?.category || ""}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="DangerOutline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="Normal"
            submit
            className="flex gap-2 items-center duration-200"
            
            disable={!handleFormValidation(formData, [
              "name",
              "description",
              "slug",
              "category",
            ])}
          >
            {loading ? <div className=" spinner"></div> : <div>Create</div>}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
