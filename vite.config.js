import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0', // Allow connections from all networks
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'swiftfiles.onrender.com',
      'swiftfiles-frontend.onrender.com',
      'swiftfiles-api.onrender.com',
      'swiftfiles.onrender.app'
    ],
    cors: true
  },
  preview: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0', // Allow connections from all networks
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'swiftfiles.onrender.com',
      'swiftfiles-frontend.onrender.com',
      'swiftfiles-api.onrender.com',
      'swiftfiles.onrender.app'
    ],
    cors: true
  },
  define: {
    // Make sure env variables are properly stringified for the client
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://swiftfiles-api.onrender.com/api'),
    'import.meta.env.VITE_APP_URL': JSON.stringify(process.env.VITE_APP_URL || 'https://swiftfiles.onrender.app')
  }
}); 