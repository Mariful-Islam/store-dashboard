import React, { useState } from 'react'
import Modal from '../Modal'
import { useApi } from '../../api/api';
import { useToast } from '../../contexts/Notification';
import Form from '../Form';


interface VariantFormProps {
    isOpen: boolean;
    onClose: VoidFunction;
    productId: number;
    refresh: VoidFunction;
}

export default function VariantForm({isOpen, onClose, productId,  refresh}: VariantFormProps) {
    const api = useApi()
    const [formData, setFormData] = useState<any>({product: productId})
    const {addToast} = useToast()

    const fields = [
        'name',
        'stock*number',
        'price*number',

    ]


    const onSubmit = () => {
        api.createVariant(formData).then(()=>{
            addToast("Variant created Successfully!", "success")
            onClose()
            refresh()
        }).catch(()=>addToast("Variant created fail!", "error"))
    }
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create Variant'>
        <Form 
            fields={fields} 
            onChangeFields={(data)=>setFormData((prev:any)=>({...prev, ...data}))} 
            onClose={onClose} 
            onSubmit={onSubmit} 
            submitBtnName='Create'
        />
    </Modal>
  )
}
