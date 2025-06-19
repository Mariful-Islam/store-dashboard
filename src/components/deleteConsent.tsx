import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { API_URL } from "../api/interceptor";
import Button from "./Button";
import { MdDelete } from "react-icons/md";
import { useToast } from "../contexts/Notification";


interface DeleteConsentProps {
  isOpen: boolean;
  onClose: VoidFunction;
  item: any;
  path: any;
  name: string;
  refresh: VoidFunction;
}

export default function DeleteConsent({
  isOpen,
  onClose,
  item,
  path,
  name,
  refresh
}: DeleteConsentProps) {
    
    const {addToast} = useToast()

  const deleteItem = () => {
    axios
      .delete(`${API_URL}/${path}`)
      .then(() => {
        onClose()
        refresh()
        addToast(`Deleted ${name} !`, "success");
      })
      .catch(() => {
        addToast(`Error deleting ${name} !!`, "error");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete" size="sm">
      <div className="h-[300px] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-2xl font-bold">Are you delete <span className="text-red-500">{item?.name}</span> {name} ?</h1>
        <MdDelete  className="w-10 h-10 text-red-500"/>
      </div>
      <div className="flex gap-6 justify-end">
        <Button btntype="Outline" onClick={onClose}>Cancel</Button>
        <Button btntype="Danger" onClick={deleteItem}>Delete</Button>
      </div>
    </Modal>
  );
}
