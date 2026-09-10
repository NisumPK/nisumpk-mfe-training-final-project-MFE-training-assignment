import { actions, selectCartItemCount, selectCartTotal, store } from './index';
import type { Product } from '@nisum/shared-types';

const product: Product = {
  id: 'p1',
  name: 'Headphones',
  description: 'Test',
  price: 40,
  category: 'Audio',
  image: '',
  inventory: 4,
};

describe('shared RTK state', () => {
  beforeEach(() => store.dispatch(actions.clearCart()));

  it('updates totals as items are shared through the singleton store', () => {
    store.dispatch(actions.addItem({ product, quantity: 2 }));
    const state = store.getState();
    expect(selectCartItemCount(state)).toBe(2);
    expect(selectCartTotal(state)).toBe(80);
  });
});
