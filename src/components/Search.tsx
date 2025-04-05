import React from 'react'
import Modal from './Modal'

interface SearchProps {
    isOpen: boolean;
    onClose: VoidFunction;
}

export default function Search({isOpen, onClose}: SearchProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Search'>
        sdfvdvdfvdf
    </Modal>
  )
}
