import React, { useContext, useState } from "react";
import Form from "../Form";
import Modal from "../Modal";
import { useApi } from "../../api/api";
import { useToast } from "../../contexts/Notification";
import TextInput from "../TextInput";
import Select from "react-select";
import Button from "../Button";
import { GlobalContext } from "../../contexts/GlobalContext";

interface PaymentFormProps {
  isOpen: boolean;
  onClose: VoidFunction;
  orderId: number;
  refresh: VoidFunction;
}

function PaymentForm({ isOpen, onClose, orderId, refresh }: PaymentFormProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>({ order: orderId });
  const {handleFormValidation} = useContext(GlobalContext)
  const [loading, setLoading] = useState<boolean>(false)

  const { addToast } = useToast();

  const fields = [
    "amount",
    "payment_method",
  ];

  const PaymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Paypal", label: "Paypal" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "Credit Card", label: "Credit Card" },
  ];

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    api
      .makePayment(formData)
      .then(() => {
        addToast("Order payment successful.", "success");
        onClose();
        refresh();
        setLoading(false) 
      })
      .catch(() => {
        addToast("Payment Failed !!", "error");
      });

    return "";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment">
      <form onSubmit={handlePay}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-slate-500 dark:text-slate-300"
          >
            Amount
          </label>
          <TextInput
            id={"amount"}
            type="text"
            name={"amount"}
            placeholder={`Enter amount`}
            value={formData?.amount || ''}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="payment_method"
            className="text-sm font-medium text-slate-500 dark:text-slate-300"
          >
            payment_method
          </label>

          <Select
            id="payment_method"
            name="payment_method"
            options={PaymentOptions}
            value={
              formData?.payment_method
                ? {
                    value: formData?.payment_method,
                    label: formData?.payment_method,
                  }
                : null
            }
            onChange={(e) =>
              setFormData((prev:any) => ({
                ...prev,
                payment_method: e ? e.value : "",
              }))
            }
            isClearable
          />
        </div>

        <div className="mt-4 flex gap-4 justify-end">
          <Button btntype="DangerOutline" onClick={onClose}>
            Cancel
          </Button>
          <Button btntype="Normal" type="submit" disabled={!handleFormValidation(formData, fields)}>
            {loading ? <div className="spinner"></div> : <div>Pay</div> }
          </Button>
        </div>

      </form>
    </Modal>
  );
}

export default PaymentForm;
