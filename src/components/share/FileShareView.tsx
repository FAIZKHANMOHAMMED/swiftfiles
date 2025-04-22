import React, { useState } from 'react';
import { Download, File, FileText, Image, Film, Music, Archive, FilePlus, Eye } from 'lucide-react';
import { FileMetadata } from '../../lib/files';

interface FileShareViewProps {
  file: FileMetadata;
}

const FileShareView: React.FC<FileShareViewProps> = ({ file }) => {
  const [downloading, setDownloading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const getFileIcon = () => {
    const type = file.type.toLowerCase();
    
    if (type.includes('image')) {
      return <Image size={64} className="text-blue-500" />;
    } else if (type.includes('pdf')) {
      return <FileText size={64} className="text-red-500" />;
    } else if (type.includes('video')) {
      return <Film size={64} className="text-purple-500" />;
    } else if (type.includes('audio')) {
      return <Music size={64} className="text-green-500" />;
    } else if (type.includes('zip') || type.includes('rar') || type.includes('tar') || type.includes('7z')) {
      return <Archive size={64} className="text-amber-500" />;
    } else if (type.includes('text') || type.includes('document')) {
      return <FileText size={64} className="text-gray-500" />;
    } else {
      return <FilePlus size={64} className="text-gray-400" />;
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = file.url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Simulate some delay before resetting the button state
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
  };

  // For preview-capable file types (images, pdfs, etc.)
  const canPreview = () => {
    const type = file.type.toLowerCase();
    return type.includes('image') || type.includes('pdf') || type.includes('text');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all transform hover:shadow-lg">
      <div className="p-8">
        <div className="flex flex-col items-center text-center mb-6">
          {getFileIcon()}
          <h1 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">{file.name}</h1>
          <div className="mt-2 text-sm text-gray-500 flex flex-wrap justify-center">
            <span className="px-2">{formatFileSize(file.size)}</span>
            <span className="px-2">•</span>
            <span className="px-2">{file.type}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`${
              downloading
                ? 'bg-green-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } flex-1 flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {downloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
              </>
            ) : (
              <>
                <Download size={20} className="mr-2" />
                Download File
              </>
            )}
          </button>

          {canPreview() && (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Eye size={20} className="mr-2" />
              Preview File
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

export default FileShareView;