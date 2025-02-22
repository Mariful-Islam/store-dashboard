import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Form from "../Form";

interface CustomerCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
  refresh: VoidFunction;
}

export default function CustomerCreate({ isOpen, onClose, refresh }: CustomerCreateProps) {
   const api = useApi();
   const [formData, setFormData] = useState<any>();
   const [loading, setLoading] = useState<boolean>(false);
 
   const navigate = useNavigate();
 
   const fields = [
     "first_name",
     "last_name",
     "username",
     "phone",
     "email",
     "address",
   ];
 
   const onChangeFields = (formData: any) => {
     setFormData(formData)
   };
 
   const onSubmit = () => {
     setLoading(true);
     formData['role'] = 'CUSTOMER'
     api
       .createCustomers(formData)
       .then((response) => {
         setLoading(false);
         refresh()
         onClose()
         navigate(`/customers`);
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

      <Form fields={fields} onChangeFields={onChangeFields} />

      <div className="flex gap-3 justify-end mt-4">
        <Button type="DangerOutline" onClick={onClose}>Cancel</Button>

        <Button
          type="Normal"
          submit
          className="flex gap-2 items-center duration-200"
          onClick={onSubmit}
        >
          {loading ? <div className=" spinner"></div> : <div>Create</div>}
        </Button>
      </div>
    </Modal>
  );
}
