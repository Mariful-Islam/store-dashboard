// components/DropdownMenu.tsx

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'


type MenuItemType = {
  label: string
  href?: string
  onClick?: () => void
  isActive: boolean
}

type DropdownMenuProps = {
  buttonLabel: any
  children: React.ReactNode
}

export default function Dropdown({ buttonLabel, children }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative ">
      <div className='h-[34px]'>
        <MenuButton className="">
          {buttonLabel}
          
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-[330px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {children}
        <MenuItem>{()=><div>hello</div>}</MenuItem>
      </MenuItems>
    </Menu>
  )
}
