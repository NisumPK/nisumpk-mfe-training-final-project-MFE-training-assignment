import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { api } from '@nisum/api-client';
import { installNisumEventSystem, nisumEvents } from '@nisum/events';
import { Button, ErrorBoundary, InlineError, Loader } from '@nisum/shared-ui';
import {
  actions,
  selectCartItemCount,
  startCartPersistence,
  useAppDispatch,
  useAppSelector,
} from '@nisum/state';

const ProductsPage = lazy(() => import('products_mfe/ProductsPage'));
const CartPage = lazy(() => import('cart_mfe/CartPage'));
const CartPanel = lazy(() => import('cart_mfe/CartPanel'));
const OrdersPage = lazy(() => import('orders_mfe/OrdersPage'));

type Toast = { message: string; level: 'success' | 'error' | 'info' };

function RemoteSlot({ component: Component, name }: { component: ComponentType; name: string }) {
  return (
    <ErrorBoundary
      fallback={(error, retry) => (
        <InlineError
          title={`${name} unavailable`}
          message={`The remote could not load: ${error.message}. It may be independently deployed or temporarily offline.`}
          retry={retry}
        />
      )}
    >
      <Suspense fallback={<Loader label={`Loading ${name} remote…`} />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

function LoginControl() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('shopper@nisum.com');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const session = await api.login(email);
      dispatch(actions.signIn(session));
      nisumEvents().emit('user:login', { user: session.user });
      nisumEvents().emit('notification:show', {
        message: `Welcome, ${session.user.name}!`,
        level: 'success',
      });
      setOpen(false);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setSubmitting(false);
    }
  };
  if (auth.user)
    return (
      <div className="account">
        <span title={auth.user.email}>Hi, {auth.user.name}</span>
        <Button
          className="secondary"
          onClick={() => {
            dispatch(actions.signOut());
            nisumEvents().emit('user:logout', undefined);
            nisumEvents().emit('notification:show', {
              message: 'You are signed out.',
              level: 'info',
            });
          }}
        >
          Sign out
        </Button>
      </div>
    );
  return (
    <>
      <Button onClick={() => setOpen(true)}>Sign in</Button>
      {open && (
        <div className="modal-backdrop" role="presentation">
          <form className="login-modal card" onSubmit={signIn} aria-label="Sign in">
            <button
              className="modal-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sign in"
            >
              ×
            </button>
            <span className="eyebrow">AUTH BONUS</span>
            <h2>Demo sign in</h2>
            <p>Authentication is shared through the federated RTK state package.</p>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <Button disabled={submitting}>{submitting ? 'Signing in…' : 'Continue'}</Button>
          </form>
        </div>
      )}
    </>
  );
}

function GatewayShell() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartItemCount);
  const theme = useAppSelector((state) => state.preferences.theme);
  const ordersEnabled =
    useAppSelector((state) => state.features.orders) &&
    import.meta.env.VITE_ENABLE_ORDERS !== 'false';
  const [toast, setToast] = useState<Toast | null>(null);
  const [configWarning, setConfigWarning] = useState<string | null>(null);

  useEffect(() => {
    installNisumEventSystem();
    const stopPersistence = startCartPersistence();
    const stopNotifications = nisumEvents().listener('notification:show', (payload) =>
      setToast(payload),
    );
    const stopCheckoutLogging = nisumEvents().listener('cart:checkout-requested', (payload) =>
      console.info('[gateway] checkout requested', payload),
    );
    api
      .features()
      .then((flags) => dispatch(actions.setFeatures(flags)))
      .catch(() => setConfigWarning('Feature configuration is unavailable; using safe defaults.'));
    const reportClientError = (event: ErrorEvent) =>
      console.error('[gateway] client error', event.error ?? event.message);
    window.addEventListener('error', reportClientError);
    return () => {
      stopPersistence();
      stopNotifications();
      stopCheckoutLogging();
      window.removeEventListener('error', reportClientError);
    };
  }, [dispatch]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/catalog" className="brand">
          <span className="brand-mark">N</span>
          <span>
            Nisum <b>Commerce Hub</b>
          </span>
        </NavLink>
        <div className="topbar-actions">
          <span className="health">
            <i /> API connected
          </span>
          <Button
            className="secondary theme-button"
            aria-label="Toggle color theme"
            onClick={() => dispatch(actions.setTheme(theme === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? '◐' : '☀'}
          </Button>
          <LoginControl />
        </div>
      </header>
      <div className="shell-body">
        <aside className="navigation">
          <p className="nav-caption">PLATFORM</p>
          <nav>
            <NavLink to="/catalog">◈ Catalog</NavLink>
            <NavLink to="/cart">
              ◉ Cart <span className="nav-count">{count}</span>
            </NavLink>
            {ordersEnabled && <NavLink to="/orders">▤ Orders</NavLink>}
          </nav>
          <div className="architecture-note">
            <span className="eyebrow">HOST / GATEWAY</span>
            <p>
              Runtime composition, navigation, error boundaries, state provider, and observability.
            </p>
          </div>
        </aside>
        <section className="remote-region">
          <div className="demo-strip">
            <span>Module Federation host</span>
            <span>•</span>
            <span>RTK shared state</span>
            <span>•</span>
            <span>window.NISUM events</span>
          </div>
          {configWarning && <p className="config-warning">{configWarning}</p>}
          <Routes>
            <Route
              path="/catalog"
              element={<RemoteSlot component={ProductsPage} name="Product Catalog" />}
            />
            <Route
              path="/cart"
              element={<RemoteSlot component={CartPage} name="Shopping Cart" />}
            />
            {ordersEnabled && (
              <Route
                path="/orders"
                element={<RemoteSlot component={OrdersPage} name="Order History" />}
              />
            )}
            <Route path="*" element={<Navigate to="/catalog" replace />} />
          </Routes>
        </section>
        <div className="side-region">
          <RemoteSlot component={CartPanel} name="Cart summary" />
        </div>
      </div>
      {toast && (
        <div className={`gateway-toast ${toast.level}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GatewayShell />
    </BrowserRouter>
  );
}
