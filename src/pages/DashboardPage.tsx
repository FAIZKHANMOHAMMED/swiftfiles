import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/auth';
import { getFilesByUser, FileMetadata } from '../lib/files';
import FileUpload from '../components/dashboard/FileUpload';
import FileList from '../components/dashboard/FileList';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          await fetchFiles(currentUser.id);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication error');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchFiles = async (userId: string) => {
    try {
      const { files, error } = await getFilesByUser(userId);
      
      if (error) {
        toast.error(`Error fetching files: ${error}`);
        return;
      }
      
      setFiles(files);
    } catch (error) {
      console.error('Fetch files error:', error);
      toast.error('Failed to load your files');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
          <p className="text-gray-600 mt-1">Upload and manage your files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <FileUpload 
              userId={user.id} 
              onFileUploaded={() => fetchFiles(user.id)}
            />
          </div>
          
          <div className="lg:col-span-2">
            <FileList 
              files={files} 
              userId={user.id}
              onFileDeleted={() => fetchFiles(user.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;