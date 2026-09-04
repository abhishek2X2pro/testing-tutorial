// ============================================================
// main.jsx — Application entry point
// ============================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Mobile layer — must load last so it can override the pages' inline styles.
import './styles/responsive.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
