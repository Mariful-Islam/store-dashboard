import React from 'react'

export default function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
        {...props}
        className=" bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-black duration-150 w-full rounded-md  px-3 py-1 text-base text-slate-900 dark:text-slate-50 border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-blue-500 outline-none focus:outline-none focus:border-blue-500 sm:text-sm/6"
    />
  )
}
