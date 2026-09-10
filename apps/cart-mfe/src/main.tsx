import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@nisum/shared-ui/styles.css';
import { installNisumEventSystem } from '@nisum/events';
import { store } from '@nisum/state';
import CartPage from './CartPage';

installNisumEventSystem();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CartPage listen />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
