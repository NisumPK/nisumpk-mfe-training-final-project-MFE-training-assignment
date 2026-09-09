import { Provider } from 'react-redux';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { installNisumEventSystem } from '@nisum/events';
import { actions, store } from '@nisum/state';
import CartPanel from './CartPanel';

describe('CartPanel', () => {
  beforeEach(() => {
    store.dispatch(actions.clearCart());
    delete window.NISUM;
  });
  it('receives a Product MFE-style browser event and updates RTK state', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CartPanel />
        </Provider>
      </MemoryRouter>,
    );
    act(() =>
      installNisumEventSystem().emit('cart:item-added', {
        quantity: 1,
        product: {
          id: 'p1',
          name: 'Orbit',
          description: '',
          price: 10,
          category: 'Audio',
          image: '🔊',
          inventory: 1,
        },
      }),
    );
    await waitFor(() => expect(screen.getByText('Orbit')).toBeInTheDocument());
    expect(store.getState().cart.items).toHaveLength(1);
  });
});
