import { useContext, useEffect, useRef, useState } from "react";
import { useApi } from "../api/api";
import { QRCodeSVG } from "qrcode.react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Select from "../components/Select";
import { GlobalContext } from "../contexts/GlobalContext";
import Button from "../components/Button";

export default function QrCode() {
  const api = useApi();
  const [variants, setVariants] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "15" });
  const { handleSelectItemPerPage } = useContext(GlobalContext);

  const fetchVariants = (searchParams: any) => {
    api
      .getVariants(searchParams)
      .then((response) => {
        setVariants(response.data);
      })
      .catch(() => console.log("Erorr"));
  };

  useEffect(() => {
    fetchVariants(searchParams);
  }, [searchParams]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (!variants) {
    return (
      <div className="flex justify-center items-center h-dvh w-full">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <h3 className="font-bold">Variant Qr Code</h3>
        <Button
          type="white-btn"
          hoverText="Print Variant Qr COde"
          hoverTextAlignClass="-left-[200px]"
          className="hover:text-blue-500"
        >
          <FiPrinter
            className=" hover:text-blue-500 duration-200 w-6 h-6 cursor-pointer"
            onClick={() => reactToPrintFn()}
          />
        </Button>
      </div>
      <Wrapper>
        <div className="flex gap-4 items-center justify-between w-full text-[12px]">
          <div>
            <strong className="text-gray-500 dark:text-gray-200">
              Items:{" "}
            </strong>
            <strong className="text-gray-700 dark:text-gray-200">
              {variants?.results?.length}
            </strong>
          </div>
          <div>
            <strong className="text-gray-500 dark:text-gray-200">
              Total:{" "}
            </strong>
            <strong className="text-gray-700 dark:text-gray-200">
              {variants?.count}
            </strong>
          </div>
        </div>
      </Wrapper>

      <div
        className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1 mt-2`}
        ref={contentRef}
      >
        {variants?.results?.map((variant: any, index: number) => (
          <div
            key={index}
            className=" border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900"
          >
            <div className="bg-white p-3 rounded-t-md">
              <QRCodeSVG
                value={JSON.stringify({
                  id: variant.id,
                  name: variant.name,
                  product: variant.product,
                  price: variant.price,
                  sku: variant.sku,
                  stock: variant.stock,
                })}
                className="w-full h-full"
              />
            </div>
            <div className="p-2 text-sm ">
              <div className="flex gap-2">
                <div className="text-slate-900 dark:text-slate-400 text-[12px]">
                  <span className="text-lg font-bold">{variant.name}</span>{" "}
                  <br />
                  <span className="font-bold">{variant.price} </span>
                  <br />
                  <span className="font-bold">Sku:</span> {variant.sku} <br />
                  <span className="font-bold">Stock:</span> {variant.stock}
                  {Object.entries(variant?.attribute).map(
                    ([key, value]: any, index) => (
                      <div key={index}>
                        {key === "color" ? (
                          <span className="flex gap-1">
                            <strong>{key}: </strong> {value}{" "}
                            <div
                              style={{ backgroundColor: value }}
                              className={`h-4 w-4 p-0 m-0 rounded-full`}
                            ></div>
                          </span>
                        ) : (
                          <span>
                            <strong>{key}: </strong> {value}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Wrapper className="mt-2">
        <div>{variants && <Paginator data={variants} />}</div>

        <div>
          <Select
            value={searchParams.get("pages") || ""}
            onChange={handleSelectItemPerPage}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </Select>
        </div>
      </Wrapper>
    </div>
  );
}
