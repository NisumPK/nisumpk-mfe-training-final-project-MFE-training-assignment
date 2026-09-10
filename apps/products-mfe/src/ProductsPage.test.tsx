import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { installNisumEventSystem } from '@nisum/events';
import { store } from '@nisum/state';
import ProductsPage from './ProductsPage';

vi.mock('@nisum/api-client', async () => ({
  ApiError: class ApiError extends Error {},
  api: {
    products: vi.fn().mockResolvedValue([
      {
        id: 'p1',
        name: 'Orbit',
        description: 'Speaker',
        price: 10,
        category: 'Audio',
        image: '🔊',
        inventory: 1,
      },
    ]),
  },
}));

describe('ProductsPage', () => {
  it('loads products and emits cart:item-added', async () => {
    const bus = installNisumEventSystem();
    const event = vi.fn();
    bus.listener('cart:item-added', event);
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>,
    );
    await screen.findByText('Orbit');
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    await waitFor(() =>
      expect(event).toHaveBeenCalledWith(expect.objectContaining({ quantity: 1 })),
    );
  });
});
