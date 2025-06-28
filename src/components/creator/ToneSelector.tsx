import React, { useState } from 'react';
import { Smile, Briefcase, Zap, Shield, Laugh, Lightbulb, Play } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: 'professional' | 'casual' | 'energetic' | 'serious' | 'humorous' | 'inspirational') => void;
}

export function ToneSelector({ selectedTone, onToneChange }: ToneSelectorProps) {
  const [previewingTone, setPreviewingTone] = useState<string | null>(null);

  const tones = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'Formal, authoritative, and trustworthy tone perfect for business communications',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      characteristics: ['Clear articulation', 'Confident delivery', 'Business-focused language', 'Credible presentation'],
      bestFor: ['Corporate videos', 'Training materials', 'Product demos', 'Investor presentations'],
      sampleText: 'Our innovative solution delivers measurable results that drive business growth and operational efficiency.',
      voiceStyle: 'Confident, clear, and authoritative'
    },
    {
      id: 'casual',
      title: 'Casual',
      description: 'Warm, approachable, and conversational style that feels like talking to a friend',
      icon: Smile,
      color: 'from-green-500 to-green-600',
      characteristics: ['Friendly language', 'Warm delivery', 'Personal touch', 'Relatable approach'],
      bestFor: ['Social media content', 'Customer testimonials', 'Brand introductions', 'How-to videos'],
      sampleText: 'Hey there! Let me show you this amazing feature that\'s going to make your life so much easier.',
      voiceStyle: 'Warm, friendly, and conversational'
    },
    {
      id: 'energetic',
      title: 'Energetic',
      description: 'Dynamic, enthusiastic, and motivating tone that captures attention and drives action',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      characteristics: ['Upbeat delivery', 'Exciting pace', 'Action-oriented', 'High enthusiasm'],
      bestFor: ['Product launches', 'Sales videos', 'Event promotions', 'Fitness content'],
      sampleText: 'Get ready to transform your business with this game-changing solution that\'s taking the industry by storm!',
      voiceStyle: 'High-energy, enthusiastic, and motivating'
    },
    {
      id: 'serious',
      title: 'Serious',
      description: 'Thoughtful, measured, and respectful tone for important or sensitive topics',
      icon: Shield,
      color: 'from-gray-500 to-gray-600',
      characteristics: ['Measured delivery', 'Respectful tone', 'Thoughtful pacing', 'Authoritative presence'],
      bestFor: ['Healthcare content', 'Financial services', 'Legal explanations', 'Safety training'],
      sampleText: 'Understanding these critical safety protocols is essential for maintaining a secure work environment.',
      voiceStyle: 'Measured, respectful, and authoritative'
    },
    {
      id: 'humorous',
      title: 'Humorous',
      description: 'Light-hearted, entertaining, and memorable approach that makes content enjoyable',
      icon: Laugh,
      color: 'from-yellow-500 to-orange-500',
      characteristics: ['Playful delivery', 'Light-hearted approach', 'Entertaining style', 'Memorable presentation'],
      bestFor: ['Social media ads', 'Brand personality videos', 'Creative campaigns', 'Entertainment content'],
      sampleText: 'Who knew that solving this everyday problem could be this simple? Spoiler alert: it involves zero magic tricks!',
      voiceStyle: 'Playful, entertaining, and engaging'
    },
    {
      id: 'inspirational',
      title: 'Inspirational',
      description: 'Uplifting, motivational, and empowering tone that inspires action and positive change',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-500',
      characteristics: ['Uplifting delivery', 'Motivational language', 'Empowering message', 'Positive energy'],
      bestFor: ['Mission statements', 'Success stories', 'Motivational content', 'Change initiatives'],
      sampleText: 'Every great achievement starts with the courage to take that first step toward your dreams.',
      voiceStyle: 'Uplifting, motivational, and empowering'
    }
  ] as const;

  const handlePreview = (toneId: string) => {
    setPreviewingTone(toneId);
    // Simulate preview loading
    setTimeout(() => {
      setPreviewingTone(null);
    }, 2000);
  };

  const handleToneClick = (toneId: string) => {
    console.log('Tone clicked:', toneId);
    onToneChange(toneId as 'professional' | 'casual' | 'energetic' | 'serious' | 'humorous' | 'inspirational');
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">Choose Video Tone</h3>
        <p className="text-gray-300 text-lg">Select the tone that matches your brand personality and resonates with your target audience.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tones.map((tone) => (
          <Card 
            key={tone.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedTone === tone.id 
                ? 'ring-2 ring-purple-500 shadow-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                : 'card-professional hover:shadow-xl'
            }`}
            onClick={() => handleToneClick(tone.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${tone.color} shadow-lg`}>
                  <tone.icon className="h-6 w-6 text-white" />
                </div>
                {selectedTone === tone.id && (
                  <div className="bg-green-500 rounded-full p-2">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-3">{tone.title}</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{tone.description}</p>
              
              {/* Voice Style */}
              <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">Voice Style</div>
                <div className="text-sm text-gray-300">{tone.voiceStyle}</div>
              </div>

              {/* Sample Text */}
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">Sample Script</div>
                <div className="text-sm text-blue-200 italic">"{tone.sampleText}"</div>
              </div>
              
              {/* Characteristics */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-2">Characteristics</div>
                <div className="grid grid-cols-2 gap-1">
                  {tone.characteristics.map((char, index) => (
                    <div key={index} className="text-xs text-gray-400 flex items-center">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                      {char}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Best For</div>
                <div className="space-y-1">
                  {tone.bestFor.slice(0, 2).map((use, index) => (
                    <div key={index} className="text-xs text-gray-400 flex items-center">
                      <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                      {use}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(tone.id);
                }}
                disabled={previewingTone === tone.id}
                icon={Play}
                className="w-full glass border-white/20 text-white hover:bg-white/10 text-xs"
              >
                {previewingTone === tone.id ? 'Playing Preview...' : 'Preview Sample'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedTone && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-300 mb-2">✓ Tone Selected</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-green-200 mb-2">
                <strong>{tones.find(t => t.id === selectedTone)?.title}</strong> tone selected
              </p>
              <p className="text-sm text-green-300">
                {tones.find(t => t.id === selectedTone)?.voiceStyle}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">Perfect for your:</div>
              <div className="text-sm text-green-200">
                {tones.find(t => t.id === selectedTone)?.bestFor.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}