import React from 'react';
import { Lightbulb, Upload, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function HowItWorks() {
  const steps = [
    {
      icon: Lightbulb,
      title: 'Share Your Idea',
      description: 'Tell us your concept, vision, or goal. No script needed - just your brilliant idea and we\'ll bring it to life.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Sparkles,
      title: 'We Create Magic',
      description: 'Our AI and expert team transform your idea into a professional script, select the perfect avatar, and craft your video.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Receive Your Video',
      description: 'Get your professionally edited marketing video delivered within days, ready to captivate your audience and boost your business.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="space-section bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 text-purple-300 shadow-lg mb-6">
            <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
            <span className="font-semibold">From Concept to Creation</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 text-display">
            How We Turn{' '}
            <span className="gradient-text">
              Ideas Into Videos
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-body">
            Creating professional AI videos has never been easier. Just bring your idea - we handle everything else.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="card-professional h-full rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className={`feature-icon w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${step.color}`}>
                    <step.icon className="h-10 w-10" />
                  </div>
                  
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg font-black text-white">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced messaging about idea-to-video process */}
        <div className="mt-20">
          <Card className="card-professional rounded-2xl overflow-hidden border-yellow-500/20">
            <CardContent className="p-12 text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 shadow-lg">
                <Lightbulb className="h-12 w-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-black text-white mb-6">
                Got an Idea? That's All We Need!
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether it's a rough concept, a business goal, or just a spark of inspiration - our team of AI specialists and creative experts will transform your idea into a compelling video that drives results.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { title: 'No Script Required', description: 'Just tell us your idea and goals' },
                  { title: 'Full Creative Support', description: 'We handle scripting, design, and production' },
                  { title: 'Professional Results', description: 'Broadcast-quality videos every time' }
                ].map((feature, index) => (
                  <div key={index} className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                    <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}