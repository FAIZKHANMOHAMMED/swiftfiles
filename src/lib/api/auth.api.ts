import { apiRequest, API_URL } from './config';
import { User, AuthError } from '../auth';

// Register a new user
export const register = async (email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    await apiRequest('/auth/register', 'POST', { email, password });
    return { user: null, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: { message: error instanceof Error ? error.message : 'An error occurred' }
    };
  }
};

// Sign in user
export const login = async (email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> => {
  try {
    console.log('Attempting login with API URL:', `${API_URL}/auth/login`);
    const data = await apiRequest('/auth/login', 'POST', { email, password });
    console.log('Login response data:', data);
    
    // Store token in localStorage
    localStorage.setItem('auth_token', data.token);
    
    // Convert to User format
    const user: User = {
      id: data.id,
      email: data.email,
      createdAt: data.createdAt
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User stored in localStorage:', user);
    
    // Trigger auth listeners to update UI
    window.dispatchEvent(new Event('storage'));
    
    return { user, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      user: null, 
      error: { message: error instanceof Error ? error.message : 'An error occurred' }
    };
  }
};

// Sign out user
export const logout = async (): Promise<{ error: AuthError | null }> => {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return { error: null };
  } catch (error) {
    return { 
      error: { message: error instanceof Error ? error.message : 'An error occurred' }
    };
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // Check if we have a user in localStorage
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return null;
    }
    
    if (userJson) {
      // If we have a user, validate it with the server
      const userData = JSON.parse(userJson);
      try {
        // Verify token is still valid
        await apiRequest('/auth/me', 'GET', null, token);
        return userData;
      } catch (error) {
        // If token is invalid, clear localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        return null;
      }
    } else if (token) {
      // If we have a token but no user, get the user from the server
      try {
        const userData = await apiRequest('/auth/me', 'GET', null, token);
        const user: User = {
          id: userData.id,
          email: userData.email,
          createdAt: userData.createdAt
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } catch (error) {
        localStorage.removeItem('auth_token');
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}; 