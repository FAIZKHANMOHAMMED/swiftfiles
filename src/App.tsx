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

// Components
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

// Services
import { getCurrentUser, onAuthStateChange } from './lib/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const authListener = onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false); // Update loading state when auth state changes
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  // Routes that require authentication
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    
    // If not logged in, redirect to login
    if (!user) return <Navigate to="/login" replace />;
    
    // If logged in, show children
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