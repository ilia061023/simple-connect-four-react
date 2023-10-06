import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', backgroundColor: '#2b2a33', color: 'white' }}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </div>
);

reportWebVitals();
