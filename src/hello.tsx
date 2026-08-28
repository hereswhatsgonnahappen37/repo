import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HelloWorld from '@/pages/HelloWorld';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelloWorld />
  </StrictMode>
);
