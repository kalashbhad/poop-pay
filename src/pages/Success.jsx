import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

export default function Success({ transactionData }) {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      // Many browsers block autoplay unless there was a user interaction recently,
      // but since they just clicked "Submit" on the PIN screen, this usually works.
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, []);

  return (
    <div className="page-container" style={{ backgroundColor: '#10B981', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Payment Done Tune */}
      <audio 
        ref={audioRef} 
        src="/paytm.mp3" 
        preload="auto"
      />
      
      <div style={{ animation: 'bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <CheckCircle size={100} color="white" />
      </div>

      <h1 style={{ marginTop: '20px', fontSize: '2rem' }}>Payment Successful</h1>
      
      <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '20px 0' }}>
        ₹ {transactionData.amount || '0'}
      </div>

      <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>
        to {transactionData.payeeName || 'Unknown'}
      </div>

      <div style={{ margin: '30px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '16px', width: '90%', maxWidth: '350px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Transaction ID</span>
          <span style={{ fontWeight: 'bold' }}>T{Math.floor(Math.random() * 10000000000)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Paid from</span>
          <span style={{ fontWeight: 'bold' }}>{transactionData.bankName || 'Bank'}</span>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        style={{ 
          marginTop: 'auto', 
          marginBottom: '30px',
          backgroundColor: 'white', 
          color: '#10B981', 
          border: 'none', 
          padding: '15px 30px', 
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Home size={20} />
        Back to Home
      </button>

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.1); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
