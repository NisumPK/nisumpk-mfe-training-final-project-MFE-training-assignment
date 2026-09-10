import { useState } from 'react';
import { api, ApiError } from '@nisum/api-client';
import { nisumEvents } from '@nisum/events';
import { Card, InlineError } from '@nisum/shared-ui';
import {
  actions,
  selectCartItemCount,
  selectCartTotal,
  useAppDispatch,
  useAppSelector,
} from '@nisum/state';
import CartEventBridge from './CartEventBridge';
import { CartContents } from './CartContents';

export default function CartPage({ listen = false }: { listen?: boolean }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const auth = useAppSelector((state) => state.auth);
  const count = useAppSelector(selectCartItemCount);
  const total = useAppSelector(selectCartTotal);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkout = async () => {
    setError(null);
    if (!auth.token) {
      nisumEvents().emit('notification:show', {
        message: 'Please sign in from the gateway before checkout.',
        level: 'info',
      });
      return;
    }
    setSubmitting(true);
    try {
      nisumEvents().emit('cart:checkout-requested', {
        itemCount: count,
        total,
      });
      const order = await api.checkout(auth.token, items);
      dispatch(actions.clearCart());
      nisumEvents().emit('order:created', { order });
      nisumEvents().emit('notification:show', {
        message: `${order.id} is now processing.`,
        level: 'success',
      });
    } catch (reason) {
      setError((reason as ApiError).message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="mfe-page" aria-label="Shopping cart">
      {listen && <CartEventBridge />}
      <div className="mfe-heading">
        <div>
          <h1>Shopping cart</h1>
          <p>
            This Cart MFE receives <code>cart:item-added</code> browser events and owns checkout.
          </p>
        </div>
      </div>
      <Card className="cart-page-card">
        {error && <InlineError title="Unable to place order" message={error} />}
        {submitting ? (
          <p className="checkout-progress">Creating your order…</p>
        ) : (
          <CartContents checkout={checkout} />
        )}
      </Card>
    </main>
  );
}
