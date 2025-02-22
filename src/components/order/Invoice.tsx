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
    { label: "Price", accessor: "price" },
  ];
  return (
    <div ref={ref} className="p-8 hidden print:block">
      <h1 className="text-3xl">Store</h1>
      <div className="flex justify-between mt-6">
        <div>
          <h1>Retailer</h1>
          <div>
            <div className="flex">
              <div>Name: </div>
              <div>
                {data?.retailer.first_name} {data?.retailer.last_name} -{" "}
                {data?.retailer.username}
              </div>
            </div>
            <div className="flex">
              <div>Phone: </div>
              <div>{data?.retailer.phone}</div>
            </div>
            <div className="flex">
              <div>Email: </div>
              <div>{data?.retailer.email}</div>
            </div>
            <div className="flex">
              <div>Address: </div>
              <div>{data?.retailer.address}</div>
            </div>
          </div>
        </div>
        <div>
          <h1>Customer</h1>
          <div>
            <div className="flex gap-2">
              <div>Name: </div>
              <div>
                {data?.customer.first_name} {data?.customer.last_name} -{" "}
                {data?.customer.username}
              </div>
            </div>
            <div className="flex gap-2">
              <div>Phone: </div>
              <div>{data?.customer.phone}</div>
            </div>
            <div className="flex gap-2">
              <div>Email: </div>
              <div>{data?.customer.email}</div>
            </div>
            <div className="flex gap-2">
              <div>Address: </div>
              <div>{data?.customer.address}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Table columns={columns} data={data?.variants} />
      </div>
      <div className="flex flex-col gap-1 items-end mt-2">
        <div className="flex gap-2">
          <div>Total Quantity: </div>
          <div>{data?.total_qty}</div>
        </div>
        <div className="flex gap-2">
          <div>Total Price: </div>
          <div>{data?.total_price}</div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
