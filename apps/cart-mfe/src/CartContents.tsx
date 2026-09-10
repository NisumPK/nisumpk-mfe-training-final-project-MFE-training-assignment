import type { CartItem } from '@nisum/shared-types';
import { Button } from '@nisum/shared-ui';
import { actions, selectCartTotal, useAppDispatch, useAppSelector } from '@nisum/state';

export function CartContents({
  compact = false,
  checkout,
}: {
  compact?: boolean;
  checkout?: () => void;
}) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = useAppSelector(selectCartTotal);
  if (items.length === 0)
    return <p className="empty">Your cart is waiting for something wonderful.</p>;
  const visibleItems = compact ? items.slice(0, 3) : items;
  return (
    <>
      {visibleItems.map((item) => (
        <CartRow key={item.product.id} item={item} compact={compact} />
      ))}
      {compact && items.length > visibleItems.length && (
        <p className="muted">+ {items.length - visibleItems.length} more item(s)</p>
      )}
      <div className="cart-summary">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {checkout && (
        <Button className="checkout-button" onClick={checkout}>
          Secure checkout
        </Button>
      )}
      {!compact && (
        <Button className="secondary clear-button" onClick={() => dispatch(actions.clearCart())}>
          Clear cart
        </Button>
      )}
    </>
  );
}

function CartRow({ item, compact }: { item: CartItem; compact: boolean }) {
  const dispatch = useAppDispatch();
  return (
    <div className="cart-row">
      <span className="cart-item-icon" aria-hidden="true">
        {item.product.image}
      </span>
      <div>
        <h3>{item.product.name}</h3>
        <p className="muted">${item.product.price.toFixed(2)} each</p>
        {!compact && (
          <div className="quantity">
            <button
              aria-label={`Decrease ${item.product.name}`}
              onClick={() =>
                dispatch(
                  actions.updateQuantity({
                    productId: item.product.id,
                    quantity: item.quantity - 1,
                  }),
                )
              }
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              aria-label={`Increase ${item.product.name}`}
              onClick={() =>
                dispatch(
                  actions.updateQuantity({
                    productId: item.product.id,
                    quantity: item.quantity + 1,
                  }),
                )
              }
            >
              +
            </button>
          </div>
        )}
      </div>
      <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
    </div>
  );
}
