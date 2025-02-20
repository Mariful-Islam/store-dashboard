
import Drawer from "../Drawer";

interface CustomerEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

function CustomerEdit({isOpen, onClose}: CustomerEditProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
       <div className='bg-white dark:bg-gray-800'>
        dscsdcs
       </div>
    </Drawer>
  )
}

export default CustomerEdit