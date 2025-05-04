import React, { useEffect, useState } from "react";
import ZingChart from "zingchart-react";
import Select from "../Select";
import moment from "moment";

export default function SellsChart({ data }: { data?: any }) {
  const theme = localStorage.getItem("theme");
  const [duration, setDuration] = useState<string>("daily");
  const [chartConfig, setChartConfig] = useState<any>({});

  useEffect(() => {
    if (!data || !data[duration]) return;

    const salesValues = data[duration].map(
      (item: any) => item?.total_sales ?? 0
    );

    const salesLabels = data[duration].map((item: any) => {

      if (duration === "daily") return moment(item?.day).format("DD MMM");
      if (duration === "weekly") return `Week ${moment(item?.week).week()}`;
      if (duration === "monthly") return moment(item?.month).format("MMM");
      return moment(item?.day).format("DD");
    });

    setChartConfig({
      type: "line",
      series: [
        {
          values: salesValues,
          tooltip: {
            text: "%node-value Taka",
            backgroundColor: "#2196F3",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            fontColor: "#fff",
            padding: "10px",
            shadow: true,
            shadowColor: "#000",
            shadowBlur: "8",
          },
        },
      ],
      scaleX: {
        labels: salesLabels,
        label: {
          text: (duration==="daily" && "Days") || (duration==="weekly" && "Weeks") || (duration==="monthly" && "Months") ,
          color: "#2196F3",
        },
        item: {
          fontColor: theme === "dark" ? "#fff" : "#000",
        },
      },
      scaleY: {
        label: {
          text: "Taka",
          color: "#2196F3",
          fontWeight: "bold",
        },
        item: {
          fontColor: theme === "dark" ? "#fff" : "#000",
        },
      },
      backgroundColor: theme === "dark" ? "#0F172A" : "#fff",
    });
  }, [data, duration, theme]);

  const handleDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(e.target.value.toLowerCase());
  };

  return (
    <div className="bg-white p-4 border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900">
      <h2 className="text-lg font-bold text-center mb-4">
        Everyday Sells Report
      </h2>
      <Select value={duration} onChange={handleDuration}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Select>
      <ZingChart data={chartConfig} height={400} width="100%" />
    </div>
  );
}
