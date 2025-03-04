import React, { useState } from "react";
import Form from "../Form";
import Modal from "../Modal";
import { useApi } from "../../api/api";
import { useToast } from "../../contexts/Notification";

interface PaymentFormProps {
  isOpen: boolean;
  onClose: VoidFunction;
  orderId: number;
}

function PaymentForm({ isOpen, onClose, orderId }: PaymentFormProps) {
  const api = useApi()
  const [formData, setFormData] = useState({order: orderId});

  const {addToast} = useToast()

  const fields = ["amount", "payment_method*select>Cash|Bank Transfer|Paypal|Debit Card|Credit Card"];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    api.makePayment(formData).then(()=>{
      addToast("Order payment successful.", "success")
      return "success"
    }).catch(()=>{
      addToast("Payment Failed !!", "error")
      return "failed"
    })

    return ""

  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment">

      <Form
        fields={fields}
        onChangeFields={(data) => setFormData(data)}
        onClose={onClose}
        onSubmit={handlePay}
        submitBtnName="Pay"
      />

    </Modal>
  );
}

export default PaymentForm;
