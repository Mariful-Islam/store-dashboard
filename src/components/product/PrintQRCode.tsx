import React from 'react'
import Modal from '../Modal';
import { QRCodeCanvas } from 'qrcode.react';

interface PrintQRCodeProps {
    isOpen: boolean;
    onClose: VoidFunction;
    data: object;
  }

function PrintQRCode({isOpen, onClose, data}:PrintQRCodeProps) {
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <QRCodeCanvas
            
        />
    </Modal>
  )
}

export default PrintQRCode