import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Amount from './pages/Amount';
import Pin from './pages/Pin';
import Success from './pages/Success';

function App() {
  const [transactionData, setTransactionData] = useState({
    payeeName: '',
    upiId: '',
    bankName: '',
    amount: '',
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner setTransactionData={setTransactionData} />} />
        <Route path="/amount" element={<Amount transactionData={transactionData} setTransactionData={setTransactionData} />} />
        <Route path="/pin" element={<Pin transactionData={transactionData} />} />
        <Route path="/success" element={<Success transactionData={transactionData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
