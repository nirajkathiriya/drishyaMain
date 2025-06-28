import React, { useState } from 'react';
import { Play, ArrowRight, Sparkles, Star, Zap, Crown, Globe, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { useTranslation } from '../../services/i18nService';
import { useAuth } from '../../hooks/useAuth';

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartCreating = () => {
    if (isAuthenticated) {
      navigate('/create');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSeeInAction = () => {
    // Scroll to demo videos section
    const demoSection = document.getElementById('demo-videos');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/create');
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        
        {/* Elegant floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Professional badge with proper colors */}
          <div className="animate-fade-in-up mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 text-purple-300 shadow-lg">
              <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
              <span className="font-semibold">{t('hero.badge')}</span>
              <div className="ml-3 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight text-display animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.headline')}{' '}
            <span className="gradient-text">
              {t('hero.headlineHighlight')}
            </span>
          </h1>
          
          {/* Revolutionary idea-to-video messaging */}
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md border-2 border-yellow-500/40 shadow-2xl">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl mr-4 shadow-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                  We Turn <span className="text-yellow-400">Ideas</span> Into <span className="text-orange-400">Videos</span>
                </div>
                <div className="text-sm text-yellow-200 font-medium">
                  Just share your concept - we handle everything else
                </div>
              </div>
            </div>
          </div>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto text-body animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t('hero.subheadline')}
          </p>
          
          {/* Value proposition with proper colors */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md border border-green-500/30 text-green-300 px-6 py-3 rounded-full">
              <Zap className="h-4 w-4 mr-2 text-green-400" />
              <span className="font-semibold">{t('hero.oneTimeProjects')}</span>
            </div>
            <div className="text-gray-400">•</div>
            <div className="flex items-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full">
              <Crown className="h-4 w-4 mr-2 text-purple-400" />
              <span className="font-semibold">{t('hero.subscriptions')}</span>
            </div>
            <div className="text-gray-400">•</div>
            <div className="flex items-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-500/30 text-blue-300 px-6 py-3 rounded-full">
              <Globe className="h-4 w-4 mr-2 text-blue-400" />
              <span className="font-semibold">{t('hero.enterprise')}</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              size="lg" 
              icon={ArrowRight} 
              iconPosition="right"
              onClick={handleStartCreating}
              className="text-lg px-8 py-4 btn-professional bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {t('hero.startCreating')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              icon={Play} 
              onClick={handleSeeInAction}
              className="text-lg px-8 py-4 glass border-white/20 text-white hover:bg-white/10"
            >
              {t('hero.seeInAction')}
            </Button>
          </div>
          
          {/* Professional stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
            {[
              { number: '5,000+', label: t('hero.videosCreated'), description: t('hero.acrossIndustries') },
              { number: '99.5%', label: t('hero.clientSatisfaction'), description: t('hero.consistentlyRated') },
              { number: '2hrs', label: t('hero.fastestTurnaround'), description: t('hero.urgentProjects') }
            ].map((stat, index) => (
              <div key={index} className="card-professional rounded-2xl p-8 text-center hover-lift">
                <div className="stat-number text-4xl sm:text-5xl font-black mb-2">{stat.number}</div>
                <div className="text-gray-300 font-semibold text-lg mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
          
          {/* Trust indicator */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <p className="text-gray-400 text-sm mb-4">{t('hero.trustedBy')}</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {['Startups', 'Fortune 500', 'Agencies', 'Educators'].map((type, index) => (
                <div key={index} className="text-white font-medium hover:text-purple-400 transition-colors cursor-pointer">
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}