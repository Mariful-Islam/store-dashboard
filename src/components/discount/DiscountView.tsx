import Drawer from "../Drawer";
import { useApi } from "../../api/api";
import { useEffect, useState } from "react";

import Button from "../Button";
import { useToast } from "../../contexts/Notification";
import Table from "../Table";
import { RiDeleteBin7Line } from "react-icons/ri";
import { DiscountEdit } from "./DiscountEdit";
import { EligibleDiscountProductSelect } from "./EligibleDiscountProductSelect";
import { CiEdit } from "react-icons/ci";
import { Tooltip } from "react-tooltip";

interface ProductViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
}

export function DiscountView({ isOpen, onClose, id }: ProductViewProps) {
  const api = useApi();
  const [discount, setDiscount] = useState<any>();
  const [formData, setFormData] = useState<any>();

  const { addToast } = useToast();
  const [edit, setEdit] = useState<any>(null);
  const [add, setAdd] = useState<boolean>(false);

  const fetchDiscountDetail = () => {
    api
      .getDiscountDetail(id)
      .then((response) => {
        setDiscount(response.data);
        setFormData(response.data);
      })
      .catch(() => addToast("Erorr Discount Detail !", "error"));
  };

  useEffect(() => {
    if (id) {
      fetchDiscountDetail();
    }
  }, [id]);

  useEffect(() => {
    if (discount) {
      setFormData((prev: any) => ({
        ...prev,
        products: prev?.products.map((product: any) => product?.id),
      }));
    }
  }, [discount]);

  if (!discount) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="bg-white dark:bg-gray-800 h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </Drawer>
    );
  }

  const removeEligibleProduct = (deleted_product_id: number) => {
    const updatedEligibleProducts = formData.products.filter(
      (product_id: any) => product_id !== deleted_product_id
    );

    const updatedFormData = { ...formData, products: updatedEligibleProducts };

    setFormData(updatedFormData);

    api
      .editDiscount(id, updatedFormData)
      .then(() => {
        fetchDiscountDetail();
        addToast("Delete eligible product !", "success");
      })
      .catch(() => addToast("Error to delete eligible product !", "error"));
  };

  const columns = [
    {
      label: "ID",
      accessor: "id",
    },
    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Category",
      accessor: "category",
    },
    {
      label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center">
          <button onClick={() => removeEligibleProduct(item?.id)}>
            <RiDeleteBin7Line className="hover:text-red-500 text-gray-700" />
          </button>
        </div>
      ),
    },
  ];

  const onUpdateElogibleProducts = (products: any) => {
    const updatedEligibleProducts = [
      ...formData.products,
      ...products.map((product: any) => product?.id),
    ];

    const updatedFormData = { ...formData, products: updatedEligibleProducts };

    setFormData(updatedFormData);

    api
      .editDiscount(id, updatedFormData)
      .then(() => {
        addToast("Elgible products are updated !", "success");
        fetchDiscountDetail();
      })
      .catch(() => addToast("Update eligible products failed !", "error"));
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Discount">
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between items-start border border-gray-200 dark:border-gray-600 rounded-md p-4 text-slate-800 dark:text-slate-50">
          <div>
            <div>
              <strong>Discount Name: </strong>
              {discount?.name}
            </div>

            <div>
              <strong>Discount Amount: </strong>
              {discount?.discount_amount}
            </div>

            <div
              className={`mt-4 ${
                discount?.type === "PERCENTAGE"
                  ? "bg-blue-50 dark:bg-blue-500 text-blue-500 dark:text-blue-50"
                  : "bg-green-50 dark:bg-green-500 text-green-500 dark:text-green-50"
              } font-medium rounded-md w-fit px-4 py-1`}
            >
              {discount?.type}
            </div>
          </div>

          <button
            className=" hover:text-blue-500"
            onClick={() => setEdit(discount)}
            data-tooltip-id={`product_edit`}
            data-tooltip-content={"Product Edit"}
          >
            <CiEdit className="w-5 h-5" />
          </button>
          <Tooltip
            id={`product_edit`}
            place="left"
            style={{ fontSize: 12, fontWeight: "bold" }}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <h1 className="text-slate-800 dark:text-slate-50 font-bold">
            Eligible Products
          </h1>
          <Button btntype="Outline" onClick={() => setAdd(true)}>
            Add Product
          </Button>
        </div>
        <div>
          <Table columns={columns} data={discount?.products} />
        </div>

        {edit && (
          <DiscountEdit
            isOpen={edit ? true : false}
            onClose={() => setEdit(null)}
            discount={formData}
            refresh={fetchDiscountDetail}
          />
        )}

        {add && (
          <EligibleDiscountProductSelect
            isOpen={add}
            onClose={() => setAdd(false)}
            prevSelectedProducts={discount.products}
            onSave={(products) => onUpdateElogibleProducts(products)}
          />
        )}
      </div>
    </Drawer>
  );
}
