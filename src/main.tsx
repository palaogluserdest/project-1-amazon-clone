import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { StateContextProvider } from './provider/StateProvider.tsx';
import './assets/styles/reset.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateContextProvider>
  </StrictMode>,
);
