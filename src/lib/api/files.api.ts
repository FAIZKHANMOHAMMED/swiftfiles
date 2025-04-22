import { apiRequest, uploadFileRequest } from './config';
import { FileMetadata } from '../files';

// Upload a file
export const uploadFile = async (file: File): Promise<{ metadata: FileMetadata | null; error: string | null }> => {
  try {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return { metadata: null, error: 'Authentication required' };
    }
    
    const response = await uploadFileRequest(file, token);
    return { metadata: response.metadata, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { metadata: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Get files for current user
export const getFilesByUser = async (): Promise<{ files: FileMetadata[]; error: string | null }> => {
  try {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return { files: [], error: 'Authentication required' };
    }
    
    const response = await apiRequest('/files/user', 'GET', null, token);
    return { files: response.files, error: null };
  } catch (error) {
    console.error('Error fetching files:', error);
    return { files: [], error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Get file by share ID
export const getFileByShareId = async (shareId: string): Promise<{ file: FileMetadata | null; error: string | null }> => {
  try {
    const response = await apiRequest(`/files/share/${shareId}`, 'GET');
    return { file: response.file, error: null };
  } catch (error) {
    console.error('Error fetching file:', error);
    return { file: null, error: error instanceof Error ? error.message : 'An error occurred' };
  }
};

// Delete a file
export const deleteFile = async (fileId: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    await apiRequest(`/files/${fileId}`, 'DELETE', null, token);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}; 