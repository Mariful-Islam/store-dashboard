import { useEffect } from "react";
import { API_URL } from "../api/interceptor";

export default function Home() {
  const data = [
    {
      sales: {
        total_sales: 343,
        total_sales_amount: 4421454,
      },
    },
    {
      products: {
        selled_products: 43,
        profit: 4421454,
      },
    },
    {
      customer: {
        total_customer: 23,
        male: 12,
        female: 11
      },
    },
  ];

  useEffect(()=>{
    const ws = new WebSocket(`${API_URL}/ws/dashboard/`)

    ws.onopen = ()=> {
      ws.send(JSON.stringify({'value': 'hello how are you'}))
    }

    ws.onmessage = (event)=> {

      const data = JSON.parse(event.data);
    }

    ws.onclose = ()=> {
      console.log('Disconnected.........')
    }
    
  }, [])

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900"
          >
            {item.sales && item.sales.total_sales && (
              <>
                <p>Total Sales: {item.sales.total_sales}</p>
                <p>Total Sales Amount: {item.sales.total_sales_amount}</p>
              </>
            )}
            {item.products && item.products.selled_products && (
              <>
                <p>Products Sold: {item.products.selled_products}</p>
                <p>Profit: {item.products.profit}</p>
              </>
            )}
            {item.customer && item.customer.total_customer && (
              <>
                <p>Total Customers: {item.customer.total_customer}</p>
                <p>Male Customers: {item.customer.male}</p>
                <p>Female Customers: {item.customer.female}</p>


              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
