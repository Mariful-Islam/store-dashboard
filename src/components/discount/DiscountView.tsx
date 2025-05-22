import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import Drawer from "../Drawer";
import { useApi } from "../../api/api";
import { useEffect, useState } from "react";
import { LuPrinter } from "react-icons/lu";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";
import Button from "../Button";
import { MdDelete } from "react-icons/md";
import { useToast } from "../../contexts/Notification";
import { CiEdit } from "react-icons/ci";
import Table from "../Table";

interface ProductViewProps {
  isOpen: boolean;
  onClose: VoidFunction;
  id: number;
}

export function DiscountView({ isOpen, onClose, id }: ProductViewProps) {
  const api = useApi();
  const [discount, setDiscount] = useState<any>();
  const [variantForm, setVariantForm] = useState<boolean>(false)
  const {addToast} = useToast()
  const [variantEdit, setVariantEdit] = useState(null)

  const fetchDiscountDetail = () => {
    api
      .getDiscountDetail(id)
      .then((response) => {
        setDiscount(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    if (id) {
      fetchDiscountDetail();
    }
  }, [id]);




  if(!discount){
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="bg-white dark:bg-gray-800 h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      </Drawer>
    )
  }

  const handleDeleteVariant = (id: number) => {
    api.deleteVariant(id).then(()=>{
      addToast("Variant successfully deleted !", "success")
      fetchDiscountDetail()
    }).catch(()=>addToast("Variant failed to delete !", "error"))
  }

  const columns = [
    {
      label: "ID", accessor: "id"
    },
    {
      label: "Name", accessor: "name"
    },
    {
      label: "Category", accessor: "category"
    },
  ]

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Product">
      <div className="flex flex-col gap-3 text-sm">
        <div className="border border-slate-300 dark:border-slate-600 rounded-md p-4 text-slate-800 dark:text-slate-50">
          <div>
            <strong>Discount Name: </strong>
            {discount?.name}
          </div>

          <div>
            <strong>Discount Amount: </strong>
            {discount?.discount_amount}
          </div>
  

          <div className={`mt-4 ${discount?.type==="PERCENTAGE" ? 'bg-blue-50 dark:bg-blue-500 text-blue-500 dark:text-blue-50': 'bg-green-50 dark:bg-green-500 text-green-500 dark:text-green-50'} font-medium rounded-md w-fit px-4 py-1`}>
            {discount?.type}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-slate-800 dark:text-slate-50 font-bold">Eligible Products</h1>

        </div>
        <div >
          <Table columns={columns} data={discount?.products}/>   

        </div>

      </div>
    </Drawer>
  );
}

