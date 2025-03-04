import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 duration-200">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-50 p-6">
                <div className="flex justify-between items-center font-medium pb-2 mb-4 border-slate-300 border-b">
                  <h1>{title}</h1>
                  <RxCross1
                    onClick={onClose}
                    className="cursor-pointer w-6 h-6 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full"
                  />
                </div>
              {children}
            </div>
          
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
