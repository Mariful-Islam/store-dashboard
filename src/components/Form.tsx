import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { GlobalContext } from "../contexts/GlobalContext";

interface FormProps {
  fields: any[];
  onChangeFields: (data:any) => void;
  edit?: any;
  onClose: VoidFunction;
  onSubmit: (e:React.FormEvent) => string | void;
  submitBtnName?: string;
}

function Form({ fields, onChangeFields, edit, onClose, onSubmit, submitBtnName }: FormProps) {

  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false)
  const {handleFormValidation} = useContext(GlobalContext)

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


  const handleOnSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = onSubmit(e)

    if(res==="success" || res==="failed"){
      setLoading(false)
    }else{
      setInterval(()=>{
        setLoading(false)
      }, 1000)
    }
  
  }


  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      {fields.map((field, index) => {

        if(field?.split('*')[1]?.split('>')[0]==="select"){
          return(
            <div key={index} className="flex flex-col gap-2">
              <label htmlFor={field} className="text-sm font-medium text-slate-500 dark:text-slate-300">
                {field?.split('*')[0]?.split('_')?.join(' ')?.toUpperCase()}
              </label>

              <select
                id={field?.split('*')[0]}
                name={field?.split('*')[0]}
                value={formData?.[field?.split('*')[0]] || ""}
                onChange={onChange}
                className="block w-full rounded-md  px-3 py-1.5 text-base text-slate-900 dark:text-slate-50 outline-1 -outline-offset-1 outline-slate-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"

              >
                <option>Select a option</option>

                {field?.split('>')[1]?.split(',')?.map((option:any, index:number)=>(
                  <option key={index} value={option}>{option}</option>
                ))}

              </select>
             
            </div>
          )
        }

        if(field.split('*')[1]==="number"){
          return(
            <div key={index} className="flex flex-col gap-2">
              <label htmlFor={field} className="text-sm font-medium text-slate-500 dark:text-slate-300">
                {field?.split('*')[0]?.split('_')?.join(' ')?.toUpperCase()}
              </label>
              <TextInput
                id={field}
                type="number"
                name={field?.split('*')[0]}
                placeholder={`Type ${field?.split('*')[0]?.split('_')?.join(' ')}`}
                value={formData?.[field?.split('*')[0]] || ""}
                onChange={onChange}
              />
            </div>
          )
        } else {
        return (
          <div key={index} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {field.split('_').join(' ').toUpperCase()}
            </label>
            <TextInput
              id={field}
              type="text"
              name={field}
              placeholder={`Type ${field.split('_').join(' ')}`}
              value={formData?.[field] || ""}
              onChange={onChange}
            />
          </div>
        )}})}

        <div className="mt-4 flex gap-4 justify-end">
          <Button btntype="DangerOutline" onClick={onClose}>
            Cancel
          </Button>
          <Button btntype="Normal" type="submit" disabled={!handleFormValidation(formData, fields)}>
            {loading ? <div className="spinner"></div> : <div>{submitBtnName ? submitBtnName : 'Submit'}</div> }
          </Button>
        </div>

    </form>
  );
}

export default Form;
