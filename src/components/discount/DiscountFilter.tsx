import React, { useState } from 'react'
import Modal from '../Modal';
import { useSearchParams } from 'react-router-dom';
import TextInput from '../TextInput';
import Button from '../Button';
import Label from '../Label';

interface ProductViewProps {
    isOpen: boolean;
    onClose: VoidFunction;
  }


export default function DiscountFilter({isOpen, onClose}: ProductViewProps) {
  const [filterData, setFilterData] = useState<any>(null)
  const [searchParams, setSearchParams] = useSearchParams();

  

  const onChange = (e) => {
    const {name, value} = e.target
    setFilterData((prev)=>({...prev, [name]: value}))
  }

  const onApply = () => {
    if(filterData){
      setSearchParams(prev=>{
        onClose()
        return({...prev, ...filterData})
      })
    }

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Product Filter'>
      <div className='flex gap-3 items-center'>
        <div>
            <Label htmlFor='name'>Product Name</Label>
            <TextInput
                id='name'
                name='name'
                placeholder='Product Name'
                value={filterData?.name || ''}
                onChange={onChange}
            />
        </div>
        <div>
            <Label htmlFor='description'>Product Description</Label>
            <TextInput
                id='description'
                name='description'
                placeholder='Product Description'
                value={filterData?.description || ''}
                onChange={onChange}
            />
        </div>
      </div>

      <div className='flex gap-3 items-center mt-4'>
        <div>
            <Label htmlFor='category'>Product Category</Label>
            <TextInput
                id='category'
                name='category'
                placeholder='Product Category'
                value={filterData?.category || ''}
                onChange={onChange}
            />
        </div>
        <div>
            <Label htmlFor='variant_name'>Product variant name</Label>
            <TextInput
                id='variant_name'
                name='variant_name'
                placeholder='Product variant name'
                value={filterData?.variant_name || ''}
                onChange={onChange}
            />
        </div>
      </div>




      <div className='mt-6 flex justify-end items-center gap-4'>
        <Button type='DangerOutline' onClick={onClose}>Cancel</Button>
        <Button type='Normal' onClick={onApply} disable={filterData ? false : true } >Apply</Button>
      </div>
    </Modal>
  )
}
