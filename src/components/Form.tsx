import { useEffect, useState } from "react";

function Form({ fields, onChangeFields, edit }: { fields: any[], onChangeFields: (data:any) => void, edit?: any }) {

  const [formData, setFormData] = useState<any>();

  useEffect(()=>{
    if(edit){
      setFormData(edit)
    }
  }, [edit])

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    
  };

  useEffect(()=>{
    onChangeFields(formData)
  }, [formData])



  return (
    <form className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col gap-2">
          <label htmlFor={field} className="text-sm font-medium text-slate-500 dark:text-slate-300">
            {field.split('_').join(' ').toUpperCase()}
          </label>
          <input
            id={field}
            type="text"
            name={field}
            placeholder={`Type ${field.split('_').join(' ')}`}
            value={formData?.[field] || ""}
            onChange={onChange}
            className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
          />
        </div>
      ))}

    </form>
  );
}

export default Form;
