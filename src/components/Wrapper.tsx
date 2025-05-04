import React from 'react'

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement>{children?:React.ReactNode}


export default function Wrapper({className='', children, ...rest }:WrapperProps) {

  return (
    <div 
        {...rest}
        className={` ${className} border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-3 rounded-md flex justify-between items-center gap-4`}
    >
        {children}
    </div>
  )
}
