import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ArrowLeft } from 'lucide-react';

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

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    scanner.render(
      (decodedText) => {
        scanner.clear();

        if (decodedText.startsWith('upi://pay')) {
          try {
            const url = new URL(decodedText);
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
          }
        } else {
          setError('Not a valid UPI QR code.');
          setTimeout(() => {
            window.location.reload(); 
          }, 2000);
        }
      },
      (err) => {}
    );

    return () => {
      scanner.clear().catch(e => console.error(e));
    };
  }, [navigate, setTransactionData]);

  return (
    <div className="page-container" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="header" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <span className="header-title">Scan any QR to pay</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div id="reader" style={{ width: '100%', maxWidth: '400px', border: 'none', background: '#fff' }}></div>
        {error && (
          <div style={{ backgroundColor: '#EF4444', color: 'white', padding: '10px 20px', borderRadius: '8px', marginTop: '20px' }}>
            {error}
          </div>
        )}
        <div style={{ marginTop: '30px', textAlign: 'center', color: '#9CA3AF' }}>
          Align the QR code within the frame to scan
        </div>
      </div>
    </div>
  );
}
