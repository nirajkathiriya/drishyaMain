import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Rocket, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { pricingPlans } from '../../data/mockData';
import { useTranslation } from '../../services/i18nService';
import { useAuth } from '../../hooks/useAuth';

export function Pricing() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    useCase: '',
    message: ''
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const planIcons = [Zap, Crown, Rocket];
  const planColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500'
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enterprise contact form:', contactForm);
    alert('Thank you! Our enterprise team will contact you within 24 hours.');
    setShowContactForm(false);
    setContactForm({ name: '', email: '', company: '', teamSize: '', useCase: '', message: '' });
  };

  const handlePlanSelect = (planType: string) => {
    if (planType === 'enterprise') {
      setShowContactForm(true);
    } else {
      if (isAuthenticated) {
        // Navigate to create project page with plan pre-selected
        navigate('/create', { state: { selectedPlan: planType } });
      } else {
        // Show auth modal first
        setSelectedPlan(planType);
        setShowAuthModal(true);
      }
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (selectedPlan) {
      navigate('/create', { state: { selectedPlan } });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="pricing" className="space-section bg-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 text-purple-300 shadow-lg mb-6">
              <Star className="h-4 w-4 mr-2 text-purple-400" fill="currentColor" />
              <span className="font-semibold">{t('pricing.flexiblePricing')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 text-display">
              {t('pricing.chooseYourPlan')}{' '}
              <span className="gradient-text">
                {t('pricing.perfectPlan')}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-body">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {pricingPlans.map((plan, index) => {
              const IconComponent = planIcons[index];
              const isPopular = index === 1;
              const isEnterprise = plan.type === 'enterprise';
              
              return (
                <Card 
                  key={plan.id} 
                  className={`pricing-card relative ${
                    isPopular ? 'featured scale-105' : ''
                  } rounded-2xl overflow-hidden`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
                        <Crown className="h-4 w-4" fill="currentColor" />
                        <span>{t('pricing.starter.popular')}</span>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className={`feature-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${planColors[index]}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{t(`pricing.${plan.id}.name`)}</h3>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {isEnterprise ? (
                        <div className="text-center">
                          <div className="text-3xl font-black text-white">{t(`pricing.${plan.id}.price`)}</div>
                          <div className="text-sm text-gray-400">{t(`pricing.${plan.id}.description`)}</div>
                        </div>
                      ) : (
                        <>
                          <span className="text-5xl font-black text-white">${plan.price}</span>
                          <div className="text-left">
                            <div className="text-sm text-gray-400">
                              {t(`pricing.${plan.id}.description`)}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 inline-block">
                      <p className="text-sm text-gray-300 font-medium">
                        {t(`pricing.${plan.id}.delivery`)}
                      </p>
                    </div>
                    
                    {plan.type === 'subscription' && (
                      <div className="mt-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md border border-green-500/30 rounded-lg p-3">
                        <p className="text-sm text-green-300 font-semibold">
                          {t(`pricing.${plan.id}.monthlyVideos`)}
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-green-400" />
                          </div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full py-3 btn-professional ${
                        isPopular 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : isEnterprise
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                          : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                      }`}
                      size="lg"
                      icon={isEnterprise ? Mail : ArrowRight}
                      iconPosition="right"
                    >
                      {isEnterprise 
                        ? t('pricing.contactSales')
                        : plan.type === 'subscription' 
                        ? t('pricing.startSubscription') 
                        : t('pricing.createVideo')
                      }
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Use cases section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Perfect for Every Business Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: 'Startups & SMBs', plan: 'Basic', description: 'Perfect for occasional video needs and testing the waters' },
                { type: 'Growing Teams', plan: 'Starter', description: 'Ideal for regular content creation and team collaboration' },
                { type: 'Large Organizations', plan: 'Enterprise', description: 'Custom solutions for complex requirements and high volume' }
              ].map((item, index) => (
                <div key={index} className="card-professional text-center rounded-xl p-6">
                  <h4 className="font-bold text-white mb-2">{item.type}</h4>
                  <div className="text-purple-400 font-semibold mb-2">{item.plan} Plan</div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enterprise Contact Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-dark rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Enterprise Contact</h3>
                <button 
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="form-input w-full px-4 py-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="form-input w-full px-4 py-3 rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      className="form-input w-full px-4 py-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Team Size</label>
                    <select
                      value={contactForm.teamSize}
                      onChange={(e) => setContactForm({...contactForm, teamSize: e.target.value})}
                      className="form-input w-full px-4 py-3 rounded-lg"
                    >
                      <option value="">Select team size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Primary Use Case</label>
                  <select
                    value={contactForm.useCase}
                    onChange={(e) => setContactForm({...contactForm, useCase: e.target.value})}
                    className="form-input w-full px-4 py-3 rounded-lg"
                  >
                    <option value="">Select primary use case</option>
                    <option value="training">Employee Training</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="internal">Internal Communications</option>
                    <option value="customer">Customer Education</option>
                    <option value="product">Product Demos</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Tell us about your video creation needs, expected volume, and any specific requirements..."
                    className="form-input w-full px-4 py-3 rounded-lg resize-none"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit" size="lg" className="flex-1 btn-professional bg-gradient-to-r from-purple-600 to-blue-600">
                    Send Message
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setShowContactForm(false)}
                    className="glass border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
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