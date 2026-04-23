import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Send, CreditCard, History, User, Bell } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#3B82F6', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            <User size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#BFDBFE' }}>Add address</div>
            <div className="header-title" style={{ fontSize: '1rem' }}>Sushant</div>
          </div>
        </div>
        <Bell size={24} color="white" />
      </div>

      <div className="balance-card">
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Balance</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>₹ 45,230.50</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Savings Account •••• 1234</div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
          <button className="icon-btn" onClick={() => navigate('/scanner')}>
            <div className="icon-circle" style={{ backgroundColor: '#1E3A8A' }}>
              <QrCode size={24} />
            </div>
            Scan & Pay
          </button>
          <button className="icon-btn">
            <div className="icon-circle">
              <Send size={24} />
            </div>
            To Mobile
          </button>
          <button className="icon-btn">
            <div className="icon-circle">
              <CreditCard size={24} />
            </div>
            To Bank
          </button>
          <button className="icon-btn">
            <div className="icon-circle">
              <History size={24} />
            </div>
            History
          </button>
        </div>
      </div>

      <div className="card" style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>Recent Payees</h3>
        <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
          {['Rohan', 'Amit', 'Priya', 'Mummy'].map((name, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#E5E7EB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#4B5563' }}>
                {name[0]}
              </div>
              <span style={{ fontSize: '0.8rem' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Big floating button to make it obvious where to click for the prototype */}
      <div style={{ padding: '20px', marginTop: 'auto' }}>
        <button className="btn-primary" onClick={() => navigate('/scanner')} style={{ padding: '18px', fontSize: '1.2rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(30, 58, 138, 0.3)' }}>
          <QrCode size={24} />
          Scan any QR to Pay
        </button>
      </div>
    </div>
  );
}
