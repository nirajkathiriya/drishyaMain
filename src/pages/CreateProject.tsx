import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Save, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { AuthModal } from '../components/auth/AuthModal';
import { VideoTypeSelector } from '../components/creator/VideoTypeSelector';
import { ToneSelector } from '../components/creator/ToneSelector';
import { AvatarSelector } from '../components/creator/AvatarSelector';
import { ScriptUpload } from '../components/creator/ScriptUpload';
import { FileUploadNotes } from '../components/creator/FileUploadNotes';
import { PlanSelector } from '../components/creator/PlanSelector';
import { OrderSummaryModal } from '../components/creator/OrderSummaryModal';
import { Avatar, PricingPlan } from '../types';
import { EmailService, OrderConfirmation } from '../services/emailService';
import { useAuth } from '../hooks/useAuth';

export function CreateProject() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [formData, setFormData] = useState({
    type: '',
    orientation: '',
    tone: '',
    avatar: null as Avatar | null,
    script: '',
    needsScriptHelp: false,
    scriptRequirements: {
      targetAudience: '',
      keyMessages: '',
      duration: '',
      brandGuidelines: ''
    },
    attachedFiles: [] as File[],
    instructions: '',
    additionalNotes: '',
    plan: null as PricingPlan | null,
    customerEmail: '',
    customerName: ''
  });

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        customerEmail: user.email,
        customerName: user.name
      }));
    }
  }, [isAuthenticated, user]);

  // Pre-select plan if coming from pricing section
  useEffect(() => {
    if (location.state?.selectedPlan) {
      const selectedPlanId = location.state.selectedPlan;
      setFormData(prev => ({ ...prev, plan: { id: selectedPlanId } as PricingPlan }));
      setCurrentStep(6);
    }
  }, [location.state]);

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.type || formData.tone || formData.script) {
        localStorage.setItem('drishya-video-draft', JSON.stringify(formData));
        setSavedDraft(true);
        setTimeout(() => setSavedDraft(false), 2000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [formData]);

  const steps = [
    { number: 1, title: 'Video Type', description: 'Choose your video category & orientation' },
    { number: 2, title: 'Tone', description: 'Select the right tone & style' },
    { number: 3, title: 'Avatar', description: 'Pick your AI presenter' },
    { number: 4, title: 'Script', description: 'Upload script or get professional help' },
    { number: 5, title: 'Resources', description: 'Upload files and add instructions' },
    { number: 6, title: 'Plan', description: 'Choose your package' },
    { number: 7, title: 'Review', description: 'Confirm and submit order' }
  ];

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: 
        return formData.type !== '' && formData.orientation !== '';
      case 2: 
        return formData.tone !== '';
      case 3: 
        return formData.avatar !== null;
      case 4: 
        return formData.script.trim() !== '' || (formData.needsScriptHelp && formData.scriptRequirements.targetAudience.trim() !== '' && formData.scriptRequirements.keyMessages.trim() !== '');
      case 5: 
        return true; // Files and notes are optional
      case 6: 
        return formData.plan !== null;
      case 7: 
        return formData.customerEmail !== '' && formData.customerName !== '';
      default: 
        return false;
    }
  };

  const canProceed = () => {
    return isStepComplete(currentStep);
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSaveDraft = () => {
    localStorage.setItem('drishya-video-draft', JSON.stringify(formData));
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  // Form data update handlers
  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const calculateTotalPrice = () => {
    let total = formData.plan?.price || 0;
    if (formData.needsScriptHelp && formData.plan?.id === 'basic') {
      total += 8; // Script writing service
    }
    return total;
  };

  const handleOrderSubmit = async () => {
    if (!formData.plan || !formData.avatar) return;
    
    setIsSubmitting(true);
    
    try {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      
      const orderData: OrderConfirmation = {
        orderId: newOrderId,
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        videoType: formData.type,
        plan: {
          name: formData.plan.name,
          price: calculateTotalPrice(),
          deliveryDays: formData.plan.deliveryDays
        },
        avatar: {
          name: formData.avatar.name
        },
        estimatedDelivery: new Date(Date.now() + formData.plan.deliveryDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        orderTotal: calculateTotalPrice()
      };
      
      const emailService = EmailService.getInstance();
      await emailService.sendOrderConfirmation(orderData);
      
      // Clear draft
      localStorage.removeItem('drishya-video-draft');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="card-professional text-center rounded-2xl">
            <CardContent className="p-12">
              <div className="mb-8">
                <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed! 🎉</h1>
                <p className="text-xl text-gray-300 mb-6">
                  Thank you for choosing Drishya. Your professional AI video is now in production!
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">Order Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-sm font-medium text-gray-400">Order ID</span>
                    <p className="text-lg font-semibold text-purple-400">{orderId}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">Video Type</span>
                    <p className="text-lg font-semibold text-white capitalize">{formData.type.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">Orientation</span>
                    <p className="text-lg font-semibold text-white capitalize">{formData.orientation}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">Avatar</span>
                    <p className="text-lg font-semibold text-white">{formData.avatar?.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">Estimated Delivery</span>
                    <p className="text-lg font-semibold text-white">
                      {formData.plan ? new Date(Date.now() + formData.plan.deliveryDays * 24 * 60 * 60 * 1000).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">Total Paid</span>
                    <p className="text-lg font-semibold text-green-400">${calculateTotalPrice()}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-white">What happens next?</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-medium text-white">Script Review</div>
                    <div className="text-gray-400">24-48 hours</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl mb-2">🎬</div>
                    <div className="font-medium text-white">AI Generation</div>
                    <div className="text-gray-400">1-2 days</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl mb-2">✂️</div>
                    <div className="font-medium text-white">Professional Edit</div>
                    <div className="text-gray-400">1-2 days</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="text-2xl mb-2">✨</div>
                    <div className="font-medium text-white">Final Delivery</div>
                    <div className="text-gray-400">{formData.plan?.deliveryDays} days total</div>
                  </div>
                </div>
              </div>
              
              <div className="space-x-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/orders')}
                  className="btn-professional bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Track Your Order
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/')}
                  className="glass border-white/20 text-white hover:bg-white/10"
                >
                  Create Another Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VideoTypeSelector
            selectedType={formData.type}
            selectedOrientation={formData.orientation}
            onTypeChange={(type) => updateFormData({ type })}
            onOrientationChange={(orientation) => updateFormData({ orientation })}
          />
        );
      case 2:
        return (
          <ToneSelector
            selectedTone={formData.tone}
            onToneChange={(tone) => updateFormData({ tone })}
          />
        );
      case 3:
        return (
          <AvatarSelector
            selectedAvatar={formData.avatar}
            onAvatarChange={(avatar) => updateFormData({ avatar })}
          />
        );
      case 4:
        return (
          <ScriptUpload
            script={formData.script}
            needsScriptHelp={formData.needsScriptHelp}
            scriptRequirements={formData.scriptRequirements}
            onScriptChange={(script) => updateFormData({ script })}
            onNeedsHelpChange={(needsScriptHelp) => updateFormData({ needsScriptHelp })}
            onRequirementsChange={(scriptRequirements) => updateFormData({ scriptRequirements })}
          />
        );
      case 5:
        return (
          <FileUploadNotes
            files={formData.attachedFiles}
            notes={formData.additionalNotes}
            instructions={formData.instructions}
            onFilesChange={(attachedFiles) => updateFormData({ attachedFiles })}
            onNotesChange={(additionalNotes) => updateFormData({ additionalNotes })}
            onInstructionsChange={(instructions) => updateFormData({ instructions })}
          />
        );
      case 6:
        return (
          <PlanSelector
            selectedPlan={formData.plan}
            onPlanChange={(plan) => updateFormData({ plan })}
          />
        );
      case 7:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Final Review</h3>
              <p className="text-gray-400">Review all your selections and confirm your order.</p>
            </div>
            
            {/* Order Summary */}
            <Card className="card-professional rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <h4 className="text-xl font-bold text-white">Complete Order Summary</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-400">Video Type</span>
                      <p className="text-white font-medium capitalize">{formData.type.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Orientation</span>
                      <p className="text-white font-medium capitalize">{formData.orientation}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Tone</span>
                      <p className="text-white font-medium capitalize">{formData.tone}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Avatar</span>
                      <p className="text-white font-medium">{formData.avatar?.name}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-400">Plan</span>
                      <p className="text-white font-medium">{formData.plan?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Script Service</span>
                      <p className="text-white font-medium">
                        {formData.needsScriptHelp ? 'Professional Writing (+$8)' : 'Your Own Script'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Files Attached</span>
                      <p className="text-white font-medium">{formData.attachedFiles.length} files</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Delivery</span>
                      <p className="text-white font-medium">{formData.plan?.deliveryDays} days</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-bold text-white">Total Amount</span>
                    <span className="font-black text-green-400">${calculateTotalPrice()}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Includes all selected features and services
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500" required />
                <div className="text-sm text-gray-300">
                  I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms & Conditions</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>. 
                  I understand that my video will be created according to the specifications above and delivered within the stated timeframe.
                </div>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                icon={Home} 
                onClick={handleBackToHome}
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                Back to Home
              </Button>
              
              <div className="flex items-center space-x-4">
                {savedDraft && (
                  <div className="text-sm text-green-400 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Draft saved
                  </div>
                )}
                <Button 
                  variant="outline" 
                  icon={Save} 
                  onClick={handleSaveDraft}
                  className="glass border-white/20 text-white hover:bg-white/10"
                >
                  Save Draft
                </Button>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Create Your Professional{' '}
              <span className="gradient-text">AI Video</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow these simple steps to create a professional marketing video. 
              We'll guide you through each step to ensure your video perfectly matches your vision.
            </p>
          </div>
          
          {/* Progress Steps */}
          <Card className="mb-8 card-professional rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between overflow-x-auto">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center min-w-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep === step.number
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110'
                          : isStepComplete(step.number)
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {isStepComplete(step.number) && currentStep !== step.number ? '✓' : step.number}
                      </div>
                      <div className="mt-3 text-center">
                        <div className={`text-sm font-semibold ${currentStep === step.number ? 'text-purple-400' : 'text-white'}`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-400 max-w-24">{step.description}</div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-6 rounded transition-all duration-300 min-w-8 ${
                        isStepComplete(step.number) ? 'bg-green-500' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Step Content */}
          <Card className="mb-8 card-professional rounded-2xl">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              icon={ArrowLeft}
              size="lg"
              className="glass border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">
                Step {currentStep} of {steps.length}
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>
            
            <Button
              onClick={currentStep === 7 ? () => setShowSummaryModal(true) : handleNext}
              disabled={!canProceed() || isSubmitting}
              icon={currentStep === 7 ? undefined : ArrowRight}
              iconPosition="right"
              size="lg"
              className={`btn-professional ${
                currentStep === 7 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Processing Order...' : currentStep === 7 ? `Complete Order ($${calculateTotalPrice()})` : 'Next Step'}
            </Button>
          </div>
          
          {/* Debug Panel */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Debug Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400">
              <div>
                <strong>Current Step:</strong> {currentStep}<br/>
                <strong>Can Proceed:</strong> {canProceed() ? 'Yes' : 'No'}<br/>
                <strong>Step Complete:</strong> {isStepComplete(currentStep) ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Type:</strong> {formData.type || 'None'}<br/>
                <strong>Orientation:</strong> {formData.orientation || 'None'}<br/>
                <strong>Tone:</strong> {formData.tone || 'None'}
              </div>
              <div>
                <strong>Avatar:</strong> {formData.avatar?.name || 'None'}<br/>
                <strong>Script:</strong> {formData.script.length} chars<br/>
                <strong>Plan:</strong> {formData.plan?.name || 'None'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
        onSuccess={handleAuthSuccess}
      />

      <OrderSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onConfirm={handleOrderSubmit}
        data={{
          type: formData.type,
          orientation: formData.orientation,
          tone: formData.tone,
          avatar: formData.avatar,
          plan: formData.plan,
          needsScriptHelp: formData.needsScriptHelp,
          attachedFiles: formData.attachedFiles,
          totalPrice: calculateTotalPrice()
        }}
      />
    </>
  );
}