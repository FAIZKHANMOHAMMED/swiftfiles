import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { User } from './lib/auth'; // Import User type from our auth

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SharePage from './pages/SharePage';
import DownloadRedirect from './pages/DownloadRedirect';

// Components
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

// Services
import { getCurrentUser, onAuthStateChange } from './lib/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to manually check for redirect after login
  const checkForRedirect = () => {
    if (sessionStorage.getItem('redirect_after_login') === 'true' && user) {
      console.log('Found redirect flag, user is logged in');
      sessionStorage.removeItem('redirect_after_login');
      return true;
    }
    return false;
  };

  useEffect(() => {
    console.log('App useEffect - Setting up auth state management');
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log('Initial auth check result:', currentUser);
        setUser(currentUser);
        
        // Check if we should force a redirect to dashboard
        if (currentUser && sessionStorage.getItem('redirect_after_login') === 'true') {
          console.log('User is logged in and redirect flag is set');
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const authListener = onAuthStateChange((authUser) => {
      console.log('Auth state changed:', authUser);
      setUser(authUser);
      setLoading(false);
      
      // Check if we should redirect after auth state change
      if (authUser && sessionStorage.getItem('redirect_after_login') === 'true') {
        console.log('Auth state changed and redirect flag is set');
        sessionStorage.removeItem('redirect_after_login');
        window.location.href = '/dashboard';
      }
    });

    return () => {
      console.log('Cleaning up auth listener');
      authListener.unsubscribe();
    };
  }, []);

  // Routes that require authentication
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Instantly show content if we're redirecting after login
    if (checkForRedirect()) {
      return <>{children}</>;
    }
    
    // Show loading indicator while checking auth
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      );
    }
    
    // If not logged in, redirect to login
    if (!user) {
      console.log('User not authenticated, redirecting to login');
      return <Navigate to="/login" replace />;
    }
    
    // If logged in, show children
    console.log('User authenticated, showing protected content');
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={!!user} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={
              user ? <Navigate to="/dashboard" replace /> : <LoginPage />
            } />
            <Route path="/signup" element={
              user ? <Navigate to="/dashboard" replace /> : <SignupPage />
            } />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/share/:shareId" element={<SharePage />} />
            <Route path="/download/:shareId" element={<DownloadRedirect />} />
          </Routes>
        </main>
        
        <Footer />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FFFFFF',
              color: '#333333',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;