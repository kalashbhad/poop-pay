import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Info, User, Delete } from 'lucide-react';

export default function Pin({ transactionData }) {
  const navigate = useNavigate();
  // We want 4 digits based on user request
  const [pin, setPin] = useState('');

  const handleKeyPress = (key) => {
    if (key === 'del') {
      setPin(prev => prev.slice(0, -1));
    } else if (key === 'submit') {
      if (pin.length === 4) {
        // Unlock and queue audio to play exactly when processing finishes
        const audio = new Audio('/paytm.mp3');
        audio.play().catch(() => {}); 
        audio.pause();
        audio.currentTime = 0;
        setTimeout(() => {
          audio.volume = 1.0;
          audio.play().catch(e => console.log('Audio error:', e));
        }, 1500);
        
        navigate('/processing');
      }
    } else {
      if (pin.length < 4) {
        setPin(prev => prev + key);
      }
    }
  };

  return (
    <div className="page-container" style={{ backgroundColor: '#F8F9FA', color: '#111827', paddingBottom: 0 }}>
      {/* Header */}
      <div style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px', color: '#4B5563' }}>
              UPI
            </span>
            <div style={{ display: 'flex', marginLeft: '5px' }}>
              <div style={{ width: '0', height: '0', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '10px solid #10B981' }}></div>
              <div style={{ width: '0', height: '0', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '10px solid #F59E0B', marginLeft: '-2px' }}></div>
            </div>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#4B5563', fontWeight: '500' }}>
            {transactionData.bankName || 'SBI Bank'} - 9648
          </div>
        </div>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
          <X size={26} color="#6B7280" />
        </button>
      </div>

      {/* Transaction Summary Card */}
      <div style={{ backgroundColor: '#FDF6E3', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB' }}>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
            Pay ₹{parseFloat(transactionData.amount || 0).toFixed(2)}
          </div>
          <div style={{ fontSize: '0.95rem', color: '#4B5563' }}>
            To {transactionData.payeeName || 'Unknown User'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem', color: '#4B5563' }}>₹ ➔</span>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#3B82F6', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <User size={16} />
          </div>
        </div>
      </div>

      {/* PIN Input Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '25px' }}>
          Enter your PIN
        </h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Security Warning */}
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <Info size={16} color="#F59E0B" />
        <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
          Never enter your UPI PIN to receive money
        </span>
      </div>

      {/* Custom Keypad */}
      <div className="pin-keypad">
        <button className="pin-key" onClick={() => handleKeyPress('1')}>1</button>
        <button className="pin-key" onClick={() => handleKeyPress('2')}>2</button>
        <button className="pin-key" onClick={() => handleKeyPress('3')}>3</button>
        
        <button className="pin-key" onClick={() => handleKeyPress('4')}>4</button>
        <button className="pin-key" onClick={() => handleKeyPress('5')}>5</button>
        <button className="pin-key" onClick={() => handleKeyPress('6')}>6</button>
        
        <button className="pin-key" onClick={() => handleKeyPress('7')}>7</button>
        <button className="pin-key" onClick={() => handleKeyPress('8')}>8</button>
        <button className="pin-key" onClick={() => handleKeyPress('9')}>9</button>
        
        <button className="pin-key" style={{ backgroundColor: '#CFD8DC' }} onClick={() => handleKeyPress('del')}>
          <Delete size={22} color="#111827" />
        </button>
        <button className="pin-key" onClick={() => handleKeyPress('0')}>0</button>
        <button 
          className="pin-key pin-key-pay" 
          onClick={() => handleKeyPress('submit')}
          style={{ opacity: pin.length === 4 ? 1 : 0.6 }}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
