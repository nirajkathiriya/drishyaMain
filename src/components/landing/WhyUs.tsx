import React from 'react';
import { Zap, Users, Bot, PenTool, Shield, Clock, Repeat, Building } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function WhyUs() {
  const features = [
    {
      icon: Zap,
      title: 'Flexible Pricing',
      description: 'Start with a single video for $15, or subscribe for regular content creation. Scale up to enterprise solutions as you grow.',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      icon: Repeat,
      title: 'Subscription Value',
      description: 'Get 2 professional videos every week with our Starter plan. Perfect for consistent training and marketing content.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Bot,
      title: 'AI-Powered Creation',
      description: 'Choose from diverse, ultra-realistic AI avatars that speak naturally and engage your audience with human-like expressions.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Users,
      title: 'Human Expertise',
      description: 'Our expert editors review and enhance every AI-generated video to ensure premium quality and brand consistency.',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    },
    {
      icon: Building,
      title: 'Enterprise Ready',
      description: 'Custom avatar training, unlimited videos, white-label solutions, and dedicated support for large organizations.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      icon: PenTool,
      title: 'Script Assistance',
      description: 'Optional script writing service from our team of conversion copywriters who understand what drives results and engagement.',
      color: 'from-pink-500 to-red-500',
      bgColor: 'from-pink-50 to-red-50'
    }
  ];

  const businessTypes = [
    {
      type: 'Startups',
      description: 'Perfect for product demos, pitch videos, and team introductions',
      icon: '🚀'
    },
    {
      type: 'Enterprise',
      description: 'Ideal for training modules, internal communications, and onboarding',
      icon: '🏢'
    },
    {
      type: 'Agencies',
      description: 'Great for client presentations, case studies, and service explanations',
      icon: '🎯'
    },
    {
      type: 'Education',
      description: 'Excellent for course content, tutorials, and student orientations',
      icon: '🎓'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Why Choose Drishya
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Complete Solution
            </span>
            {' '}for Video Creation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From micro-businesses to Fortune 500 companies, Drishya scales with your needs and delivers professional results every time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <CardContent className={`p-8 bg-gradient-to-br ${feature.bgColor} group-hover:from-white group-hover:to-gray-50 transition-all duration-500`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Business types section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perfect for Every Business Size
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{business.icon}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{business.type}</h4>
                  <p className="text-gray-600 text-sm">{business.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Trusted Across Industries</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
              {['Tech', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing'].map((industry, index) => (
                <div key={index} className="text-lg font-bold text-gray-600">
                  {industry}
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">5,000+</div>
                <div className="text-gray-600">Videos Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">99.5%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}