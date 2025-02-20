import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';



const QRScanner = ({onScan}: {onScan: (value:any)=>void}) => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState('');

  useEffect(() => {
    const video: HTMLVideoElement = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        setScannedText(result.data);
        onScan(result?.data)
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);



  return (
    <div>
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <p className="scannedText">SCANNED: {scanned}</p>
    </div>
  );
};

export default QRScanner;
