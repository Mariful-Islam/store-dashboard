import React from 'react'

export default function Select(props:React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select 
        {...props}
        className='text-sm border border-gray-200 dark:border-gray-700 rounded-md duration-150 bg-gray-100 dark:bg-gray-700 hover:bg-white dark:hover:bg-black py-[4px]'
    >
        {props?.children}
    </select>
  )
}
