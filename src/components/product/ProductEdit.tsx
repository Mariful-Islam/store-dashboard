import { useContext, useState } from "react";
import Modal from "../Modal";
import TextInput from "../TextInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useApi } from "../../api/api";
import Button from "../Button";

interface ProductEditProps {
  isOpen: boolean;
  onClose: VoidFunction;
  product: any;
  refresh: VoidFunction;
}

function ProductEdit({ isOpen, onClose, product, refresh }: ProductEditProps) {
  const api = useApi();

  const [formData, setFormData] = useState<any>(product);
  const { handleFormValidation } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setLoading(true);
    api
      .editProduct(product?.slug, formData)
      .then(() => {
        setLoading(false);
        onClose();
        refresh()
      })
      .catch(() => {
        console.log("Error");
        setLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Edit">
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
              placeholder="Type your product name.."
              value={formData?.name || ""}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <TextInput
              id="description"
              type="text"
              name="description"
              placeholder="Type your product description.."
              value={formData?.description || ""}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <TextInput
              id="slug"
              type="text"
              name="slug"
              placeholder="Type your product name.."
              value={formData?.slug || ""}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <TextInput
              id="category"
              type="text"
              name="category"
              placeholder="Type your product category.."
              value={formData?.category || ""}
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
              disabled={
                !handleFormValidation(formData, [
                  "name",
                  "description",
                  "slug",
                  "category",
                ])
              }
            >
              {loading ? <div className=" spinner"></div> : <div>Update</div>}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProductEdit;
