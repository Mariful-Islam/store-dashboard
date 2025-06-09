import { useEffect, useState } from "react";
import Button from "../Button";
import Drawer from "../Drawer";
import { useApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Form from "../Form";

interface CustomerEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  data: any;
  refresh: VoidFunction;
}

export function RetailerEdit({
  isOpen,
  onClose,
  data,
  refresh,
}: CustomerEditProps) {
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

  const onChangeFields = (formData: any) => {
    setFormData(formData);
  };

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    formData["role"] = "RETAILER";
    setLoading(true);
    api
      .editRetailer(data?.id, formData)
      .then((response) => {
        setLoading(false);
        refresh();
        onClose();
        navigate(`/retailers`);
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800">
        <Form fields={fields} onChangeFields={onChangeFields} edit={data} onSubmit={()=>console.log('cfvfd')} onClose={onClose} />
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
  );
}
