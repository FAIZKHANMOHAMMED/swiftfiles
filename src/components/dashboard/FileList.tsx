import React, { useEffect, useState } from 'react';
import { getFilesByUser } from '../../lib/files';
import { FileMetadata } from '../../lib/files';
import FileListItem from './FileListItem';
import { toast } from 'react-hot-toast';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  // Fetch files from the API
  const fetchFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const { files, error } = await getFilesByUser();
      
      if (error) {
        setError(error);
        return;
      }
      
      setFiles(files);
    } catch (error) {
      setError('Failed to fetch files');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file deletion
  const handleFileDeleted = (fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        <p>{error}</p>
        <button 
          onClick={fetchFiles}
          className="mt-2 text-sm font-medium text-red-700 hover:text-red-500"
        >
          Try again
        </button>
      </div>
    );
  }

  // Render empty state
  if (files.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No files yet</h3>
        <p className="text-gray-500 mb-4">
          Upload your first file to see it here.
        </p>
      </div>
    );
  }

  // Render file list
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Files</h2>
      <div className="space-y-3">
        {files.map(file => (
          <FileListItem 
            key={file.id} 
            file={file} 
            onDelete={handleFileDeleted} 
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;