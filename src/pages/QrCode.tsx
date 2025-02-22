import { useEffect, useRef, useState } from "react";
import { useApi } from "../api/api";
import { QRCodeSVG } from "qrcode.react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";


export default function QrCode() {
  const api = useApi();
  const [variants, setVariants] = useState<any>();

  const fetchVariants = () => {
    api
      .getVariants()
      .then((response) => {
        setVariants(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <div className="mb-4 flex justify-end ">
        <FiPrinter className=" hover:text-blue-500 duration-200 w-6 h-6 cursor-pointer" onClick={()=>reactToPrintFn()}/>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4" ref={contentRef} >
        {variants?.results?.map((variant:any, index: number) => (
          <div key={index} className=" border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900">
            <div className="bg-white p-3 rounded-t-md">
              <QRCodeSVG
                value={JSON.stringify({
                  id: variant.id,
                  name: variant.name,
                  product: variant.product,
                  unit_price: variant.price,
                  sku: variant.sku,
                  stock: variant.stock,
                })}
                className="w-full h-full"
              />
            </div>
            <div className="p-4 text-sm ">
              <div className="flex gap-2">
                <div className="text-slate-400 dark:text-slate-300 font-medium">
                  Name:{" "}
                </div>
                <div className="text-slate-900 dark:text-slate-400">
                  {variant.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
