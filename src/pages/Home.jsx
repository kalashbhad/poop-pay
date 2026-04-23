import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, QrCode, Smartphone, Landmark, 
  FileText, Zap, Car, CreditCard, ChevronRight,
  UserPlus, Calendar, IndianRupee, TrendingUp, Fingerprint
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ backgroundColor: '#F8F9FA' }}>
      
      {/* Header */}
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '50%', 
            backgroundColor: '#A7F3D0', 
            color: '#065F46', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            KB
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#002970', letterSpacing: '-0.5px' }}>paytm</span>
            <span style={{ color: '#00B9F5', fontSize: '0.8rem', fontWeight: 'bold' }}>UPI</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px', color: '#111827' }}>
          <Search size={24} />
          <Bell size={24} />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="promo-banner">
        <div style={{ maxWidth: '60%', zIndex: 2 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827', marginBottom: '10px', lineHeight: '1.3' }}>
            Super Secure Payments with <span style={{ color: '#059669' }}>Fingerprint</span>
          </h2>
          <button style={{ 
            background: 'white', 
            color: '#002970', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            Activate Now <ChevronRight size={14} />
          </button>
        </div>
        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.9 }}>
           {/* Abstract illustration representation */}
           <div style={{ width: '120px', height: '140px', backgroundColor: '#BAE6FD', borderRadius: '20px', transform: 'rotate(10deg)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '80px', backgroundColor: 'white', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Fingerprint size={40} color="#059669" />
              </div>
           </div>
        </div>
      </div>

      {/* UPI Money Transfer */}
      <div className="dashboard-card">
        <h3 className="text-h3">UPI Money Transfer</h3>
        <div className="icon-grid-4">
          <button className="grid-item" onClick={() => navigate('/scanner')}>
            <div className="icon-circle-blue">
              <QrCode size={24} />
            </div>
            <span>Scan<br/>& Pay</span>
          </button>
          <button className="grid-item">
            <div className="icon-circle-blue">
              <UserPlus size={24} />
            </div>
            <span>To Mobile /<br/>Contact</span>
          </button>
          <button className="grid-item">
            <div className="icon-circle-blue">
              <Landmark size={24} />
            </div>
            <span>To Bank &<br/>Self A/c</span>
          </button>
          <button className="grid-item">
            <div className="icon-circle-blue">
              <FileText size={24} />
            </div>
            <span>Balance &<br/>History</span>
          </button>
        </div>
      </div>

      {/* Recharge & Bills */}
      <div className="dashboard-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Recharge & Bills</h3>
          <span style={{ fontSize: '0.85rem', color: '#002970', fontWeight: '600' }}>View More</span>
        </div>
        <div className="icon-grid-4">
          <button className="grid-item">
            <div className="icon-circle-light">
              <Smartphone size={24} />
            </div>
            <span>Mobile<br/>Recharge</span>
          </button>
          <button className="grid-item">
            <div className="icon-circle-light">
              <Car size={24} />
            </div>
            <span>FASTag<br/>Recharge</span>
          </button>
          <button className="grid-item">
            <div className="icon-circle-light">
              <Zap size={24} />
            </div>
            <span>Electricity<br/>Bill</span>
          </button>
          <button className="grid-item">
            <div className="icon-circle-light">
              <Calendar size={24} />
            </div>
            <span>Loan EMI<br/>Payment</span>
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px' }}>
            <div style={{ width: '20px', height: '100%', backgroundColor: '#9CA3AF', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '0 16px', marginBottom: '20px' }}>
        {/* Left tall card */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridRow: 'span 2' }}>
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Paytm Postpaid</h4>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: '1.4' }}>Access up to ₹60,000 - Zero paperwork</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
             <CreditCard size={32} color="#9CA3AF" />
          </div>
        </div>

        {/* Right top card */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontWeight: '600', fontSize: '0.9rem' }}>Loan Upto<br/>₹15 Lakh</h4>
          <div style={{ width: '30px', height: '30px', borderRadius: '15px', backgroundColor: '#F3F4F6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <IndianRupee size={16} color="#6B7280" />
          </div>
        </div>

        {/* Right bottom card */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontWeight: '600', fontSize: '0.9rem' }}>Trending<br/>Stocks</h4>
          <TrendingUp size={24} color="#9CA3AF" />
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fab-container">
        <button className="fab-button" onClick={() => navigate('/scanner')}>
          <QrCode size={22} />
          Scan QR
        </button>
      </div>

    </div>
  );
}
