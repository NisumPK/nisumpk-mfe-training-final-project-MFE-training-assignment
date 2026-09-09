import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from '@nisum/state';

vi.mock('@nisum/api-client', () => ({
  api: {
    features: vi.fn().mockResolvedValue({ orders: true, productSearch: true }),
    login: vi.fn(),
  },
}));

import App from './App';

describe('Gateway host', () => {
  it('renders shell navigation and a federated remote loading boundary', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText('Nisum')).toBeInTheDocument();
    expect(await screen.findByText('Product remote loaded')).toBeInTheDocument();
    expect(screen.getByText('Cart panel loaded')).toBeInTheDocument();
  });
});
