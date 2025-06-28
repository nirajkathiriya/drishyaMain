import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSelector } from '../ui/LanguageSelector';
import { AuthModal } from '../auth/AuthModal';
import { useTranslation } from '../../services/i18nService';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/create');
    } else {
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/create');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black gradient-text">
                  Drishya
                </span>
                <span className="text-xs text-gray-400 font-medium -mt-1">AI Video Platform</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`nav-link text-sm font-semibold transition-colors ${isActive('/') ? 'text-purple-400 active' : 'text-gray-300 hover:text-white'}`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/create" 
                className={`nav-link text-sm font-semibold transition-colors ${isActive('/create') ? 'text-purple-400 active' : 'text-gray-300 hover:text-white'}`}
              >
                {t('nav.createVideo')}
              </Link>
              <Link 
                to="/orders" 
                className={`nav-link text-sm font-semibold transition-colors ${isActive('/orders') ? 'text-purple-400 active' : 'text-gray-300 hover:text-white'}`}
              >
                {t('nav.myOrders')}
              </Link>
              <Link 
                to="/admin" 
                className={`nav-link text-sm font-semibold transition-colors ${isActive('/admin') ? 'text-purple-400 active' : 'text-gray-300 hover:text-white'}`}
              >
                {t('nav.admin')}
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 glass hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">{user?.name}</div>
                      <div className="text-xs text-gray-400">{user?.email}</div>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 glass-dark rounded-xl shadow-2xl border border-white/20 py-2 z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/create"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        Create Video
                      </Link>
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    onClick={handleSignIn}
                    className="glass hover:bg-white/10 text-white" 
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleGetStarted}
                    className="btn-professional bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {t('nav.getStarted')}
                  </Button>
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass border-b border-white/10 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/create" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {t('nav.createVideo')}
              </Link>
              <Link 
                to="/orders" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {t('nav.myOrders')}
              </Link>
              <Link 
                to="/admin" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {t('nav.admin')}
              </Link>
              <div className="pt-2">
                <div className="mb-4 px-4">
                  <LanguageSelector />
                </div>
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 bg-white/5 rounded-lg">
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <Button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                      variant="outline"
                      className="w-full glass border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignIn();
                      }}
                      variant="outline"
                      className="w-full glass border-white/20 text-white hover:bg-white/10"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleGetStarted();
                      }}
                      className="w-full btn-professional bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      {t('nav.getStarted')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}