import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, IndianRupee } from 'lucide-react';

export default function Processing({ transactionData }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/success');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-container" style={{ backgroundColor: '#FFFFFF', color: '#111827', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827', padding: 0 }}>
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-1px', color: '#002970' }}>pay</span>
          <span style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-1px', color: '#00B9F5' }}>tm</span>
        </div>
      </div>

      {/* Transaction Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
        <span style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '8px' }}>
          Paying securely to
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#111827', marginBottom: '35px' }}>
          {transactionData.payeeName || 'Unknown User'}
        </h2>
        <div style={{ fontSize: '4rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'flex-start', letterSpacing: '-2px' }}>
          <span style={{ fontSize: '3rem', marginTop: '10px', marginRight: '5px' }}>₹</span>
          {parseFloat(transactionData.amount || 0)}
        </div>
      </div>

      {/* Animated Shield */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        {/* Subtle gradient background line shown in screenshot */}
        <div style={{ position: 'absolute', top: '10%', bottom: '0', width: '120px', background: 'linear-gradient(to bottom, #E0F2FE 0%, #FFF5F5 100%)', zIndex: 0, opacity: 0.6 }}></div>
        
        <div 
          className="shield-slide-up"
          style={{ 
            width: '160px', 
            height: '160px', 
            borderRadius: '80px', 
            backgroundColor: 'transparent', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          <Shield size={140} color="#002970" strokeWidth={1.5} fill="#00B9F5" style={{ position: 'absolute' }} />
          <IndianRupee size={60} color="#002970" strokeWidth={3} style={{ position: 'absolute', zIndex: 10 }} />
        </div>
      </div>

      {/* Footer Badges */}
      <div style={{ padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', zIndex: 10 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#6B7280' }}>paytm</span>
        <div style={{ width: '1px', height: '12px', backgroundColor: '#D1D5DB' }}></div>
        <span style={{ fontSize: '0.65rem', color: '#6B7280' }}>Powered by</span>
        <span style={{ fontSize: '0.85rem', fontWeight: '800', fontStyle: 'italic', color: '#4B5563' }}>UPI</span>
        <div style={{ width: '1px', height: '12px', backgroundColor: '#D1D5DB' }}></div>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4B5563' }}>HDFC BANK</span>
      </div>
    </div>
  );
}
