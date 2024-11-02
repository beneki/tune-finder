import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App.jsx';
import ErrorProvider from './components/ErrorProvider/ErrorProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorProvider> 
        <App />
      </ErrorProvider> 
    </Provider>
  </StrictMode>
);
