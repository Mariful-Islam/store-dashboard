
import Drawer from '../Drawer'

interface CustomerViewProps {
  isOpen: boolean;
  onClose: VoidFunction;

}

function CustomerView({isOpen, onClose}: CustomerViewProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
       <div className='bg-white dark:bg-gray-800'>
        ddddddddddddddddddd
       </div>
    </Drawer>
  )
}

export default CustomerView