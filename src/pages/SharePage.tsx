import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFileByShareId } from '../lib/files';
import { FileMetadata } from '../lib/files';
import { Download, FileIcon, AlertTriangle } from 'lucide-react';
import { getDownloadLink } from '../lib/api/config';

const SharePage: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [file, setFile] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (!shareId) {
        setError('Invalid share link');
        setLoading(false);
        return;
      }

      try {
        const { file, error } = await getFileByShareId(shareId);
        
        if (error) {
          setError(error);
          return;
        }
        
        setFile(file);
      } catch (error) {
        setError('Failed to fetch file');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [shareId]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-2">File Not Available</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The file you are looking for could not be found. It may have been deleted or the link is invalid.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const downloadUrl = getDownloadLink(file.share_id);
  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';
  const isText = file.type.startsWith('text/');
  const isViewable = isImage || isPDF || isText;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <FileIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{file.name}</h1>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
        </div>
        
        {isImage && (
          <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={file.url} 
              alt={file.name} 
              className="w-full h-auto max-h-96 object-contain bg-gray-50"
            />
          </div>
        )}
        
        <div className="flex space-x-4">
          <a
            href={downloadUrl}
            download
            className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Download size={20} className="mr-2" />
            Download File
          </a>
          
          {isViewable && (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FileIcon size={20} className="mr-2" />
              View File
            </a>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>This is a secure file share link. No sign-up required to download.</p>
            <p className="mt-1">Want to share your own files? <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Create an account</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;