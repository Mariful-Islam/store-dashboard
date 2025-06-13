import moment from "moment";
import Table from "../Table";

interface InvoiceProps {
  data: any;
  ref: any;
}

function Invoice({ data, ref }: InvoiceProps) {
  const columns = [
    {
      label: "ID",
      accessor: "id",
      render: (item: any) => (
        <div className="text-sm text-gray-400">#{item.id}</div>
      ),
    },
    // { label: "Update", accessor: "updated_at" },
    { label: "Order Items", accessor: "name" },
    { label: "Unit Price", accessor: "unit_price" },
    { label: "Quantity", accessor: "quantity" },
    {
      label: "Price",
      accessor: "price",
      render: (item: any) => (
        <div className="text-sm text-gray-400">{item.price.toFixed(2)}</div>
      ),
    },
  ];

  const paymentsColumns = [
    {
      label: "ID",
      accessor: "id",
      render: (item: any) => (
        <div className="text-sm text-gray-400">#{item.id}</div>
      ),
    },
    {
      label: "Payment method",
      accessor: "payment_method",
    },
    {
      label: "Amount",
      accessor: "amount",
    },
    {
      label: "Payment date",
      accessor: "payment_date",
      render: (item: any) => (
        <div className="text-sm text-gray-400">
          {moment(item.payment_date).format("HH:MM:SS A DD-MMM-YYYY")}
        </div>
      ),
    },
  ];

  return (
    <div ref={ref} className="p-8 hidden print:block">
      <h1 className="text-3xl">Store</h1>
      <div className="flex justify-between mt-6 gap-12">
        <div>
          <h1 className="border-b">Retailer</h1>
          <div className="mt-1">
            <table>
              <tbody>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Name </td>
                  <td className="text-gray-500">
                    {data?.retailer.first_name} {data?.retailer.last_name}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Phone </td>
                  <td className="text-gray-500">{data?.retailer.phone}</td>
                </tr>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Email </td>
                  <td className="text-gray-500">{data?.retailer.email}</td>
                </tr>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Address </td>
                  <td className="text-gray-500"> {data?.retailer.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h1 className="border-b">Customer</h1>
          <div className="mt-1">
            <table>
              <tbody>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Name </td>
                  <td className="text-gray-500">
                    {data?.customer.first_name} {data?.customer.last_name}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Phone </td>
                  <td className="text-gray-500">{data?.customer.phone}</td>
                </tr>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Email </td>
                  <td className="text-gray-500">{data?.customer.email}</td>
                </tr>
                <tr>
                  <td className="font-bold text-gray-500 pr-2">Address </td>
                  <td className="text-gray-500"> {data?.customer.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl mb-2">Order Items</h3>
        <Table columns={columns} data={data?.variants} />
      </div>
      <div className="flex flex-col gap-1 items-end mt-2">
        <div className="flex gap-2">
          <div>Total Quantity: </div>
          <div>{data?.total_qty}</div>
        </div>
        <div className="flex gap-2">
          <div>Total Price: </div>
          <div>{Number(data?.total_price).toFixed(2)}</div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl mb-2">Payment history</h3>
        <Table columns={paymentsColumns} data={data?.payments} />
      </div>
    </div>
  );
}

export default Invoice;
