import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

interface CustomerCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function CustomerCreate({ isOpen, onClose }: CustomerCreateProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);


  const navigate = useNavigate();

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
      .createProduct(formData)
      .then((response) => {
        setLoading(false);
        navigate(`/`);
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };

  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center font-medium pb-2 mb-4 border-slate-300 border-b">
          <h1>
            Customer Create
          </h1>
          <RxCross1 onClick={onClose} className="cursor-pointer w-6 h-6 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full" />
      </div>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Type your product name.."
            value={formData?.name}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Type your product description.."
            value={formData?.description}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            name="slug"
            placeholder="Type your product name.."
            value={formData?.slug}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Type your product category.."
            value={formData?.category}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="DangerOutline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="Normal" submit className="flex gap-2 items-center duration-200" onClick={()=>setLoading1(true)}>

            {loading ? <div className=" spinner"></div> : <div>Create</div> }
          </Button>
        </div>
      </form>
    </Modal>
  );
}
