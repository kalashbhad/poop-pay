import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeft, MoreVertical, Flashlight, Image as ImageIcon, Search } from 'lucide-react';

const BANK_MAPPING = {
  okicici: 'ICICI Bank',
  okhdfcbank: 'HDFC Bank',
  ybl: 'Yes Bank',
  okaxis: 'Axis Bank',
  oksbi: 'State Bank of India',
  paytm: 'Paytm Payments Bank',
  upi: 'BHIM UPI',
  apl: 'Amazon Pay',
  amazonpay: 'Amazon Pay',
};

export default function Scanner({ setTransactionData }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = (e) => {
    if (e.key === 'Enter' && manualInput.trim()) {
      if (scannerRef.current) {
        try {
          if (scannerRef.current.getState && scannerRef.current.getState() === 2) {
            scannerRef.current.stop().catch(() => {});
          }
        } catch (e) {}
      }

      let bankName = 'Unknown Bank';
      let payeeName = 'User';
      let upiId = manualInput.trim();

      if (upiId.includes('@')) {
        const handle = upiId.split('@')[1].toLowerCase();
        bankName = BANK_MAPPING[handle] || handle.toUpperCase();
        payeeName = upiId.split('@')[0];
      } else if (/^\d{10}$/.test(upiId)) {
        bankName = 'Paytm Payments Bank';
        payeeName = `+91 ${upiId}`;
        upiId = `${upiId}@paytm`;
      } else {
        payeeName = upiId;
        upiId = `${upiId}@upi`;
      }

      setTransactionData({
        payeeName,
        upiId,
        bankName,
        amount: '',
      });
      navigate('/amount');
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    const onScanSuccess = (decodedText) => {
      const text = String(decodedText).toLowerCase();

      if (text.includes('upi://pay')) {
        if (html5QrCode) {
          try {
            if (html5QrCode.getState && html5QrCode.getState() === 2) {
              html5QrCode.stop().catch(() => {});
            }
          } catch (e) {}
        }

        try {
          const urlString = decodedText.substring(decodedText.toLowerCase().indexOf('upi://pay'));
          const url = new URL(urlString);
          const params = new URLSearchParams(url.search);
          
          const pa = params.get('pa') || '';
          const pn = params.get('pn') || 'Unknown User';
          const am = params.get('am') || '';

          let bankName = 'Unknown Bank';
          if (pa.includes('@')) {
            const handle = pa.split('@')[1].toLowerCase();
            bankName = BANK_MAPPING[handle] || handle.toUpperCase();
          }

          setTransactionData({
            payeeName: decodeURIComponent(pn.replace(/\+/g, ' ')),
            upiId: pa,
            bankName: bankName,
            amount: am,
          });

          navigate('/amount');
        } catch (e) {
          setError('Failed to parse UPI QR code.');
          setTimeout(() => setError(null), 3000);
        }
      } else {
        setError('Not a valid UPI QR code.');
        setTimeout(() => setError(null), 3000);
      }
    };

    // Scan the entire video frame, not just a small hidden box
    const config = { fps: 15 };
    
    // Auto-start with environment camera
    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, () => {})
      .catch((err) => {
        console.warn("Failed to start environment camera, trying any camera", err);
        // Fallback if environment camera isn't available (e.g. desktop)
        Html5Qrcode.getCameras().then(devices => {
          if (devices && devices.length > 0) {
            // Try to use the first available camera
            html5QrCode.start(devices[0].id, config, onScanSuccess, () => {}).catch(e => setError("Camera error"));
          } else {
            setError("No cameras found.");
          }
        }).catch(e => setError("Error getting cameras."));
      });

    return () => {
      if (scannerRef.current) {
        try {
          if (scannerRef.current.getState && scannerRef.current.getState() === 2) {
            scannerRef.current.stop().catch(() => {});
          }
        } catch(e) {}
      }
    };
  }, [navigate, setTransactionData]);

  return (
    <div className="scanner-page-container">
      {/* The video feed container */}
      <div id="reader" className="scanner-reader"></div>

      {/* Blue Scanning Animation Line */}
      <div className="scanner-laser"></div>

      {/* Top Overlay */}
      <div className="scanner-top-overlay">
        <button onClick={() => navigate(-1)} className="scanner-icon-btn">
          <ArrowLeft size={28} color="white" />
        </button>
        <span className="scanner-title">Scan any QR code</span>
        <button className="scanner-icon-btn">
          <MoreVertical size={28} color="white" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="scanner-error">
          {error}
        </div>
      )}

      {/* Bottom Floating Icons */}
      <div className="scanner-bottom-icons">
        <button className="scanner-fab scanner-fab-light">
          <Flashlight size={24} color="black" />
        </button>
        <button className="scanner-fab scanner-fab-dark">
          <ImageIcon size={24} color="white" />
        </button>
      </div>

      {/* Bottom Search Bar */}
      <div className="scanner-search-container">
        <div className="scanner-search-bar">
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Search size={22} color="#6B7280" style={{ marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="Enter Mob. Number or UPI ID..." 
              className="scanner-search-input"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={handleManualSubmit}
            />
          </div>
          <div className="scanner-recents">
            <div className="scanner-avatar" style={{ backgroundColor: '#DBEAFE', color: '#1E3A8A', zIndex: 3 }}>M</div>
            <div className="scanner-avatar" style={{ backgroundColor: '#FEF3C7', color: '#B45309', zIndex: 2, marginLeft: '-15px' }}>N</div>
            <span style={{ fontSize: '0.85rem', color: '#4B5563', marginLeft: '10px', fontWeight: '500' }}>Recents</span>
          </div>
        </div>
      </div>
    </div>
  );
}
