import Table from '../Table';
import { users } from './sampleItems';


export default function TopBuyingCustomers() {
  
  const columns = [
    {
      label: 'ID', accessor: 'id', render: (item:any, index:number)=>(
        <div>
          {item.id}
        </div>
      )
    },
    { label: 'Name', accessor: 'name'},
    { label: 'phone', accessor: 'phone'},

    { label: 'Total spend', accessor: 'totalSpend'}

  ]


  return (
    <div className='bg-white border p-4 border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900'>
      <h2 className='text-lg font-bold text-center'>Top Customer</h2>
      <div className='mt-3'>
        <Table columns={columns as any} data={users}/>
      </div>
    </div>
  )
}
