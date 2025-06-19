import Cards from "../components/dashboard/Cards";

import TopSellingProducts from "../components/dashboard/TopSellingProducts";
import TopBuyingCustomers from "../components/dashboard/TopBuyingCustomers";
import SellsChart from "../components/dashboard/SellsChart";


export default function Home() {


  return (
    <div className="">
      <Cards />
      <div className=" mt-4">
        <div>
          <SellsChart />
        </div>
        <div className="mt-4 w-full">
          <TopSellingProducts />
  
        </div>
        <div className="mt-4 grid grid-cols-1 mh:grid-cols-2 gap-4">
          <div className="w-full">
            <TopBuyingCustomers />
          </div>
          <div className="w-full">
            section
          </div>
        </div>
      </div>
    </div>
  );
}
