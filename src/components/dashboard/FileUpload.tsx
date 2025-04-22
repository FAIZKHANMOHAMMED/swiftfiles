import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileUp } from 'lucide-react';
import { uploadFile } from '../../lib/files';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  userId: string;
  onFileUploaded: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ userId, onFileUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateProgress = () => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 95) {
        clearInterval(interval);
        progress = 95; // Hold at 95% until actual upload complete
      }
      setUploadProgress(Math.min(progress, 95));
    }, 300);
    return interval;
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId) return;
    
    setUploading(true);
    const progressInterval = simulateProgress();
    
    try {
      const { metadata, error } = await uploadFile(selectedFile, userId);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (error) {
        toast.error(`Upload failed: ${error}`);
        return;
      }

      toast.success('File uploaded successfully!');
      setSelectedFile(null);
      onFileUploaded();
      
      // Reset progress after a short delay to show 100%
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Something went wrong during upload');
    } finally {
      setTimeout(() => {
        setUploading(false);
      }, 1000);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: uploading,
    maxFiles: 1,
  });

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload a file</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer text-center transition-all ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : selectedFile 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <FileUp size={36} className="text-green-500 mb-2" />
            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
            <p className="text-xs text-gray-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="mt-3 flex items-center text-sm text-red-500 hover:text-red-700"
            >
              <X size={16} className="mr-1" />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload size={36} className={`${isDragActive ? 'text-blue-500' : 'text-gray-400'} mb-2`} />
            <p className="text-sm font-medium text-gray-900">
              {isDragActive ? 'Drop your file here' : 'Drag & drop a file here'}
            </p>
            <p className="text-xs text-gray-500 mt-1">or click to browse</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <>
          {uploading && (
            <div className="w-full mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {!uploading && (
            <button
              onClick={handleUpload}
              className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Upload file
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FileUpload;