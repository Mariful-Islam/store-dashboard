import React from 'react'

export default function Label(props: React.LabelHTMLAttributes<any>) {
  return (
    <label 
      className='text-sm text-gray-600 dark:text-gray-200 font-medium'    
      {...props}
      >
        {props.children}
    </label>
  )
}
