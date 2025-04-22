import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFileByShareId } from '../lib/files';
import { API_URL } from '../lib/api/config';

const DownloadRedirect: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initiateDownload = async () => {
      if (!shareId) {
        setError('Invalid share link');
        return;
      }

      try {
        // First, get file metadata to check if it exists
        const { file, error } = await getFileByShareId(shareId);
        
        if (error || !file) {
          setError(error || 'File not found');
          return;
        }

        // Build the direct download URL
        let downloadUrl = '';
        
        if (API_URL.includes('render.com')) {
          // When on Render, use the API endpoint
          downloadUrl = `${API_URL}/files/download/${shareId}`;
        } else {
          // In other environments, use the file's direct URL
          downloadUrl = file.url;
        }

        // Trigger the download
        console.log('Redirecting to download URL:', downloadUrl);
        window.location.href = downloadUrl;
      } catch (error) {
        console.error('Download error:', error);
        setError('Failed to initiate download');
      }
    };

    initiateDownload();
  }, [shareId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Download Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Preparing Download</h2>
        <p className="text-gray-600">Your download should begin automatically. If it doesn't, please wait a moment.</p>
      </div>
    </div>
  );
};

export default DownloadRedirect; 