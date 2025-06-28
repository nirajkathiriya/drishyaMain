import React from 'react';
import { Check, Star, Zap, Crown, Rocket, Clock, Users, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { PricingPlan } from '../../types';

interface PlanSelectorProps {
  selectedPlan: PricingPlan | null;
  onPlanChange: (plan: PricingPlan) => void;
}

export function PlanSelector({ selectedPlan, onPlanChange }: PlanSelectorProps) {
  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 25,
      features: [
        'Single video creation',
        'Basic AI avatar selection',
        'Up to 60 seconds video',
        'Standard script review',
        'Basic editing & effects',
        'HD 1080p quality',
        '7-day delivery',
        '1 revision included',
        'Email support'
      ],
      maxRevisions: 1,
      deliveryDays: 7,
      type: 'one-time'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 45,
      features: [
        'Single video creation',
        'Premium AI avatar library',
        'Up to 2 minutes video',
        'Script assistance included (+$8 value)',
        'Professional editing & effects',
        'Background music & graphics',
        'HD 1080p quality',
        '5-day delivery',
        '2 revisions included',
        'Priority email support',
        'Custom thumbnails'
      ],
      maxRevisions: 2,
      deliveryDays: 5,
      type: 'one-time'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 75,
      features: [
        'Single video creation',
        'Full AI avatar collection',
        'Up to 5 minutes video',
        'Professional script writing included',
        'Advanced editing & animations',
        'Custom graphics & branding',
        '4K Ultra HD quality',
        'Background music library',
        '3-day delivery',
        '3 revisions included',
        'Phone & email support',
        'Custom thumbnails & covers',
        'Multiple format exports',
        'Rush delivery available'
      ],
      maxRevisions: 3,
      deliveryDays: 3,
      type: 'one-time'
    }
  ];

  const planIcons = [Zap, Crown, Rocket];
  const planColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500'
  ];

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('delivery')) return Clock;
    if (feature.includes('support')) return Users;
    if (feature.includes('graphics') || feature.includes('branding')) return Palette;
    return Check;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">Select Plan</h3>
        <p className="text-gray-300 text-lg">Choose the package that best fits your needs and budget. All plans include our professional AI video creation service.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const IconComponent = planIcons[index];
          const isPopular = index === 1;
          const isPremium = index === 2;
          
          return (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                selectedPlan?.id === plan.id 
                  ? 'ring-2 ring-purple-500 shadow-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                  : 'card-professional hover:shadow-xl'
              } ${isPopular ? 'lg:scale-105' : ''}`}
              onClick={() => onPlanChange(plan)}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                    <Star className="h-4 w-4" fill="currentColor" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {isPremium && (
                <div className="absolute -top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    Best Value
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`feature-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${planColors[index]} shadow-lg`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-4">{plan.name}</h4>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <div className="text-left">
                    <div className="text-sm text-gray-400">per video</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 inline-block">
                  <p className="text-sm text-gray-300 font-medium">
                    {plan.deliveryDays}-day delivery • {plan.maxRevisions} revision{plan.maxRevisions !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Value Indicators */}
                {index === 1 && (
                  <div className="mt-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md border border-green-500/30 rounded-lg p-3">
                    <p className="text-sm text-green-300 font-semibold">
                      Includes $8 script writing service FREE
                    </p>
                  </div>
                )}

                {index === 2 && (
                  <div className="mt-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-md border border-orange-500/30 rounded-lg p-3">
                    <p className="text-sm text-orange-300 font-semibold">
                      Save $15+ with included premium features
                    </p>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => {
                    const FeatureIcon = getFeatureIcon(feature);
                    const isHighlight = feature.includes('included') || feature.includes('4K') || feature.includes('Rush');
                    
                    return (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          isHighlight ? 'bg-green-500/30' : 'bg-green-500/20'
                        }`}>
                          <FeatureIcon className={`h-3 w-3 ${isHighlight ? 'text-green-300' : 'text-green-400'}`} />
                        </div>
                        <span className={`text-sm ${isHighlight ? 'text-white font-medium' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                
                {/* Plan Benefits */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-2">Perfect For:</div>
                  <div className="text-sm text-gray-300">
                    {index === 0 && "Testing our platform, simple announcements, basic social media content"}
                    {index === 1 && "Product demos, explainer videos, professional presentations, marketing content"}
                    {index === 2 && "High-end marketing campaigns, detailed tutorials, premium brand content, urgent projects"}
                  </div>
                </div>

                {/* Quality Indicators */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{plan.deliveryDays}</div>
                      <div className="text-xs text-gray-400">Days</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{plan.maxRevisions}</div>
                      <div className="text-xs text-gray-400">Revision{plan.maxRevisions !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>

                {selectedPlan?.id === plan.id && (
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-sm text-green-300 font-medium text-center">
                      ✓ {plan.name} Plan Selected
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Plan Comparison */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-bold text-white mb-4">📊 Quick Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-300">Feature</th>
                <th className="text-center py-2 text-blue-300">Basic</th>
                <th className="text-center py-2 text-purple-300">Standard</th>
                <th className="text-center py-2 text-orange-300">Premium</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b border-gray-800">
                <td className="py-2 text-gray-300">Video Length</td>
                <td className="text-center py-2 text-white">60 seconds</td>
                <td className="text-center py-2 text-white">2 minutes</td>
                <td className="text-center py-2 text-white">5 minutes</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-gray-300">Script Writing</td>
                <td className="text-center py-2 text-gray-400">Review only</td>
                <td className="text-center py-2 text-green-400">✓ Included</td>
                <td className="text-center py-2 text-green-400">✓ Professional</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-gray-300">Video Quality</td>
                <td className="text-center py-2 text-white">HD 1080p</td>
                <td className="text-center py-2 text-white">HD 1080p</td>
                <td className="text-center py-2 text-orange-400">4K Ultra HD</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-gray-300">Delivery Time</td>
                <td className="text-center py-2 text-white">7 days</td>
                <td className="text-center py-2 text-white">5 days</td>
                <td className="text-center py-2 text-green-400">3 days</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-300">Support Level</td>
                <td className="text-center py-2 text-white">Email</td>
                <td className="text-center py-2 text-white">Priority Email</td>
                <td className="text-center py-2 text-orange-400">Phone & Email</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedPlan && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-300 mb-3">✓ Plan Selected</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-green-200 font-semibold mb-2">
                {selectedPlan.name} Plan - ${selectedPlan.price}
              </p>
              <p className="text-sm text-green-300">
                {selectedPlan.deliveryDays}-day delivery with {selectedPlan.maxRevisions} revision{selectedPlan.maxRevisions !== 1 ? 's' : ''} included
              </p>
            </div>
            <div>
              <div className="text-sm text-green-300">
                <strong>What's included:</strong> Professional AI video creation, {selectedPlan.features.length} premium features, and dedicated support
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Money-back guarantee */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
        <h4 className="text-lg font-bold text-blue-300 mb-2">💯 100% Satisfaction Guarantee</h4>
        <p className="text-blue-200">
          Not happy with your video? We'll revise it until you love it, or provide a full refund within 30 days. 
          Your success is our priority.
        </p>
      </div>
    </div>
  );
}