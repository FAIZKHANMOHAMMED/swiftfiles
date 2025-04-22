// Types
export type User = {
  id: string;
  email: string;
  createdAt: string;
};

export type AuthError = {
  message: string;
};

// Import auth functions from API
import { 
  register, 
  login, 
  logout, 
  getCurrentUser as getUser
} from './api/auth.api';

// Export renamed functions to maintain compatibility
export const signUp = register;
export const signIn = login;
export const signOut = logout;
export const getCurrentUser = getUser;

// Set up auth change listener
type AuthChangeCallback = (user: User | null) => void;
const authListeners = new Set<AuthChangeCallback>();

export const onAuthStateChange = (callback: AuthChangeCallback) => {
  authListeners.add(callback);
  
  // Initial call with current auth state
  const userJson = localStorage.getItem('user');
  const currentUser = userJson ? JSON.parse(userJson) : null;
  callback(currentUser);
  
  // Return unsubscribe function
  return {
    unsubscribe: () => {
      authListeners.delete(callback);
    }
  };
};

// Listen for storage events to sync auth state across tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'user' || event.key === 'auth_token') {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    authListeners.forEach(listener => listener(user));
  }
});