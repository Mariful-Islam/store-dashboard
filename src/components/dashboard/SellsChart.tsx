import React, { useContext, useEffect, useState } from "react";
import ZingChart from "zingchart-react";
import Select from "../Select";
import moment from "moment";
import { useTheme } from "../../contexts/ThemeContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function SellsChart({ data }: { data?: any }) {
  const {theme, handleTheme} = useTheme()

  console.log(theme)

  const [duration, setDuration] = useState<string>("daily");
  const [formatData, setFormatData] = useState<any>()

  

  useEffect(() => {
    if (!data || !data[duration]) return;



    setFormatData(data?.[duration])


  }, [data, duration, theme]);

  const handleDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(e.target.value.toLowerCase());
  };


  console.log(duration, "------")


  // const formatData = data?.daily?.map((item:any)=>({'day': moment(item?.day).format('DD'), 'total_sales': item?.total_sales}))

  console.log(data)

  return (
    <div className=" bg-white p-4 border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900">
      <h2 className="text-lg font-bold text-center mb-4">
        Everyday Sells Report
      </h2>

      <Select value={duration} onChange={handleDuration} className="text-sm">
        <option value="hourly" className="text-sm">Hourly</option>
        <option value="daily" className="text-sm">Daily</option>
        <option value="monthly" className="text-sm">Monthly</option>
      </Select>


      <div className="h-[300px] w-full mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formatData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="text-sm"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_sales" stroke="blue" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
