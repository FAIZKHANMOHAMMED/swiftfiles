// API Configuration
// Use environment variable or default to production URL
export const API_URL = import.meta.env.VITE_API_URL || 'https://swiftfiles-api.onrender.com/api';

// Base app URL for generating public share links
export const APP_URL = import.meta.env.VITE_APP_URL || 'https://swiftfiles.netlify.app';

// Log the configuration for debugging
console.log('API Config:', {
  API_URL,
  APP_URL,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_URL: import.meta.env.VITE_APP_URL,
});

// Function to generate shareable links
export const getShareableLink = (shareId: string): string => {
  return `${APP_URL}/share/${shareId}`;
};

// Function to generate download links
export const getDownloadLink = (shareId: string): string => {
  // For direct file download through API
  if (API_URL.includes('render.com')) {
    // Return the API file download endpoint when deployed on Render
    return `${API_URL}/files/download/${shareId}`;
  }
  
  // For sharing through frontend
  return `${APP_URL}/download/${shareId}`;
};

// Helper for making API requests
export const apiRequest = async (
  endpoint: string, 
  method: string = 'GET', 
  data: any = null, 
  token: string | null = null
) => {
  const url = `${API_URL}${endpoint}`;
  
  console.log(`API Request: ${method} ${url}`, { data });
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };
  
  try {
    const response = await fetch(url, config);
    console.log(`API Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error response:', errorData);
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    const responseData = await response.json();
    console.log('API Response data:', responseData);
    return responseData;
  } catch (error) {
    console.error(`API Request failed: ${method} ${url}`, error);
    throw error;
  }
};

// Helper for file uploads
export const uploadFileRequest = async (
  file: File,
  token: string
): Promise<any> => {
  const url = `${API_URL}/files/upload`;
  const formData = new FormData();
  formData.append('file', file);
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
  };
  
  const config: RequestInit = {
    method: 'POST',
    headers,
    body: formData,
  };
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred');
  }
  
  return response.json();
}; 