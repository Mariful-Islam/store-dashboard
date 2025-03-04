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

export default function RetailerCreate({
  isOpen,
  onClose,
  refresh
}: CustomerCreateProps) {
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
    formData['role'] = 'RETAILER'
    api
      .createRetailers(formData)
      .then((response) => {
        setLoading(false);
        refresh()
        onClose()
        navigate(`/retailers`);
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Retailer">


      <Form fields={fields} onChangeFields={onChangeFields} onClose={onClose} onSubmit={onSubmit} submitBtnName="Create" />


    </Modal>
  );
}
