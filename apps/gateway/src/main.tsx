import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '@nisum/shared-ui/styles.css';
import './styles.css';
import { installNisumEventSystem } from '@nisum/events';
import { store } from '@nisum/state';
import App from './App';

installNisumEventSystem();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
