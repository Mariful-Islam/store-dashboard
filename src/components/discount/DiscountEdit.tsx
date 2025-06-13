import { useState } from "react";
import { useApi } from "../../api/api";
import Button from "../Button";
import TextInput from "../TextInput";
import Select from "../Select";
import Modal from "../Modal";
import { useToast } from "../../contexts/Notification";

interface DiscountEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  discount: any;
  refresh: VoidFunction;
}

export function DiscountEdit({ isOpen, onClose, discount, refresh }: DiscountEditProps) {
  const api = useApi();
  const [formData, setFormData] = useState<any>(discount);
  const [loading, setLoading] = useState<boolean>(false);

  const { addToast } = useToast();

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    api
      .editDiscount(discount?.id, formData)
      .then(() => {
        addToast("Discount info updated !", "success");
        setLoading(false);
        onClose();
        refresh()
      })
      .catch(() => {
        addToast("Discount info updated failed !", "error");

        setLoading(false);
      });
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Discount Edit">
      <div className="bg-white dark:bg-gray-800">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <TextInput
              id="name"
              type="text"
              name="name"
              placeholder="Type your discount name.."
              value={formData?.name || ""}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-sm font-medium">
              Discount Type
            </label>

            <Select
              name="type"
              value={formData?.type || ""}
              onChange={onChange}
            >
              <option value="" disabled>
                Choose an option
              </option>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="discount_amount" className="text-sm font-medium">
              Discount Amount
            </label>
            <TextInput
              id="discount_amount"
              type="number"
              name="discount_amount"
              placeholder="Type your discount amount.."
              value={formData?.discount_amount || ""}
              onChange={onChange}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button btntype="DangerOutline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              btntype="Normal"
              type="submit"
              className="flex gap-2 items-center duration-200"
              
            >
              {loading ? <div className=" spinner"></div> : <div>Update</div>}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
