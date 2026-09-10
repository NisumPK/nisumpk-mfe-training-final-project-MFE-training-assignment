import { useEffect, useMemo, useState } from 'react';
import { api, ApiError } from '@nisum/api-client';
import { nisumEvents } from '@nisum/events';
import type { Product } from '@nisum/shared-types';
import { Button, Card, InlineError, Loader } from '@nisum/shared-ui';
import { useAppSelector } from '@nisum/state';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const productSearch = useAppSelector((state) => state.features.productSearch);

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .products()
      .then(setProducts)
      .catch((reason: ApiError) => setError(reason.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, query],
  );
  const addToCart = (product: Product) => {
    nisumEvents().emit('cart:item-added', { product, quantity: 1 });
    nisumEvents().emit('notification:show', {
      message: `${product.name} added to cart`,
      level: 'success',
    });
  };

  return (
    <main className="mfe-page" aria-label="Product catalog">
      <div className="mfe-heading">
        <div>
          <h1>Product catalog</h1>
          <p>Products are loaded by the Product MFE from the Commerce API.</p>
        </div>
        {productSearch && (
          <input
            aria-label="Search products"
            className="search"
            placeholder="Search catalog"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}
      </div>
      {loading && <Loader label="Loading the catalog from the API…" />}
      {error && <InlineError title="Catalog unavailable" message={error} retry={load} />}
      {!loading && !error && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Card className="product-card" key={product.id}>
              <div className="product-icon" aria-hidden="true">
                {product.image}
              </div>
              <div className="product-copy">
                <span className="tag">{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="product-bottom">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <Button disabled={product.inventory === 0} onClick={() => addToCart(product)}>
                    {product.inventory ? 'Add to cart' : 'Sold out'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="empty">No products match “{query}”.</p>
      )}
    </main>
  );
}
