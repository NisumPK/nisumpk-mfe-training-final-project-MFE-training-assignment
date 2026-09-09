import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { actions, store } from '@nisum/state';
import OrdersPage from './OrdersPage';

describe('OrdersPage', () => {
  beforeEach(() => store.dispatch(actions.signOut()));
  it('uses the shared auth state to guard backend order history', () => {
    render(
      <Provider store={store}>
        <OrdersPage />
      </Provider>,
    );
    expect(screen.getByText('Sign in required')).toBeInTheDocument();
  });
});
