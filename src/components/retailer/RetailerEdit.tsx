import { useState } from "react";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import Modal from "../Modal";

interface CustomerEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  data: any;
  refresh: VoidFunction;
}

export function RetailerEdit({
  isOpen,
  onClose,
  data,
  refresh,
}: CustomerEditProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>({});
  // const [loading, setLoading] = useState<boolean>(false);
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
    setFormData(formData);
  };

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    formData["role"] = "RETAILER";
    // setLoading(true);
    api
      .editRetailer(data?.id, formData)
      .then(() => {
        // setLoading(false);
        refresh();
        onClose();
        navigate(`/retailers`);
      })
      .catch(() => {
        console.log("Error");
        // setLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Retailer Edit">
      <div className="bg-white dark:bg-gray-800">
        <Form
          fields={fields}
          onChangeFields={onChangeFields}
          edit={data}
          onSubmit={onUpdate}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
