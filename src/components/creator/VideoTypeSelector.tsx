import React from 'react';
import { Info, Megaphone, Heart, Play, BookOpen, Smartphone } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface VideoTypeSelectorProps {
  selectedType: string;
  selectedOrientation: string;
  onTypeChange: (type: 'product-demo' | 'explainer' | 'tutorial' | 'brand-story' | 'social-ad' | 'custom') => void;
  onOrientationChange: (orientation: 'horizontal' | 'vertical') => void;
}

export function VideoTypeSelector({ selectedType, selectedOrientation, onTypeChange, onOrientationChange }: VideoTypeSelectorProps) {
  const types = [
    {
      id: 'product-demo',
      title: 'Product Demo',
      description: 'Showcase your product features and benefits with engaging demonstrations',
      icon: Play,
      color: 'from-blue-500 to-blue-600',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      examples: ['Software walkthroughs', 'Product features', 'App demonstrations']
    },
    {
      id: 'explainer',
      title: 'Explainer Video',
      description: 'Simplify complex concepts and explain your business or service clearly',
      icon: Info,
      color: 'from-green-500 to-green-600',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      examples: ['How it works', 'Service explanations', 'Process overviews']
    },
    {
      id: 'tutorial',
      title: 'Tutorial',
      description: 'Educational step-by-step guides and training content for your audience',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      examples: ['How-to guides', 'Training videos', 'Educational content']
    },
    {
      id: 'brand-story',
      title: 'Brand Story',
      description: 'Tell your company story and connect emotionally with your audience',
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      examples: ['Company history', 'Mission & values', 'Team introductions']
    },
    {
      id: 'social-ad',
      title: 'Social Media Ad',
      description: 'High-converting advertisements optimized for social media platforms',
      icon: Megaphone,
      color: 'from-orange-500 to-red-500',
      thumbnail: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      examples: ['Facebook ads', 'Instagram stories', 'TikTok content']
    },
    {
      id: 'custom',
      title: 'Custom',
      description: 'Have a unique vision? Let us create something completely custom for you',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      examples: ['Unique concepts', 'Special projects', 'Creative ideas']
    }
  ] as const;

  const handleTypeClick = (typeId: string) => {
    console.log('Type clicked:', typeId);
    onTypeChange(typeId as 'product-demo' | 'explainer' | 'tutorial' | 'brand-story' | 'social-ad' | 'custom');
  };

  const handleOrientationClick = (orientation: 'horizontal' | 'vertical') => {
    console.log('Orientation clicked:', orientation);
    onOrientationChange(orientation);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">Select Video Type</h3>
        <p className="text-gray-300 text-lg">Choose the type of video that best fits your marketing goals and target audience.</p>
      </div>
      
      {/* Video Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedType === type.id 
                ? 'ring-2 ring-purple-500 shadow-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                : 'hover:shadow-xl card-professional'
            }`}
            onClick={() => handleTypeClick(type.id)}
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img 
                src={type.thumbnail} 
                alt={type.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className={`absolute top-4 left-4 p-3 rounded-xl bg-gradient-to-r ${type.color} shadow-lg`}>
                <type.icon className="h-6 w-6 text-white" />
              </div>
              {selectedType === type.id && (
                <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <h4 className="text-xl font-bold text-white mb-3">{type.title}</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{type.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Perfect for:</div>
                {type.examples.map((example, index) => (
                  <div key={index} className="text-xs text-gray-400 flex items-center">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                    {example}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orientation Selection */}
      {selectedType && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">Video Orientation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                selectedOrientation === 'horizontal' 
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                  : 'card-professional hover:shadow-lg'
              }`}
              onClick={() => handleOrientationClick('horizontal')}
            >
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="bg-white w-16 h-8 rounded flex items-center justify-center">
                    <div className="bg-gray-800 w-12 h-4 rounded"></div>
                  </div>
                </div>
                <h5 className="text-lg font-bold text-white mb-2">Horizontal (16:9)</h5>
                <p className="text-gray-300 text-sm mb-3">Perfect for YouTube, websites, presentations, and desktop viewing</p>
                <div className="text-xs text-gray-400">
                  Recommended for: YouTube, Vimeo, websites, email campaigns
                </div>
                {selectedOrientation === 'horizontal' && (
                  <div className="mt-3 bg-green-500 rounded-full p-2 w-8 h-8 mx-auto flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                selectedOrientation === 'vertical' 
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                  : 'card-professional hover:shadow-lg'
              }`}
              onClick={() => handleOrientationClick('vertical')}
            >
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-pink-500 to-red-500 w-12 h-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="bg-white w-8 h-16 rounded flex items-center justify-center">
                    <div className="bg-gray-800 w-4 h-12 rounded"></div>
                  </div>
                </div>
                <h5 className="text-lg font-bold text-white mb-2">Vertical (9:16)</h5>
                <p className="text-gray-300 text-sm mb-3">Optimized for mobile viewing and social media stories</p>
                <div className="text-xs text-gray-400">
                  Recommended for: Instagram Stories, TikTok, YouTube Shorts, Reels
                </div>
                {selectedOrientation === 'vertical' && (
                  <div className="mt-3 bg-green-500 rounded-full p-2 w-8 h-8 mx-auto flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectedType && selectedOrientation && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-300 mb-2">✓ Selection Complete</h4>
          <p className="text-green-200">
            You've selected: <strong>{types.find(t => t.id === selectedType)?.title}</strong> in <strong>{selectedOrientation}</strong> format
          </p>
        </div>
      )}
    </div>
  );
}