import React, { useContext, useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApi } from "../../api/api";
import Button from "../Button";
import { CiFilter } from "react-icons/ci";
import SellFilterModal from "./SellFilterModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import moment from "moment";
import { Tooltip as ReactToolTip } from "react-tooltip";



export default function SellsChart() {
  const api = useApi();
  const [formatData, setFormatData] = useState<any>();
  const { filter, handleFilter, searchParams } = useContext(GlobalContext);

  const fetchSaleData = (searchParams: any) => {
    api
      .getSalesData(searchParams)
      .then((res) => {
        setFormatData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSaleData(searchParams);
  }, [searchParams]);

  const newFormatData = Object.entries(formatData || {})?.map(
    ([key, value]) => ({ label: key, total_sales: value })
  );

  return (
    <div className=" bg-white p-4 border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900">
      <h3 className="font-bold text-center mb-4">Total Sales</h3>

      <div className="flex gap-4 items-center">
        <Button
          btntype="white-btn"
          onClick={handleFilter}
          data-tooltip-id={`filter`}
          data-tooltip-content={"Filter"}
        >
          <CiFilter className="w-5 h-5" />
        </Button>

        <ReactToolTip id={`filter`} place="top" style={{fontSize: 12, fontWeight: 'bold'}}/>

        <div>
          {searchParams.get("date") &&
            moment(searchParams.get("date")).format("DD MMM YYYY")}
          {searchParams.get("month") &&
            moment(searchParams.get("month")).format("MMMM YYYY")}
          {(searchParams.get("start_date") || searchParams.get("end_date")) && (
            <div className="flex gap-4">
              <div>
                {moment(searchParams.get("start_date")).format("DD MMMM YYYY")}
              </div>
              <div>-</div>
              <div>
                {moment(searchParams.get("end_date")).format("DD MMMM YYYY")}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[300px] w-full mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={newFormatData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="text-sm"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_sales"
              stroke="blue"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {filter && <SellFilterModal isOpen={filter} onClose={handleFilter} />}
    </div>
  );
}
