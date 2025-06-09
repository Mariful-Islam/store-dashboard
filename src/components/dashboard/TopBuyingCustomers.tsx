import { useEffect, useState } from 'react';
import { useApi } from '../../api/api';
import Table from '../Table';


export default function TopBuyingCustomers() {
  const api = useApi()
  const [customers, setCustomers] = useState<any>()

  const fetchTopCustomers = () => {
    api.getTopCutomers().then((res)=>setCustomers(res.data)).catch((err)=>console.log(err))
  }

  useEffect(()=>{
    fetchTopCustomers()
  }, [])
  
  const columns = [
    {
      label: 'ID', accessor: 'id', render: (item:any, index:number)=>(
        <div key={index}>
          {item.id}
        </div>
      )
    },
    { label: 'Name', accessor: 'name'},
    { label: 'phone', accessor: 'phone'},

    { label: 'Total spend', accessor: 'total_spend'}

  ]

  return (
    <div className='max-w-full bg-white border p-4 border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900'>
      <h3 className='font-bold text-center'>Top Customer</h3>
      <div className='mt-3'>
        <Table columns={columns as any} data={customers}/>
      </div>
    </div>
  )
}
