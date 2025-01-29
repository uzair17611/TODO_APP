import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>  {/* ✅ Wrap TaskProvider around AuthProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </TaskProvider>
  </React.StrictMode>
);
