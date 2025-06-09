import React, { useState } from 'react'
import Modal from '../Modal'
import { useApi } from '../../api/api';
import { useToast } from '../../contexts/Notification';
import Form from '../Form';
import Button from '../Button';
import { MdDelete, MdOutlineDeleteOutline } from 'react-icons/md';
import TextInput from '../TextInput';



interface VariantFormProps {
    isOpen: boolean;
    onClose: VoidFunction;
    variant: any;
    refresh: VoidFunction;
}

export default function VariantEdit({isOpen, onClose, variant,  refresh}: VariantFormProps) {
    const api = useApi()
    const [formData, setFormData] = useState<any>(variant)
    const {addToast} = useToast()

    const newAttrs = Object.entries(variant.attribute).map((item)=>({key: item[0], value: item[1]}))
    
    const [attrs, setAttrs] = useState<any>(newAttrs);

    const handleChange = (index: number, field: 'key' | 'value', value: string) => {
        const updatedInputs = [...attrs];
        updatedInputs[index][field] = value;
        setAttrs(updatedInputs);
    
        // Build attrs object from current inputs
        const updatedAttrs: Record<string, string> = {};
        updatedInputs.forEach(({ key, value }) => {
          if (key) updatedAttrs[key] = value;
        });
    
        setFormData(prev => ({ ...prev, attribute: updatedAttrs }));
    };

    const handleAddAttr = () => {
        setAttrs(prev => [...prev, { key: '', value: '' }]);
    };

    const removeAttr = (index: number) => {
        
        const updatedInputs = attrs.filter((_, i) => i !== index);

        // Update attrInputs
        setAttrs(updatedInputs);
    
        // Rebuild attrs object
        const updatedAttrs: Record<string, string> = {};
        updatedInputs.forEach(({ key, value }) => {
          if (key) updatedAttrs[key] = value;
        });
    
        setFormData(prev => ({ ...prev, attribute: updatedAttrs }));
    };



    const onChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prev:any)=>({...prev, [name]: value}))
    }



    const onSubmit = () => {
        api.editVariant(variant.id, formData).then(()=>{
            addToast("Variant created Successfully!", "success")
            onClose()
            refresh()
        }).catch(()=>addToast("Variant created fail!", "error"))
    }


    console.log(formData)


    
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit Variant'>

        <form className='flex flex-col gap-3'>
            <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-500 dark:text-slate-300">
                    Variant Name
                </label>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder={`Type name`}
                    value={formData?.name}
                    onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="price" className="text-sm font-medium text-slate-500 dark:text-slate-300">
                    Variant price
                </label>
                <TextInput
                    id="price"
                    type="number"
                    
                    name="price"
                    placeholder={`Type price`}
                    value={formData?.price}
                    onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="stock" className="text-sm font-medium text-slate-500 dark:text-slate-300">
                    Variant stock
                </label>
                <TextInput
                    id="stock"
                    type="text"
                    name="stock"
                    placeholder={`Type stock`}
                    value={formData?.stock}
                    onChange={onChange}
                />
            </div>

            <div className=' border border-gray-200 dark:border-gray-700 rounded-md p-3'>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-300 ">
                    Variant meta
                </label>
                <div className='flex flex-col items-center gap-2 mt-2'>
                    {attrs.map((attr, index) => (
                        <div key={index} className='flex items-center gap-3 w-full'>
                            <TextInput
                                id=''
                                type='text'
                                placeholder='key'
                                value={attr.key}
                                onChange={e => handleChange(index, 'key', e.target.value)}
                                
                            />
                            <TextInput
                                id=''
                                type='text'
                                placeholder='value'
                                value={attr.value}
                                onChange={e => handleChange(index, 'value', e.target.value)}
                            />
                            <MdOutlineDeleteOutline 
                                onClick={()=>removeAttr(index)}
                                className='hover:text-red-500 h-5 min-h-5 w-5 min-w-5'
                            />
                        </div>
                    ))}
                </div>
                <Button btntype='Outline' onClick={handleAddAttr} className='mt-3 flex justify-center w-full'>+</Button>
            </div>
            <div className='mt-4 flex items-center justify-end gap-4'>
                <Button onClick={onClose} btntype="DangerOutline">Back</Button>
                <Button onClick={onSubmit} btntype="Normal">Create</Button>

            </div>
        </form>
    </Modal>
  )
}
