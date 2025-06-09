import { useEffect, useState } from "react";
import { useApi } from "../../api/api";
import Table from "../Table";

export default function TopSellerRetailers() {
  const api = useApi();
  const [retailers, setRetailers] = useState<any>();

  const fetchTopRetailers = () => {
    api
      .getTopRetailers()
      .then((res) => setRetailers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTopRetailers();
  }, []);

  const columns = [
    {
      label: "ID",
      accessor: "id",
      render: (item: any, index: number) => <div key={index}>{item.id}</div>,
    },
    { label: "Name", accessor: "name" },
    { label: "phone", accessor: "phone" },

    { label: "Total Sold", accessor: "total_sold" },
  ];

  return (
    <div className="max-w-full p-4 bg-white border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900">
      <h3 className="font-bold text-center">Top Retailer</h3>
      <div className="mt-3">
        <Table columns={columns as any} data={retailers} />
      </div>
    </div>
  );
}
