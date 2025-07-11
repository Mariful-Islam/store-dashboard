import React, { useContext, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useApi } from "../../api/api";
import TextInput from "../TextInput";
import { GlobalContext } from "../../contexts/GlobalContext";

interface SubCategoryEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  previous: any;
  refresh: VoidFunction
}

export default function SubCategoryEdit({ isOpen, onClose, previous, refresh }: SubCategoryEditProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>(previous);
  const [loading, setLoading] = useState<boolean>(false);
  const {handleFormValidation} = useContext(GlobalContext)


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
      .editSubCategory(formData, previous?.id)
      .then(() => {
        setLoading(false);
        onClose();
        refresh()
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };


  console.log(formData, )



  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sub Category Edit">
      <form className="flex flex-col gap-4" onSubmit={onSubmit} method="post">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <TextInput
            id="name"
            type="text"
            name="name"
            placeholder="Type your category name.."
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
            placeholder="Type your category description.."
            value={formData?.description || ""}
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
            
            disabled={!handleFormValidation(formData, [
              "name",
              "description"
            ])}
          >
            {loading ? <div className=" spinner"></div> : <div>Update</div>}
          </Button>

        </div>
      </form>
    </Modal>
  );
}
