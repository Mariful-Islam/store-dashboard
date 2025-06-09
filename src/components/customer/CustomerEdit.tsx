
import { useState } from "react";
import Button from "../Button";
import Drawer from "../Drawer";
import Form from "../Form";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";

interface CustomerEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  data: any;
  refresh: VoidFunction;
}

function CustomerEdit({isOpen, onClose, data, refresh}: CustomerEditProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const fields = [
    "first_name",
    "last_name",
    "username",
    "phone",
    "email",
    "address",
  ];

  const onChangeFields = (formData:any) => {
    setFormData(formData)
  }

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    formData['role'] = 'CUSTOMER'
    setLoading(true);
    api
      .editCustomer(data?.id, formData)
      .then((response) => {
        setLoading(false);
        refresh()
        onClose()
        navigate(`/customers`);
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };


  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
       <div className='bg-white dark:bg-gray-800'>
          <Form fields={fields} onChangeFields={onChangeFields} edit={data} onClose={onClose} onSubmit={(e)=>console.log('hello')}/>
          
          <div className="flex gap-3 justify-end mt-4">
            <Button btntype="DangerOutline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              btntype="Normal"
              type="submit"
              className="flex gap-2 items-center duration-200"
              onClick={onUpdate}
            >
              {loading ? <div className=" spinner"></div> : <div>Update</div>}
            </Button>
          </div>
       </div>
    </Drawer>
  )
}

export default CustomerEdit