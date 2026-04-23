import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScallopedCircle = ({ size, color, className }) => {
  return (
    <div className={className} style={{ position: 'absolute', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute' }}>
        <g fill={color}>
          <rect x="15" y="15" width="70" height="70" rx="22" transform="rotate(0 50 50)" />
          <rect x="15" y="15" width="70" height="70" rx="22" transform="rotate(30 50 50)" />
          <rect x="15" y="15" width="70" height="70" rx="22" transform="rotate(60 50 50)" />
        </g>
      </svg>
    </div>
  );
};

export default function Success({ transactionData }) {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [timeStr, setTimeStr] = useState('0.00');

  useEffect(() => {
    // Generate realistic random time
    const randomTime = (Math.random() * 3.5 + 1.5).toFixed(2);
    setTimeStr(randomTime);

    // Navigate to final receipt after 1.8 seconds
    const timer = setTimeout(() => {
      navigate('/receipt');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-container" style={{ backgroundColor: '#1EBA68', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Header Logo */}
      <div style={{ marginTop: '50px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2.2rem', fontWeight: '900', letterSpacing: '-1px', color: 'white' }}>paytm</span>
      </div>

      <div style={{ textAlign: 'center', zIndex: 10, position: 'relative' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '15px' }}>
          Paid to {transactionData.payeeName || 'Unknown User'}
        </div>
        <div style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', letterSpacing: '-2px' }}>
          <span style={{ fontSize: '3.5rem', marginTop: '10px', marginRight: '5px' }}>₹</span>
          {parseFloat(transactionData.amount || 0)}
        </div>
        <div style={{ fontSize: '0.95rem', marginTop: '20px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
          Payment completed in {timeStr} Sec <span style={{ color: '#FCD34D' }}>⚡</span>
        </div>
      </div>

      {/* Pop Graphic (Scalloped Badges) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative', marginTop: '20px' }}>
        
        {/* Outer dark green layer */}
        <ScallopedCircle size="340px" color="#15A45E" className="pop-scale-3" />
        
        {/* Middle light green layer */}
        <ScallopedCircle size="240px" color="#8AE4B2" className="pop-scale-2" />
        
        {/* Inner dark green layer */}
        <ScallopedCircle size="140px" color="#15A45E" className="pop-scale-1" />
        
        {/* Checkmark */}
        <div className="pop-scale-1" style={{ position: 'absolute', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
             <polyline points="20 6 9 17 4 12" />
           </svg>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', zIndex: 10 }}>
        <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'white' }}>paytm</span>
        <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)' }}>Powered by</span>
        <span style={{ fontSize: '1rem', fontWeight: '900', fontStyle: 'italic', color: 'white', letterSpacing: '-0.5px' }}>UPI</span>
        <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
        <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>SBI</span>
      </div>
    </div>
  );
}
