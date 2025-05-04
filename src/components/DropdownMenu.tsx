// components/DropdownMenu.tsx

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


type MenuItemType = {
  label: string
  href?: string
  onClick?: () => void
  isActive: boolean
}

type DropdownMenuProps = {
  buttonLabel: any
  items: MenuItemType[][]
}

export default function DropdownMenu({ buttonLabel, items }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative ">
      <div className='h-[34px]'>
        <MenuButton className="">
          {buttonLabel}
          
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {items.map((group, groupIndex) => (
          <div className="py-1" key={groupIndex}>
            {group.map((item, itemIndex) => (
              <MenuItem key={itemIndex}>
                {() => (
                  <div
                    // href={item.href || '#'}
                    onClick={item.onClick}
                    className={`${item.isActive && 'bg-blue-500 text-white'} block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-100`}
                  >
                    {item.label}
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        ))}
      </MenuItems>
    </Menu>
  )
}
