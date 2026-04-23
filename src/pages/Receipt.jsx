import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Copy, BadgeCheck, Home, QrCode, Ticket } from 'lucide-react';

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Receipt({ transactionData }) {
  const navigate = useNavigate();
  
  const getFormattedDate = () => {
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const date = d.getDate();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${date} ${month}, ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const refNo = Math.floor(Math.random() * 1000000000000).toString();

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#EBF8FF' }}>
      
      {/* Top Section - Light Blue Gradient */}
      <div style={{ background: 'linear-gradient(to bottom, #D8F2F6 0%, #EFF9FA 100%)', paddingBottom: '20px' }}>
        
        {/* Header */}
        <div style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827', padding: 0 }}>
            <ArrowLeft size={28} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px', color: '#002970' }}>pay</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px', color: '#00B9F5' }}>tm</span>
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827', padding: 0 }}>
            <MoreVertical size={24} />
          </button>
        </div>

        {/* Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#111827', marginBottom: '5px', textAlign: 'center' }}>
            {transactionData.payeeName || 'Unknown User'}
          </h2>
          <div style={{ fontSize: '0.9rem', color: '#4B5563', marginBottom: '15px', textAlign: 'center' }}>
            UPI ID: {transactionData.upiId || 'unknown@upi'}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
            <div style={{ fontSize: '4rem', fontWeight: '800', letterSpacing: '-2px', color: '#111827', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2.8rem', marginTop: '10px', marginRight: '5px' }}>₹</span>
              {parseFloat(transactionData.amount || 0)}
            </div>
            <div style={{ marginLeft: '12px', marginTop: '5px' }}>
              <BadgeCheck size={45} color="#10B981" fill="#10B981" stroke="white" strokeWidth={1.5} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#4B5563', marginBottom: '30px' }}>
            <span>{getFormattedDate()}</span>
            <span>•</span>
            <span>Ref. No: {refNo}</span>
            <Copy size={16} style={{ cursor: 'pointer', marginLeft: '5px' }} />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
            <button style={{ backgroundColor: 'white', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '25px', padding: '12px 10px', fontSize: '0.85rem', fontWeight: '600', flex: 1, boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              Check Balance
            </button>
            <button style={{ backgroundColor: 'white', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '25px', padding: '12px 10px', fontSize: '0.85rem', fontWeight: '600', flex: 1, boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              Pay Again
            </button>
            <button style={{ backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '25px', padding: '12px 15px', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', flex: 1.2, justifyContent: 'center', boxShadow: '0 2px 5px rgba(16,185,129,0.3)' }}>
              <WhatsAppIcon />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Cyan Separator */}
      <div style={{ height: '8px', width: '100%', backgroundColor: '#00B9F5', position: 'relative', zIndex: 5 }}></div>

      {/* Bottom Section - Ad Banners (Dark Purple) */}
      <div style={{ backgroundColor: '#1E142F', flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
        
        {/* Scratch Card Overlaying the separator */}
        <div style={{ position: 'absolute', top: '-40px', left: '15px', zIndex: 10 }}>
          <div style={{ position: 'relative' }}>
             <div style={{ backgroundColor: '#E11D48', color: 'white', padding: '2px 6px', fontSize: '0.5rem', fontWeight: 'bold', position: 'absolute', top: 0, left: 0, borderBottomRightRadius: '4px', zIndex: 2 }}>Congratulation</div>
             <div style={{ width: '70px', height: '90px', background: 'linear-gradient(to bottom right, #3B82F6, #9D174D)', borderRadius: '8px', border: '2px solid #FCD34D', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: 'rotate(-8deg)', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
               <span style={{ color: '#FCD34D', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>SCRATCH &</span>
               <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>WIN</span>
             </div>
          </div>
        </div>

        {/* Purple Marquee Bar */}
        <div style={{ backgroundColor: '#6D28D9', padding: '10px', display: 'flex', alignItems: 'center', paddingLeft: '100px' }}>
          <div style={{ color: 'white', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', whiteSpace: 'nowrap' }}>
            CHCARD • YOU JUST WON A SCRATCH...
          </div>
        </div>

        {/* Movie Ad */}
        <div style={{ padding: '20px', paddingBottom: '90px' }}>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <div style={{ color: '#E5E7EB', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.5px' }}>BUY 2 MOVIE TICKETS & GET FLAT</div>
            <div style={{ color: '#E9D5FF', fontSize: '4.5rem', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-3px', lineHeight: '1.1', textShadow: '4px 6px 0px #6D28D9', display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: '3rem', marginTop: '15px' }}>₹</span>150 <span style={{ marginLeft: '10px' }}>OFF</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
             {/* Poster 1 */}
            <div style={{ flex: 1, height: '180px', background: 'linear-gradient(to bottom, #1E3A8A, #0F172A)', borderRadius: '8px', border: '1px solid #4B5563', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ color: '#60A5FA', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '1px 1px 2px black', textAlign: 'center', fontStyle: 'italic' }}>Bhool<br/>Bhulaiyaa</span>
               </div>
            </div>
             {/* Poster 2 */}
            <div style={{ flex: 1, height: '180px', background: 'linear-gradient(to bottom, #451A03, #1C1917)', borderRadius: '8px', border: '1px solid #4B5563', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ color: '#FCD34D', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '1px 1px 2px black', textAlign: 'center', letterSpacing: '2px' }}>THE<br/>MUMMY</span>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#002970', borderRadius: '35px', padding: '12px 30px', display: 'flex', gap: '40px', boxShadow: '0 10px 25px rgba(0,41,112,0.4)', zIndex: 100 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Home size={22} />
          <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>Home</span>
        </button>
        <button onClick={() => navigate('/scanner')} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <QrCode size={22} />
          <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>Scan</span>
        </button>
        <button style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <Ticket size={22} />
          <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>Cashback</span>
        </button>
      </div>
      
      {/* T&C Text */}
      <div style={{ position: 'fixed', bottom: '5px', width: '100%', textAlign: 'center', color: '#6B7280', fontSize: '0.5rem', fontWeight: 'bold', zIndex: 90 }}>
        *T&C APPLY<br/>VALID ON FIRST TRANSACTION ONLY
      </div>

    </div>
  );
}
