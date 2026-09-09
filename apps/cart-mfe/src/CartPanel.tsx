import { Link } from 'react-router-dom';
import { Card } from '@nisum/shared-ui';
import { selectCartItemCount, useAppSelector } from '@nisum/state';
import CartEventBridge from './CartEventBridge';
import { CartContents } from './CartContents';

export default function CartPanel() {
  const count = useAppSelector(selectCartItemCount);
  return (
    <aside className="cart-panel" aria-label="Shared shopping cart">
      <CartEventBridge />
      <Card>
        <div className="panel-title">
          <div>
            <span className="eyebrow">CART MFE</span>
            <h2>
              Shopping cart <span className="count-badge">{count}</span>
            </h2>
          </div>
          <Link to="/cart">Open</Link>
        </div>
        <CartContents compact />
      </Card>
    </aside>
  );
}
