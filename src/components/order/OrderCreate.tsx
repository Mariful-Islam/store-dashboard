import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import QRScanner from "../QRCodeScanner";
import { MdQrCodeScanner } from "react-icons/md";
import Table from "../Table";
import PaymentForm from "./PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducers";
import { fetchProducts } from "../../redux/productsSlice";
import { fetchCustomers } from "../../redux/userSlice";
import VariantSelect from "./VariantSelect";
import Button from "../Button";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useToast } from "../../contexts/Notification";
import AsyncSelect from "react-select/async";
import { API_URL } from "../../api/interceptor";
import Drawer from "../Drawer";
import CustomerCreate from "../customer/CustomerCreate";

interface OrderCreateProps {
  isOpen: boolean;
  onClose: VoidFunction;
  refresh: VoidFunction;
}

export default function OrderCreate({
  isOpen,
  onClose,
  refresh,
}: OrderCreateProps) {
  const api = useApi();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<any>({ variant_payload: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenQr, setOpenQr] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [isOpenVariantSelect, setIsOpenVariantSelect] =
    useState<boolean>(false);
  const { handleFormValidation } = useContext(GlobalContext);
  const { addToast } = useToast();
  const [isOpenCustomerCreate, setIsOpenCustomerCreate] =
    useState<boolean>(false);

  const products: any = useSelector(
    (state: RootState) => state.products.results
  );
  const customers: any = useSelector(
    (state: RootState) => state.customers.results
  );

  const [totalQTY, setTotalQTY] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts() as any);
    dispatch(fetchCustomers() as any);
  }, [dispatch]);

  useEffect(() => {
    const totalQty = formData.variant_payload.reduce((accumulator, variant) => {
      return accumulator + (Number(variant?.quantity) || 0);
    }, 0);

    const totalPrice = formData.variant_payload.reduce(
      (accumulator, variant) => {
        return accumulator + (Number(variant?.price_per_total_product) || 0);
      },
      0
    );

    setTotalQTY(totalQty);
    setTotalPrice(totalPrice);
  }, [formData.variant_payload]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    api
      .createOrders(formData)
      .then((response) => {
        setLoading(false);
        onClose();
        refresh();
        navigate(`/orders`);
        return "success";
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
        return "failed";
      });
    return "";
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
      newVariant["price"] = Number(newVariant["price"]);
      newVariant["price_per_total_product"] = Number(newVariant["price"]);

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
          total_qty: totalQTY,
        };
      });
      setOpenQr(false);
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
            ? {
                ...variant,
                quantity: value,
                price_per_total_product: value * variant.price,
              } // Update the field (e.g., quantity) for the specific variant
            : variant // Keep the other variants unchanged
      ),
    }));
  };

  const handleRemoveSelectedProduct = (product: any) => {
    setFormData((prev: any) => ({
      ...prev,
      variant_payload: prev?.variant_payload?.filter(
        (item: any) => item.id !== product.id
      ),
    }));
  };

  const columns = [
    { label: "Product", accessor: "name" },
    { label: "Unit Price", accessor: "price" },
    {
      label: "Quantity",
      accessor: "",
      render: (item: any) => (
        <div>
          <input
            id="quantity"
            type="number"
            name="quantity"
            min={1}
            value={item?.quantity || 1}
            onChange={(e) => onChangeQuantity(e, item.id)}
            className="w-16 rounded-md border border-slate-500 bg-white dark:bg-gray-700 px-1 py-[1px]"
          />
        </div>
      ),
    },
    {
      label: "Total price",
      accessor: "",
      render: (item: any) => {
        const total = item?.price_per_total_product;
        return (
          <div className="flex justify-end pr-6">
            {Number(total).toFixed(2)}
          </div>
        );
      },
    },
    {
      label: "",
      accessor: "",
      render: (item: any) => {
        return (
          <div>
            <button onClick={() => handleRemoveSelectedProduct(item)}>
              <RiDeleteBin7Line className="hover:text-red-500" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (formData?.variant) {
      setFormData((prev: any) => ({
        ...prev,
        variant_payload: [
          ...(prev?.variant_payload || []),
          ...(products?.results?.filter(
            (prod: any) => prod.slug === formData?.variant
          ) || []),
        ],
      }));
    }
  }, [formData?.variant]);

  const handleVariantSelect = (products: any) => {
    const qunatifyProducts = products.map((item: any) => ({
      ...item,
      quantity: 1,
      price: Number(item.discount_price),
      price_per_total_product: Number(item.discount_price),
    }));

    const newProducts = qunatifyProducts.filter(
      (item1: any) =>
        !formData.variant_payload.some((item2: any) => item1.id === item2.id)
    );

    if (newProducts.length > 0) {
      const newPayload = [...formData.variant_payload, ...qunatifyProducts];

      const totalQty2 = newPayload.reduce(
        (acc, variant) => acc + Number(variant?.quantity),
        0
      );
      const totalPrice2 = newPayload.reduce(
        (acc, variant) => acc + Number(variant?.price_per_total_product),
        0
      );

      addToast("Products added !", "success");

      setTotalQTY(totalQty2);
      setTotalPrice(totalPrice2);

      setFormData((prev: any) => ({
        ...prev,
        variant_payload: newPayload,
      }));
    }
  };

  console.log(customers);

  useEffect(() => {
    dispatch(fetchCustomers() as any);
  }, [dispatch]);

  const fetchCustomerOptions = async (inputValue?: any) => {
    if (!inputValue) return [];
    const response = await fetch(
      `${API_URL}/store/user/api/customers/?search=${inputValue}`
    );
    const data = await response.json();

    // Transform the response into { value, label } format
    return data.results.map((item: any) => ({
      value: item.username,
      label: item.username,
    }));
  };

  useEffect(() => {
    fetchCustomerOptions();
  }, []);

  console.log(formData);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Create Order">
      <div className="flex gap-4 w-full mb-4">
        <div
          className="h-[150px] flex justify-center items-center hover:text-blue-500 w-full border border-gray-200 dark:border-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 duration-100"
          onClick={openHello}
        >
          <MdQrCodeScanner className="w-10 h-10" />
        </div>
        <div
          onClick={() => setIsOpenVariantSelect(!isOpenVariantSelect)}
          className=" text-6xl hover:text-blue-500 w-full border border-gray-200 rounded-md hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-700 duration-100 flex justify-center items-center cursor-pointer"
        >
          +
        </div>
      </div>

      {formData?.variant_payload.length !== 0 && (
        <div>
          <Table columns={columns as any} data={formData?.variant_payload} />
          <div className="flex gap-3 justify-end mt-2">
            <div className="flex gap-1 text-sm">
              <div className="font-medium text-slate-400">Total QTY: </div>
              <div>{totalQTY.toFixed(0)}</div>
            </div>
            <div className="flex gap-1 text-sm">
              <div className="font-medium text-slate-400">Total Price: </div>
              <div>{totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}

      <form>
        <div>
          <VariantSelect
            isOpen={isOpenVariantSelect}
            onClose={() => setIsOpenVariantSelect(!isOpenVariantSelect)}
            onSave={handleVariantSelect}
          />
        </div>

        {formData?.variant_payload.length !== 0 && (
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mt-6 mb-2">
                <label
                  htmlFor="customer_name"
                  className="text-sm font-medium text-slate-500 dark:text-slate-300"
                >
                  Customer
                </label>
                <Button
                  btntype="Normal"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpenCustomerCreate(true);
                  }}
                
                  type="button"
                >
                  Add
                </Button>
              </div>

              <AsyncSelect
                cacheOptions
                loadOptions={fetchCustomerOptions}
                defaultOptions={customers?.results.map((cus: any) => ({
                  value: cus.username,
                  label: cus.username,
                }))}
                placeholder="Search..."
                value={
                  formData.customer_name
                    ? {
                        value: formData.customer_name,
                        label: formData.customer_name,
                      }
                    : null
                }
                onChange={(value) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    customer_name: value ? value.value : "", // Must allow reset
                  }));
                }}
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "30px", // reduce height of the input box
                    paddingTop: "2px", // optional
                    paddingBottom: "2px", // optional
                  }),
                  option: (base, state) => ({
                    ...base,
                    paddingTop: "4px", // adjust as needed
                    paddingBottom: "4px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                    color: "black",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "2px", // shrink dropdown icon padding
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    padding: "2px", // shrink clear icon padding
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }),
                  input: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                  }),
                }}
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button btntype="DangerOutline" onClick={onClose}>
                Back
              </Button>
              <Button
                btntype="Normal"
                onClick={onSubmit}
                disabled={
                  !handleFormValidation(formData, [
                    "customer_name",
                    "variant_payload",
                  ])
                }
              >
                {loading ? <div className="spinner"></div> : <div>Create</div>}
              </Button>
            </div>
          </div>
        )}
      </form>

      <Modal isOpen={isOpenQr} onClose={closeModal}>
        <div>{qrScanner}</div>
      </Modal>

      {isPaymentOpen && (
        <PaymentForm
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          orderId={2}
          refresh={refresh}
        />
      )}

      {isOpenCustomerCreate && (
        <CustomerCreate
          isOpen={isOpenCustomerCreate}
          onClose={() => setIsOpenCustomerCreate(false)}
          refresh={() => fetchCustomerOptions()}
        />
      )}
    </Drawer>
  );
}
