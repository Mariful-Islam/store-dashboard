import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Form from "../Form";
import QRScanner from "../QRCodeScanner";
import { MdQrCodeScanner } from "react-icons/md";
import Table from "../Table";

interface OrderCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function OrderCreate({ isOpen, onClose }: OrderCreateProps) {
  const api = useApi();
  const [formData, setFormData] = useState({ variant_payload: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenQr, setOpenQr] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const totalQTY = formData?.variant_payload.reduce((accumulator, variant) => {
    return accumulator + (variant?.quantity || 0); // Ensure you add 0 if price is undefined
  }, 0)

  const totalPrice = formData?.variant_payload.reduce((accumulator, variant) => {
    return accumulator + (variant?.price || 0); // Ensure you add 0 if price is undefined
  }, 0)

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
    api.createOrders(formData).then((response) => {
        setLoading(false);
        navigate(`/orders`);
      }).catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };



  const openHello = (event: any) => {
    setOpenQr(!isOpenQr);
  };

  const closeModal = () => {
    setOpenQr(false);
  };

  const onScan = (event: any) => {
    if (event !== "") {
      const newVariant = JSON.parse(event); // Parse the incoming event data
      newVariant["quantity"] = 1;
      newVariant["price"] = newVariant?.unit_price

      setFormData((prev: any) => {
        // Check if the new variant already exists in variant_payload based on its 'id'
        const isDuplicate = prev.variant_payload.some(
          (variant: any) => variant.id === newVariant.id
        );

        // If it's not a duplicate, add the new variant, otherwise keep the old array
        return {
          ...prev,
          variant_payload: isDuplicate
            ? prev.variant_payload
            : [...prev.variant_payload, newVariant], // Add the new variant if not a duplicate
          total_price: totalPrice,
          total_qty: totalQTY
        };
      });
    }
  };

  console.log(formData);

  const qrScanner = isOpen ? <QRScanner onScan={onScan} /> : null;

  const onChangeQuantity = (e: any, id: number) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      variant_payload: prev.variant_payload.map(
        (variant: any) =>
          variant.id === id
            ? { ...variant, [name]: value, price: value * variant.unit_price } // Update the field (e.g., quantity) for the specific variant
            : variant // Keep the other variants unchanged
      ),
      total_price: totalPrice,
      total_qty: totalQTY
    }));
  };

  const columns = [
    { label: "Product", accessor: "name" },
    { label: "Unit Price", accessor: "unit_price" },
    {
      label: "Quantity",
      accessor: "",
      render: (item: any) => (
        <div>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={item?.quantity}
            onChange={(e) => onChangeQuantity(e, item.id)}
            className="w-16 rounded-md border border-slate-600 dark:border-slate-00 px-1"
          />
        </div>
      ),
    },
    {
      label: "Total price",
      accessor: "",
      render: (item: any) => <div>{item.unit_price * item.quantity}</div>,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center font-medium pb-2 mb-4 border-slate-300 border-b">
        <h1>Order Create</h1>
        <RxCross1
          onClick={onClose}
          className="cursor-pointer w-6 h-6 p-1 hover:bg-slate-400 dark:hover:bg-slate-600 rounded-full"
        />
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div
          className="h-[150px] flex justify-center items-center hover:text-blue-500"
          onClick={openHello}
        >
          <MdQrCodeScanner className="w-10 h-10" />
        </div>

        {formData?.variant_payload.length !== 0 && (
          <div>
            <Table columns={columns as any} data={formData?.variant_payload} />
            <div className="flex gap-3 justify-end mt-2">
              <div className="flex gap-1 text-sm">
                <div className="font-medium text-slate-400">Total QTY: </div>
                <div>
                  {totalQTY}
                </div>
              </div>
              <div className="flex gap-1 text-sm">
                <div className="font-medium text-slate-400">Total Price: </div>
                <div>
                  {totalPrice}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="customer_name" className="text-sm font-medium">
            Customer
          </label>
          <input
            id="customer_name"
            type="text"
            name="customer_name"
            placeholder="Type your customer name.."
            value={formData?.customer_name || ""}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="retailer_name" className="text-sm font-medium">
            Retailer
          </label>
          <input
            id="retailer_name"
            type="text"
            name="retailer_name"
            placeholder="Type retailer name.."
            value={formData?.retailer_name || ""}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
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
            onClick={() => setLoading(true)}
          >
            {loading ? <div className=" spinner"></div> : <div>Create</div>}
          </Button>
        </div>
      </form>

      <Modal isOpen={isOpenQr} onClose={closeModal}>
        <div>{qrScanner}</div>
      </Modal>
    </Modal>
  );
}
