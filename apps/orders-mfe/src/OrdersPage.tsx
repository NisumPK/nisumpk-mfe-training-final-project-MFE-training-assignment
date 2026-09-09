import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@nisum/api-client';
import { nisumEvents } from '@nisum/events';
import type { Order } from '@nisum/shared-types';
import { Card, InlineError, Loader } from '@nisum/shared-ui';
import { useAppSelector } from '@nisum/state';

export default function OrdersPage() {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      setOrders(await api.orders(token));
    } catch (reason) {
      setError((reason as ApiError).message);
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    void load();
  }, [load]);
  useEffect(
    () =>
      nisumEvents().listener('order:created', ({ order }) =>
        setOrders((existing) => [order, ...existing.filter((entry) => entry.id !== order.id)]),
      ),
    [],
  );

  if (!user)
    return (
      <main className="mfe-page">
        <div className="mfe-heading">
          <div>
            <h1>Orders</h1>
            <p>This bonus Orders MFE uses the shared authenticated RTK session.</p>
          </div>
        </div>
        <InlineError
          title="Sign in required"
          message="Use the Sign in button in the gateway before opening your order history."
        />
      </main>
    );
  return (
    <main className="mfe-page" aria-label="Order history">
      <div className="mfe-heading">
        <div>
          <h1>Order history</h1>
          <p>Welcome back, {user.name}. Orders come from the backend API.</p>
        </div>
        <button className="button secondary" onClick={() => void load()}>
          Refresh
        </button>
      </div>
      {loading && <Loader label="Loading your orders…" />}
      {error && (
        <InlineError title="Orders unavailable" message={error} retry={() => void load()} />
      )}
      {!loading && !error && (
        <div className="order-list">
          {orders.length ? (
            orders.map((order) => (
              <Card className="order-card" key={order.id}>
                <div>
                  <span className="tag">{order.status}</span>
                  <h2>{order.id}</h2>
                  <p className="muted">
                    {new Date(order.createdAt).toLocaleString()} · {order.itemCount} item(s)
                  </p>
                </div>
                <strong className="price">${order.total.toFixed(2)}</strong>
              </Card>
            ))
          ) : (
            <p className="empty">You have not placed an order yet.</p>
          )}
        </div>
      )}
    </main>
  );
}
