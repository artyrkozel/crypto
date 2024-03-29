import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryProvider } from 'app/providers/QueryClientProvider/index.ts';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider.tsx';
import App from './app/App.tsx';
import 'app/styles/index.scss';
import './shared/config/i18n/i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ReactQueryProvider>
          <App />
        </ReactQueryProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
