import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import QRScanner from "../QRCodeScanner";
import { MdQrCodeScanner } from "react-icons/md";
import Table from "../Table";
import PaymentForm from "./PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducers";
import { fetchProducts } from "../../redux/productsSlice";
import { fetchCustomers } from "../../redux/userSlice";
import Select from 'react-select'




interface OrderCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
  refresh: VoidFunction
}

export default function OrderCreate({ isOpen, onClose, refresh }: OrderCreateProps) {
  const api = useApi();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<any>({ variant_payload: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenQr, setOpenQr] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false)

  const products:any = useSelector((state:RootState)=>state.products.results)
  const customers:any = useSelector((state:RootState)=>state.customers.results)

  const [totalQTY, setTotalQTY] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();


  useEffect(()=>{
    dispatch(fetchProducts() as any)
    dispatch(fetchCustomers() as any)
  }, [dispatch])


  useEffect(() => {
    const totalQty = formData.variant_payload.reduce((accumulator, variant) => {
      return accumulator + (Number(variant?.quantity) || 0);
    }, 0);

    const totalPrice = formData.variant_payload.reduce((accumulator, variant) => {
      return accumulator + (Number(variant?.price) || 0);
    }, 0);

    setTotalQTY(totalQty);
    setTotalPrice(totalPrice);
  }, [formData.variant_payload]);


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    api.createOrders(formData).then((response) => {
        setLoading(false);
        onClose()
        refresh()
        navigate(`/orders`);
        return "success"
      }).catch(() => {
        console.log("Error");
        setLoading(false);
        return "failed"
      });
    return ""
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
      setOpenQr(false)
    }
  };


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


  const fields = [
    `variant*select>${products?.results?.map((prod:any, index)=>prod.slug)}`,
    `customer_name*select>${customers?.results?.map((cus:any, index)=>cus.username)}`,
    `retailer_name*select>${customers?.results?.map((cus:any, index)=>cus.username)}`,


  ]


  useEffect(()=>{
    if(formData?.variant){
      setFormData((prev:any)=>({...prev, variant_payload: [...(prev?.variant_payload || []), ...(products?.results?.filter((prod:any)=>prod.slug===formData?.variant) || [])]}))
    }

  }, [formData?.variant])


  console.log(formData)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Order">

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


        <Form 
          fields={fields} 
          onChangeFields={(data)=>setFormData((prev:any)=>({...prev, ...data}))} 
          onClose={onClose} 
          onSubmit={onSubmit}
          submitBtnName="Create"
        />



      <Modal isOpen={isOpenQr} onClose={closeModal}>
        <div>{qrScanner}</div>
      </Modal>

      {isPaymentOpen && (
        <PaymentForm 
          isOpen={isPaymentOpen} 
          onClose={()=>setIsPaymentOpen(false)} 
          orderId={2}
          refresh={refresh}
        />
      )}
    </Modal>
  );
}
