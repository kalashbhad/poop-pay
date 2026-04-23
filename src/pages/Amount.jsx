import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2 } from 'lucide-react';

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
      
      setAmount(prev => prev + key);
    }
  };

  const proceedToPin = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setTransactionData(prev => ({ ...prev, amount }));
    navigate('/pin');
  };

  return (
    <div className="page-container" style={{ backgroundColor: '#fff' }}>
      <div className="header" style={{ backgroundColor: 'transparent', color: '#111827', boxShadow: 'none' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827' }}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '30px', backgroundColor: '#1E3A8A', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
          {transactionData.payeeName ? transactionData.payeeName.charAt(0).toUpperCase() : '?'}
        </div>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Paying {transactionData.payeeName || 'Unknown'}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6B7280', fontSize: '0.9rem', marginBottom: '8px' }}>
          <Building2 size={16} />
          <span>{transactionData.bankName || 'Bank'}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{transactionData.upiId}</div>
      </div>

      <div className="amount-display">
        <span style={{ fontSize: '2.5rem', color: '#9CA3AF', fontWeight: '400', marginRight: '5px' }}>₹</span> 
        {amount || '0'}
      </div>

      <div style={{ padding: '0 30px', marginBottom: '20px' }}>
        <input type="text" className="input-field" placeholder="Add a note" style={{ textAlign: 'center', backgroundColor: '#F9FAFB', border: 'none', borderRadius: '20px' }} />
      </div>

      <div className="numpad" style={{ marginTop: 'auto', borderTop: 'none' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((key) => (
          <button key={key} className="numpad-btn" onClick={() => handleKeyPress(key.toString())}>
            {key}
          </button>
        ))}
        <button className="numpad-btn" onClick={() => handleKeyPress('del')}>
          ⌫
        </button>
      </div>

      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <button 
          className="btn-primary" 
          onClick={proceedToPin}
          style={{ opacity: !amount || parseFloat(amount) <= 0 ? 0.5 : 1, padding: '18px', borderRadius: '16px' }}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Pay ₹{amount || '0'}
        </button>
      </div>
    </div>
  );
}
