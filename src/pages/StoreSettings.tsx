import React from 'react'
import { MainSetting, Sidebar } from '../components/setting'

export default function StoreSettings() {
  return (
    <div>
      <div className='bg-white p-6 rounded-md flex flex-row gap-4 text-slate-700'>
        <Sidebar/>
        <MainSetting/>
        
      </div>
    </div>
  )
}
