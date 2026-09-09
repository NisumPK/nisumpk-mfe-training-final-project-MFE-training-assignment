import { demoProducts, isAuthorized } from './app';

describe('Commerce API', () => {
  it('provides meaningful catalog data and protects authenticated resources', () => {
    expect(demoProducts).toHaveLength(6);
    expect(demoProducts.every((product) => product.inventory > 0 && product.price > 0)).toBe(true);
    expect(isAuthorized()).toBe(false);
    expect(isAuthorized('Bearer demo-token-123')).toBe(true);
  });
});
