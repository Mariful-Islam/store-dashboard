import React from 'react'
import ZingChart from 'zingchart-react';
import Table, { TableProps } from '../Table';
import { users } from './sampleItems';



export default function TopSellerRetailers() {
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
    <div
      className='w-full p-4 bg-white border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900'
    >
      <h2 className='text-lg font-bold text-center'>Top Retailer</h2>
      <div className='mt-3'>
        <Table columns={columns as any} data={users} />
      </div>
    </div>
  )
}
