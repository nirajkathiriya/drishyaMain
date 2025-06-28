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
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [formData, setFormData] = useState({
    type: '' as 'product-demo' | 'explainer' | 'tutorial' | 'brand-story' | 'social-ad' | 'custom' | '',
    orientation: '' as 'horizontal' | 'vertical' | '',
    tone: '' as 'professional' | 'casual' | 'energetic' | 'serious' | 'humorous' | 'inspirational' | '',
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
      // Find plan from PlanSelector component
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
    console.log(`Checking step ${step} completion:`, formData);
    switch (step) {
      case 1: 
        const step1Complete = formData.type !== '' && formData.orientation !== '';
        console.log(`Step 1 complete: ${step1Complete}`, { type: formData.type, orientation: formData.orientation });
        return step1Complete;
      case 2: 
        const step2Complete = formData.tone !== '';
        console.log(`Step 2 complete: ${step2Complete}`, { tone: formData.tone });
        return step2Complete;
      case 3: 
        const step3Complete = formData.avatar !== null;
        console.log(`Step 3 complete: ${step3Complete}`, { avatar: formData.avatar });
        return step3Complete;
      case 4: 
        const step4Complete = formData.script.trim() !== '' || (formData.needsScriptHelp && formData.scriptRequirements.targetAudience.trim() !== '' && formData.scriptRequirements.keyMessages.trim() !== '');
        console.log(`Step 4 complete: ${step4Complete}`, { 
          script: formData.script, 
          needsHelp: formData.needsScriptHelp, 
          requirements: formData.scriptRequirements 
        });
        return step4Complete;
      case 5: 
        return true; // Files and notes are optional
      case 6: 
        const step6Complete = formData.plan !== null;
        console.log(`Step 6 complete: ${step6Complete}`, { plan: formData.plan });
        return step6Complete;
      case 7: 
        const step7Complete = formData.customerEmail !== '' && formData.customerName !== '';
        console.log(`Step 7 complete: ${step7Complete}`, { email: formData.customerEmail, name: formData.customerName });
        return step7Complete;
      default: 
        return false;
    }
  };

  const canProceed = () => {
    const canGo = isStepComplete(currentStep);
    console.log(`Can proceed from step ${currentStep}: ${canGo}`);
    return canGo;
  };

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep);
    if (canProceed() && currentStep < 7) {
      const nextStep = currentStep + 1;
      console.log('Moving to step:', nextStep);
      setCurrentStep(nextStep);
    } else {
      console.log('Cannot proceed:', { canProceed: canProceed(), currentStep });
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

  // Form data update handlers with proper state management
  const handleVideoTypeChange = (type: 'product-demo' | 'explainer' | 'tutorial' | 'brand-story' | 'social-ad' | 'custom') => {
    console.log('Video type changed to:', type);
    setFormData(prev => {
      const newData = { ...prev, type };
      console.log('New form data after type change:', newData);
      return newData;
    });
  };

  const handleOrientationChange = (orientation: 'horizontal' | 'vertical') => {
    console.log('Orientation changed to:', orientation);
    setFormData(prev => {
      const newData = { ...prev, orientation };
      console.log('New form data after orientation change:', newData);
      return newData;
    });
  };

  const handleToneChange = (tone: 'professional' | 'casual' | 'energetic' | 'serious' | 'humorous' | 'inspirational') => {
    console.log('Tone changed to:', tone);
    setFormData(prev => {
      const newData = { ...prev, tone };
      console.log('New form data after tone change:', newData);
      return newData;
    });
  };

  const handleAvatarChange = (avatar: Avatar) => {
    console.log('Avatar changed to:', avatar);
    setFormData(prev => {
      const newData = { ...prev, avatar };
      console.log('New form data after avatar change:', newData);
      return newData;
    });
  };

  const handleScriptChange = (script: string) => {
    console.log('Script changed, length:', script.length);
    setFormData(prev => {
      const newData = { ...prev, script };
      console.log('New form data after script change:', newData);
      return newData;
    });
  };

  const handleNeedsHelpChange = (needsScriptHelp: boolean) => {
    console.log('Needs script help changed to:', needsScriptHelp);
    setFormData(prev => {
      const newData = { ...prev, needsScriptHelp };
      console.log('New form data after needs help change:', newData);
      return newData;
    });
  };

  const handleRequirementsChange = (requirements: any) => {
    console.log('Script requirements changed:', requirements);
    setFormData(prev => {
      const newData = { ...prev, scriptRequirements: requirements };
      console.log('New form data after requirements change:', newData);
      return newData;
    });
  };

  const handleFilesChange = (files: File[]) => {
    console.log('Files changed, count:', files.length);
    setFormData(prev => {
      const newData = { ...prev, attachedFiles: files };
      console.log('New form data after files change:', newData);
      return newData;
    });
  };

  const handleNotesChange = (notes: string) => {
    console.log('Notes changed, length:', notes.length);
    setFormData(prev => {
      const newData = { ...prev, additionalNotes: notes };
      console.log('New form data after notes change:', newData);
      return newData;
    });
  };

  const handleInstructionsChange = (instructions: string) => {
    console.log('Instructions changed, length:', instructions.length);
    setFormData(prev => {
      const newData = { ...prev, instructions };
      console.log('New form data after instructions change:', newData);
      return newData;
    });
  };

  const handlePlanChange = (plan: PricingPlan) => {
    console.log('Plan changed to:', plan);
    setFormData(prev => {
      const newData = { ...prev, plan };
      console.log('New form data after plan change:', newData);
      return newData;
    });
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
            onTypeChange={handleVideoTypeChange}
            onOrientationChange={handleOrientationChange}
          />
        );
      case 2:
        return (
          <ToneSelector
            selectedTone={formData.tone}
            onToneChange={handleToneChange}
          />
        );
      case 3:
        return (
          <AvatarSelector
            selectedAvatar={formData.avatar}
            onAvatarChange={handleAvatarChange}
          />
        );
      case 4:
        return (
          <ScriptUpload
            script={formData.script}
            needsScriptHelp={formData.needsScriptHelp}
            scriptRequirements={formData.scriptRequirements}
            onScriptChange={handleScriptChange}
            onNeedsHelpChange={handleNeedsHelpChange}
            onRequirementsChange={handleRequirementsChange}
          />
        );
      case 5:
        return (
          <FileUploadNotes
            files={formData.attachedFiles}
            notes={formData.additionalNotes}
            instructions={formData.instructions}
            onFilesChange={handleFilesChange}
            onNotesChange={handleNotesChange}
            onInstructionsChange={handleInstructionsChange}
          />
        );
      case 6:
        return (
          <PlanSelector
            selectedPlan={formData.plan}
            onPlanChange={handlePlanChange}
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
              onClick={currentStep === 7 ? handleOrderSubmit : handleNext}
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
          
          {/* Debug Info (remove in production) */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg text-xs text-gray-400">
            <div>Current Step: {currentStep}</div>
            <div>Can Proceed: {canProceed() ? 'Yes' : 'No'}</div>
            <div>Form Data: {JSON.stringify({
              type: formData.type,
              orientation: formData.orientation,
              tone: formData.tone,
              avatar: formData.avatar?.name || 'None',
              script: formData.script.length + ' chars',
              needsHelp: formData.needsScriptHelp,
              plan: formData.plan?.name || 'None'
            }, null, 2)}</div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}