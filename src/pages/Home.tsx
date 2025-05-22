import { useEffect, useState } from "react";
import { API_URL } from "../api/interceptor";
import { useApi } from "../api/api";
import Cards from "../components/dashboard/Cards";
import Table from "../components/Table";

import TopSellingProducts from "../components/dashboard/TopSellingProducts";
import TopBuyingCustomers from "../components/dashboard/TopBuyingCustomers";
import SellsChart from "../components/dashboard/SellsChart";
import TopSellerRetailers from "../components/dashboard/TopSellerRetailers";
import Button from "../components/Button";


export default function Home() {
  const api = useApi();
  const [data, setData] = useState<any>();

  const fetchDashboardDetail = () => {
    api
      .getDashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => console.log("Error"));
  };

  useEffect(() => {
    fetchDashboardDetail();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`${API_URL}/ws/dashboard/`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ value: "hello how are you" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
    };

    ws.onclose = () => {
      console.log("Disconnected.........");
    };
  }, []);




  return (
    <div className="">
      <Cards data={data}/>
      {/* <Table columns={[]} data={[]}/> */}
      <div className=" mt-4">
        <div>
          <SellsChart data={data?.sells}/>
        </div>
        <div className="mt-4">
          <TopSellingProducts data={data?.top_selling_products || []}/>
   
        </div>
        <div className="mt-4 flex gap-4 w-full">
          <div className="w-full">
            <TopBuyingCustomers/>
          </div>
          <div className="w-full">
            
            <TopSellerRetailers />
          </div>
        </div>

      </div>
    </div>
  );
}
