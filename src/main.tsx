import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import 'app/styles/index.scss';
import useMockAdapter from './api/useMockAdapter.ts';
import { ReactQueryProvider } from 'app/providers/QueryClientProvider/index.ts';


useMockAdapter();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
);
