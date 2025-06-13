import { useState } from "react";
import Form from "../Form";
import { useApi } from "../../api/api";
import Modal from "../Modal";

interface CustomerEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  data: any;
  refresh: VoidFunction;
}

function CustomerEdit({ isOpen, onClose, data, refresh }: CustomerEditProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>({});

  const fields = [
    "first_name",
    "last_name",
    "username",
    "phone",
    "email",
    "address",
  ];

  const onChangeFields = (formData: any) => {
    setFormData(formData);
  };

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    formData["role"] = "CUSTOMER";
    api
      .editCustomer(data?.id, formData)
      .then(() => {
        refresh();
        onClose();
      })
      .catch(() => {
        console.log("Error");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Edit">
      <div className="bg-white dark:bg-gray-800">
        <Form
          fields={fields}
          onChangeFields={onChangeFields}
          edit={data}
          onClose={onClose}
          onSubmit={onUpdate}
        />
      </div>
    </Modal>
  );
}

export default CustomerEdit;
