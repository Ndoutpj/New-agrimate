import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';
import SecurityIndicator from './components/SecurityIndicator';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/home-dashboard');
    }

    // Set page title
    document.title = 'Login - AgriMate | Smart Farming Assistant';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Background Elements */}
      <LoginBackground />
      {/* Main Content */}
      <main className="relative pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-8rem)] gap-12">
            
            {/* Welcome Section - Hidden on mobile */}
            <div className="hidden lg:flex flex-col items-start max-w-lg">
              <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                  Smart Farming Made Simple
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Join thousands of farmers using AgriMate to optimize their agricultural practices with intelligent tools and expert guidance.
                </p>
                
                {/* Feature Highlights */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Water requirement calculations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Seed and worker estimations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Expert farming tips and guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <span className="text-foreground">Weather-based recommendations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Form Section */}
            <div className="w-full max-w-md">
              <LoginForm />
              
              {/* Security Indicator - Only on desktop */}
              <div className="hidden lg:block">
                <SecurityIndicator />
              </div>
            </div>
          </div>

          {/* Mobile Security Info */}
          <div className="lg:hidden mt-8">
            <SecurityIndicator />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} AgriMate. All rights reserved. | 
            <button className="ml-1 text-primary hover:text-primary/80 transition-agricultural">
              Privacy Policy
            </button> | 
            <button className="ml-1 text-primary hover:text-primary/80 transition-agricultural">
              Terms of Service
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;