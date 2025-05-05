import React from 'react'
import { sideBarItems } from './sideBarItems'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
    const {pathname} = useLocation()

  return (
    <aside className='border-r border-gray-200 pr-3'>
        {sideBarItems.map((item, index)=>(
            <Link 
                key={index} 
                to={item.url} 
                className={`${item.url===pathname ? 'text-blue-500': ''} flex flex-row items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100`}
            >
                {item.icon}{item.name}
            </Link>
        ))}
    </aside>
  )
}
