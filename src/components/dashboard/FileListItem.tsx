import React, { useState } from 'react';
import { FileMetadata } from '../../lib/files';
import { deleteFile } from '../../lib/api/files.api';
import { toast } from 'react-hot-toast';
import { Trash2, Share2, Download, Copy, Check } from 'lucide-react';
import { getShareableLink, getDownloadLink } from '../../lib/api/config';

interface FileListItemProps {
  file: FileMetadata;
  onDelete: (fileId: string) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({ file, onDelete }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Format date to human-readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle file deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        const { success, error } = await deleteFile(file.id);
        
        if (success) {
          toast.success('File deleted successfully');
          onDelete(file.id);
        } else if (error) {
          toast.error(error);
        }
      } catch (error) {
        toast.error('Failed to delete file');
        console.error(error);
      }
    }
  };
  
  // Generate shareable links
  const shareUrl = getShareableLink(file.share_id);
  const downloadUrl = getDownloadLink(file.share_id);
  
  // Copy share link to clipboard
  const copyShareLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Download link copied to clipboard');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {file.type.startsWith('image/') ? (
              <img 
                src={file.url} 
                alt={file.name} 
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-500 font-bold text-sm">
                  {file.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <a 
              href={file.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-gray-800 hover:text-blue-600 truncate max-w-xs md:max-w-sm"
            >
              {file.name}
            </a>
            <div className="text-xs text-gray-500 space-x-2">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>{formatDate(file.created_at)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
              aria-label="Share file"
            >
              <Share2 size={18} />
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Share this file</h3>
                  <div className="mb-2">
                    <a
                      href={downloadUrl}
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition"
                      download
                    >
                      <Download size={16} />
                      <span>Download directly</span>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 border rounded-md overflow-hidden">
                      <div className="p-2 text-xs bg-gray-50 truncate">
                        {downloadUrl}
                      </div>
                    </div>
                    <button
                      onClick={copyShareLink}
                      className="ml-2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                      aria-label="Copy share link"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Anyone with this link can download the file.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
            aria-label="Delete file"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileListItem; 