import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import app from './server/index.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'express-api-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            return app(req, res, next);
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5173
  }
});
