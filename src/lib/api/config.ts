// API Configuration
// Use environment variable or default to production URL
export const API_URL = process.env.REACT_APP_API_URL || 'https://swiftfiles-api.onrender.com/api';

// Base app URL for generating public share links
export const APP_URL = process.env.REACT_APP_URL || 'https://swiftfiles.netlify.app';

// Function to generate shareable links
export const getShareableLink = (shareId: string): string => {
  return `${APP_URL}/share/${shareId}`;
};

// Function to generate download links
export const getDownloadLink = (shareId: string): string => {
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
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred');
  }
  
  return response.json();
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