
import Drawer from "../Drawer";

interface ProductEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export function DiscountEdit({isOpen, onClose}: ProductEditProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
       <div className='bg-white dark:bg-gray-800'>
        dscsdcs
       </div>
    </Drawer>
  )
}
