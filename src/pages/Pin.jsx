import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function Pin({ transactionData }) {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleKeyPress = (key) => {
    if (key === 'del') {
      setPin(prev => prev.slice(0, -1));
    } else if (key === 'submit') {
      if (pin.length === 4 || pin.length === 6) {
        navigate('/success');
      }
    } else {
      if (pin.length < 6) {
        setPin(prev => prev + key);
      }
    }
  };

  return (
    <div className="page-container" style={{ backgroundColor: '#1E3A8A', color: 'white' }}>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={24} color="#10B981" />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>BHIM UPI</span>
        </div>
        <div style={{ fontSize: '1.1rem' }}>{transactionData.bankName || 'Bank'}</div>
      </div>

      <div style={{ backgroundColor: 'white', color: 'black', margin: '20px', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#6B7280' }}>To</span>
          <span style={{ fontWeight: 'bold' }}>{transactionData.payeeName || 'Unknown'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: '#6B7280' }}>Sending</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>₹ {transactionData.amount || '0'}</span>
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '15px' }}>ENTER 4 OR 6 DIGIT UPI PIN</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div 
                key={index}
                style={{ 
                  width: '15px', 
                  height: '15px', 
                  borderRadius: '50%', 
                  backgroundColor: index < pin.length ? 'black' : '#E5E7EB',
                  border: index < pin.length ? 'none' : '1px solid #D1D5DB'
                }}
              />
            ))}
          </div>
          <button 
            onClick={() => setShowPin(!showPin)} 
            style={{ background: 'none', border: 'none', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', width: '100%', cursor: 'pointer' }}
          >
            {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPin ? 'HIDE' : 'SHOW'}
          </button>
          {showPin && <div style={{ marginTop: '10px', fontSize: '1.2rem', letterSpacing: '5px' }}>{pin}</div>}
        </div>
      </div>

      <div className="numpad" style={{ marginTop: 'auto', backgroundColor: '#F3F4F6', color: 'black' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map((key, index) => (
          <button key={index} className="numpad-btn" onClick={() => key !== '' && handleKeyPress(key.toString())}>
            {key}
          </button>
        ))}
        <button className="numpad-btn" onClick={() => handleKeyPress('del')}>
          ⌫
        </button>
      </div>
      <div style={{ backgroundColor: '#F3F4F6', padding: '0 20px 20px 20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => handleKeyPress('submit')}
          style={{ 
            backgroundColor: (pin.length === 4 || pin.length === 6) ? '#10B981' : '#D1D5DB', 
            color: 'white', 
            border: 'none', 
            width: '60px', 
            height: '60px', 
            borderRadius: '30px',
            fontSize: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: (pin.length === 4 || pin.length === 6) ? 'pointer' : 'default',
            transition: 'background-color 0.3s'
          }}
        >
          ✓
        </button>
      </div>
    </div>
  );
}
