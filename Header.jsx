import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/home-dashboard', 
      icon: 'Home',
      description: 'Weather overview and quick tool access'
    },
    { 
      label: 'Water Calculator', 
      path: '/water-calculator', 
      icon: 'Droplets',
      description: 'Calculate irrigation requirements'
    },
    { 
      label: 'Seed Estimator', 
      path: '/seed-worker-estimator', 
      icon: 'Calculator',
      description: 'Estimate seeds and workers needed'
    },
    { 
      label: 'Farming Tips', 
      path: '/farming-tips', 
      icon: 'BookOpen',
      description: 'Expert agricultural guidance'
    },
    { 
      label: 'Gallery', 
      path: '/gallery', 
      icon: 'Images',
      description: 'Crop and farming inspiration'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/home-dashboard" 
              className="flex items-center space-x-2 transition-agricultural hover:opacity-80"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Sprout" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">
                AgriMate
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-agricultural touch-target ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.description}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </a>
            ))}
          </nav>

          {/* User Authentication & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            {/* User Authentication Indicator */}
            <div className="hidden sm:flex items-center">
              <Button
                variant="ghost"
                size="sm"
                iconName="User"
                iconPosition="left"
                onClick={() => window.location.href = '/login'}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden touch-target"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-agricultural touch-target ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <div className="flex-1">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs opacity-75">{item?.description}</div>
                  </div>
                </a>
              ))}
              
              {/* Mobile Sign In */}
              <div className="pt-2 mt-2 border-t border-border">
                <a
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-agricultural touch-target"
                >
                  <Icon name="User" size={20} />
                  <span>Sign In</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Header;