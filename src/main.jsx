import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import routes from './routes';
import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <RouterProvider router={router} />
    </ReactFlowProvider>
  </React.StrictMode>
);