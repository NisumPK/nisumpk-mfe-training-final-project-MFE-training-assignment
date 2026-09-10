import { createApp } from './app';

const port = Number(process.env.PORT ?? 4000);
createApp().listen(port, () =>
  console.info(
    JSON.stringify({
      level: 'info',
      service: 'commerce-api',
      message: `Listening on http://localhost:${port}`,
    }),
  ),
);
