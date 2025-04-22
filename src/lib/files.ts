import { 
  uploadFile as uploadFileApi, 
  getFilesByUser as getFilesByUserApi, 
  getFileByShareId as getFileByShareIdApi, 
  deleteFile as deleteFileApi 
} from './api/files.api';

export type FileMetadata = {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: string;
  owner_id: string;
  url: string;
  share_id: string;
  share_url?: string;
};

// Export file operations connected to the API
export const uploadFile = uploadFileApi;
export const getFilesByUser = getFilesByUserApi;
export const getFileByShareId = getFileByShareIdApi;
export const deleteFile = deleteFileApi;