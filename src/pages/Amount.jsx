import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, ShieldCheck, Delete } from 'lucide-react';

export default function Amount({ transactionData, setTransactionData }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(transactionData.amount || '');

  const handleKeyPress = (key) => {
    if (key === 'del') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      if (amount.includes('.')) {
        const [, decimal] = amount.split('.');
        if (decimal.length >= 2) return;
      }
      if (parseFloat(amount + key) > 100000) return;
      // Prevent leading zeros unless it's "0."
      if (amount === '0' && key !== '.') {
        setAmount(key);
        return;
      }
      setAmount(prev => prev + key);
    }
  };

  const proceedToPin = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setTransactionData(prev => ({ ...prev, amount }));
    navigate('/pin');
  };

  // Extract initials
  const getInitials = (name) => {
    if (!name) return 'HS';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(transactionData.payeeName);

  return (
    <div className="page-container" style={{ backgroundColor: '#fff', paddingBottom: 0 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 10px 20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827', padding: 0 }}>
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Profile Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '10px' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '30px', 
          backgroundColor: '#FCE7F3', 
          color: '#991B1B', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          marginBottom: '15px' 
        }}>
          {initials}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111827' }}>
            {transactionData.payeeName || 'Honey Singh'}
          </h2>
          <BadgeCheck size={20} color="#00B9F5" fill="#00B9F5" stroke="white" />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '1rem', color: '#4B5563' }}>{transactionData.upiId || '9992171174@ptyes'}</span>
          <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#00B9F5', border: '1px solid #E5E7EB', padding: '1px 4px', borderRadius: '4px' }}>
            paytm
          </span>
        </div>
      </div>

      {/* Amount Display */}
      <div className="amount-display-container">
        <span className="amount-currency">₹</span> 
        <span className={`amount-value ${amount ? 'has-value' : ''}`}>
          {amount || '0'}
        </span>
      </div>

      {/* Spacer to push everything else to the bottom */}
      <div style={{ flex: 1 }}></div>

      {/* Proceed Button */}
      <div style={{ padding: '0 20px' }}>
        <button 
          onClick={proceedToPin}
          disabled={!amount || parseFloat(amount) <= 0}
          style={{ 
            width: '100%', 
            backgroundColor: '#002970', 
            color: 'white', 
            border: 'none', 
            padding: '16px', 
            borderRadius: '30px', 
            fontSize: '1.1rem', 
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            opacity: (!amount || parseFloat(amount) <= 0) ? 0.6 : 1,
            cursor: (!amount || parseFloat(amount) <= 0) ? 'not-allowed' : 'pointer'
          }}
        >
          <ShieldCheck size={20} />
          Proceed Securely
        </button>
      </div>

      {/* Custom Keypad */}
      <div style={{ padding: '15px 20px 20px 20px', backgroundColor: 'white', marginTop: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '15px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} className="amount-key" onClick={() => handleKeyPress(num.toString())}>
              {num}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="amount-key amount-key-blue" onClick={() => {}} style={{ flex: 1, fontSize: '2rem' }}>+</button>
          <button className="amount-key" onClick={() => handleKeyPress('.')} style={{ flex: 1, fontSize: '2rem' }}>.</button>
          <button className="amount-key" onClick={() => handleKeyPress('0')} style={{ flex: 2 }}>0</button>
          <button className="amount-key amount-key-dark" onClick={() => handleKeyPress('del')} style={{ flex: 2 }}>
             <Delete size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
