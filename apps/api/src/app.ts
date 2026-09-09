import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import type { CartItem, FeatureFlags, Order, Product, User } from '@nisum/shared-types';

export const demoProducts: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Headphones',
    description: 'Adaptive noise cancellation and 30-hour battery.',
    price: 149,
    category: 'Audio',
    image: '🎧',
    inventory: 18,
  },
  {
    id: 'orbit-speaker',
    name: 'Orbit Mini Speaker',
    description: 'A compact room-filling Bluetooth speaker.',
    price: 79,
    category: 'Audio',
    image: '🔊',
    inventory: 32,
  },
  {
    id: 'atlas-keyboard',
    name: 'Atlas Keyboard',
    description: 'Low-profile mechanical keyboard for focused work.',
    price: 119,
    category: 'Workspace',
    image: '⌨️',
    inventory: 11,
  },
  {
    id: 'pulse-watch',
    name: 'Pulse Watch',
    description: 'Wellness, activity, and sleep insights.',
    price: 199,
    category: 'Wearables',
    image: '⌚',
    inventory: 9,
  },
  {
    id: 'canvas-tote',
    name: 'Canvas Everyday Tote',
    description: 'Recycled canvas tote with a padded laptop sleeve.',
    price: 39,
    category: 'Lifestyle',
    image: '👜',
    inventory: 42,
  },
  {
    id: 'focus-lamp',
    name: 'Focus Desk Lamp',
    description: 'Warm-to-cool adjustable LED workspace light.',
    price: 65,
    category: 'Workspace',
    image: '💡',
    inventory: 20,
  },
];

let orders: Order[] = [
  {
    id: 'ORD-1042',
    createdAt: '2026-09-03T10:00:00.000Z',
    status: 'shipped',
    total: 149,
    itemCount: 1,
  },
];

const flags: FeatureFlags = {
  orders: process.env.ENABLE_ORDERS !== 'false',
  productSearch: true,
};

function delay() {
  return new Promise((resolve) => setTimeout(resolve, Number(process.env.API_DELAY_MS ?? 220)));
}
function requestLog(req: Request, _res: Response, next: NextFunction) {
  const start = Date.now();
  _res.on('finish', () =>
    console.info(
      JSON.stringify({
        level: 'info',
        service: 'commerce-api',
        method: req.method,
        path: req.path,
        status: _res.statusCode,
        durationMs: Date.now() - start,
      }),
    ),
  );
  next();
}

export function isAuthorized(authorization?: string) {
  return Boolean(authorization?.startsWith('Bearer demo-token-'));
}
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!isAuthorized(req.headers.authorization))
    return res.status(401).json({
      message: 'Please sign in before viewing or placing orders.',
      code: 'UNAUTHENTICATED',
    });
  next();
}

export function createApp() {
  const app = express();
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(requestLog);

  app.get('/health', (_req, res) =>
    res.json({
      status: 'ok',
      service: 'commerce-api',
      timestamp: new Date().toISOString(),
    }),
  );
  app.get('/api/config', async (_req, res) => {
    await delay();
    res.json(flags);
  });
  app.get('/api/products', async (req, res) => {
    await delay();
    if (req.query.fail === 'true')
      return res.status(503).json({
        message: 'Product catalog is temporarily unavailable.',
        code: 'CATALOG_UNAVAILABLE',
      });
    res.json(demoProducts);
  });
  app.get('/api/products/:id', async (req, res) => {
    await delay();
    const product = demoProducts.find((item) => item.id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.', code: 'NOT_FOUND' });
    res.json(product);
  });
  app.post('/api/auth/login', async (req, res) => {
    await delay();
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
    if (!/^\S+@\S+\.\S+$/.test(email))
      return res.status(400).json({
        message: 'A valid email address is required.',
        code: 'INVALID_EMAIL',
      });
    const user: User = {
      id: 'demo-customer',
      name: email.split('@')[0].replace(/[._-]/g, ' ') || 'Demo Customer',
      email,
      role: 'customer',
    };
    res.json({
      user: {
        ...user,
        name: user.name.replace(/\b\w/g, (letter) => letter.toUpperCase()),
      },
      token: `demo-token-${Date.now()}`,
    });
  });
  app.get('/api/orders', requireAuth, async (_req, res) => {
    await delay();
    res.json(orders);
  });
  app.post('/api/orders', requireAuth, async (req, res) => {
    await delay();
    const items = Array.isArray(req.body?.items) ? (req.body.items as CartItem[]) : [];
    if (
      items.length === 0 ||
      items.some(
        (item) => !item?.product?.id || !Number.isInteger(item.quantity) || item.quantity < 1,
      )
    )
      return res.status(400).json({
        message: 'Your cart is empty or contains invalid items.',
        code: 'INVALID_CART',
      });
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'processing',
      total,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    };
    orders = [order, ...orders];
    res.status(201).json(order);
  });

  app.use((_req, res) =>
    res.status(404).json({ message: 'API route not found.', code: 'NOT_FOUND' }),
  );
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(
      JSON.stringify({
        level: 'error',
        service: 'commerce-api',
        message: error.message,
      }),
    );
    res.status(500).json({
      message: 'An unexpected API error occurred.',
      code: 'INTERNAL_ERROR',
    });
  });
  return app;
}
