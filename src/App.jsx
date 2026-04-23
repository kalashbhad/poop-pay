import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Amount from './pages/Amount';
import Pin from './pages/Pin';
import Processing from './pages/Processing';
import Success from './pages/Success';
import Receipt from './pages/Receipt';

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
        <Route path="/processing" element={<Processing transactionData={transactionData} />} />
        <Route path="/success" element={<Success transactionData={transactionData} />} />
        <Route path="/receipt" element={<Receipt transactionData={transactionData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
