// src/App.js
import React from 'react';
import PriceCard from './components/PriceCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Cryptocurrency Prices</h1>
      <div className="price-container">
      <PriceCard currency="USD" symbol="&#36;" />
      <PriceCard currency="EUR" symbol="&euro;" />
      <PriceCard currency="GBP" symbol="&pound;" />

        {/* Add more cryptocurrencies as needed */}
      </div>
    </div>
  );
}

export default App;
