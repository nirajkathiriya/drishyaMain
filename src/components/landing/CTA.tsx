import React, { useState } from 'react';
import { ArrowRight, Sparkles, Zap, Crown, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { useTranslation } from '../../services/i18nService';
import { useAuth } from '../../hooks/useAuth';

export function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handleCreateOneVideo = () => {
    if (isAuthenticated) {
      navigate('/create', { state: { selectedPlan: 'basic' } });
    } else {
      setSelectedPlan('basic');
      setShowAuthModal(true);
    }
  };

  const handleStartSubscription = () => {
    if (isAuthenticated) {
      navigate('/create', { state: { selectedPlan: 'starter' } });
    } else {
      setSelectedPlan('starter');
      setShowAuthModal(true);
    }
  };

  const handleContactSales = () => {
    // Scroll to pricing section to open enterprise contact form
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger enterprise contact form after scroll
      setTimeout(() => {
        const enterpriseButton = document.querySelector('[data-plan="enterprise"]') as HTMLButtonElement;
        if (enterpriseButton) {
          enterpriseButton.click();
        }
      }, 1000);
    }
  };

  const handleChoosePlan = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (selectedPlan) {
      navigate('/create', { state: { selectedPlan } });
    }
  };

  return (
    <>
      <section className="space-section cta-gradient relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge with proper colors */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md border border-yellow-500/30 text-yellow-300 shadow-lg mb-8">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
            <span className="font-semibold">Ready to Transform Your Communication?</span>
          </div>
          
          {/* Main headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight text-display">
            Start Your{' '}
            <span className="gradient-text">
              Video Journey
            </span>
            {' '}Today
          </h2>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto text-body">
            Join thousands of businesses creating professional AI videos that engage, educate, and convert. 
            Choose your perfect plan and start creating today.
          </p>
          
          {/* CTA Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* One-time project */}
            <div className="card-professional rounded-2xl p-8 hover-lift">
              <div className="feature-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Try It Once</h3>
              <p className="text-gray-300 mb-6">Perfect for testing our platform with a single video project.</p>
              <div className="text-3xl font-black text-green-400 mb-4">$15</div>
              <Button 
                size="lg" 
                onClick={handleCreateOneVideo}
                className="w-full btn-professional bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Create One Video
              </Button>
            </div>
            
            {/* Subscription */}
            <div className="card-professional rounded-2xl p-8 hover-lift relative border-purple-500/30">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              </div>
              <div className="feature-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500">
                <Crown className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Subscribe & Save</h3>
              <p className="text-gray-300 mb-6">2 videos every week for consistent content creation.</p>
              <div className="text-3xl font-black text-green-400 mb-4">$100/mo</div>
              <Button 
                size="lg" 
                onClick={handleStartSubscription}
                className="w-full btn-professional bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Subscription
              </Button>
            </div>
            
            {/* Enterprise */}
            <div className="card-professional rounded-2xl p-8 hover-lift">
              <div className="feature-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-red-500">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <p className="text-gray-300 mb-6">Custom solutions for large teams and complex requirements.</p>
              <div className="text-2xl font-bold text-white mb-4">Let's Talk</div>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleContactSales}
                className="w-full glass border-white/20 text-white hover:bg-white/10"
                data-plan="enterprise"
              >
                Contact Sales
              </Button>
            </div>
          </div>
          
          {/* Trust indicators with proper colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { icon: Zap, text: '5,000+ Videos Created', color: 'from-yellow-400 to-orange-500' },
              { icon: Crown, text: '99.5% Client Satisfaction', color: 'from-purple-400 to-pink-500' },
              { icon: Sparkles, text: '2-Hour Rush Delivery', color: 'from-blue-400 to-cyan-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                <div className={`feature-icon w-12 h-12 bg-gradient-to-r ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-white font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          
          {/* Final CTA */}
          <div className="card-professional rounded-2xl p-8 border-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-green-300 mb-6">
              No contracts, no hidden fees. Start with a single video or choose a plan that grows with you.
            </p>
            <Button 
              size="lg" 
              icon={ArrowRight} 
              iconPosition="right"
              onClick={handleChoosePlan}
              className="btn-professional bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xl px-12 py-4"
            >
              Choose Your Plan
            </Button>
          </div>
        </div>
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