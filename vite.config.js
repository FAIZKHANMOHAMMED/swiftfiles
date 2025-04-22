import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0', // Allow connections from all networks
  },
  preview: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0', // Allow connections from all networks
  }
}); 