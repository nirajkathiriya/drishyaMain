import React, { useState } from 'react';
import { Check, Play, Globe, User } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../../types';

interface AvatarSelectorProps {
  selectedAvatar: Avatar | null;
  onAvatarChange: (avatar: Avatar) => void;
}

export function AvatarSelector({ selectedAvatar, onAvatarChange }: AvatarSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewingAvatar, setPreviewingAvatar] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Avatars', icon: Globe },
    { id: 'asian', name: 'Asian', icon: User },
    { id: 'african', name: 'African', icon: User },
    { id: 'european', name: 'European', icon: User },
    { id: 'middle-eastern', name: 'Middle Eastern', icon: User },
    { id: 'latin-american', name: 'Latin American', icon: User }
  ];

  const avatars: Avatar[] = [
    // Asian Avatars
    {
      id: 'avatar-1',
      name: 'Kenji',
      gender: 'male',
      ethnicity: 'asian',
      imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Professional and tech-savvy presenter, perfect for software demos and business content',
      languages: ['English', 'Japanese'],
      specialties: ['Technology', 'Business', 'Education']
    },
    {
      id: 'avatar-2',
      name: 'Mei Lin',
      gender: 'female',
      ethnicity: 'asian',
      imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Warm and approachable, excellent for customer-facing content and tutorials',
      languages: ['English', 'Mandarin'],
      specialties: ['Customer Service', 'Training', 'Healthcare']
    },
    // African Avatars
    {
      id: 'avatar-3',
      name: 'Marcus',
      gender: 'male',
      ethnicity: 'african',
      imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Confident and engaging, ideal for motivational content and sales presentations',
      languages: ['English', 'French'],
      specialties: ['Sales', 'Motivation', 'Leadership']
    },
    {
      id: 'avatar-4',
      name: 'Amara',
      gender: 'female',
      ethnicity: 'african',
      imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Professional and authoritative, perfect for corporate communications and training',
      languages: ['English', 'Swahili'],
      specialties: ['Corporate', 'Training', 'Finance']
    },
    // European Avatars
    {
      id: 'avatar-5',
      name: 'Elena',
      gender: 'female',
      ethnicity: 'european',
      imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Sophisticated and trustworthy, excellent for luxury brands and professional services',
      languages: ['English', 'Spanish', 'Italian'],
      specialties: ['Luxury', 'Fashion', 'Real Estate']
    },
    {
      id: 'avatar-6',
      name: 'Alexander',
      gender: 'male',
      ethnicity: 'european',
      imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Charismatic and knowledgeable, perfect for thought leadership and expert content',
      languages: ['English', 'German', 'French'],
      specialties: ['Consulting', 'Technology', 'Innovation']
    },
    // Middle Eastern Avatars
    {
      id: 'avatar-7',
      name: 'Yasmin',
      gender: 'female',
      ethnicity: 'middle-eastern',
      imageUrl: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Elegant and articulate, ideal for cultural content and international business',
      languages: ['English', 'Arabic', 'Persian'],
      specialties: ['International', 'Culture', 'Diplomacy']
    },
    {
      id: 'avatar-8',
      name: 'Omar',
      gender: 'male',
      ethnicity: 'middle-eastern',
      imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Distinguished and credible, excellent for financial services and professional content',
      languages: ['English', 'Arabic'],
      specialties: ['Finance', 'Banking', 'Investment']
    },
    // Latin American Avatars
    {
      id: 'avatar-9',
      name: 'Sofia',
      gender: 'female',
      ethnicity: 'latin-american',
      imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Vibrant and energetic, perfect for lifestyle brands and social media content',
      languages: ['English', 'Spanish', 'Portuguese'],
      specialties: ['Lifestyle', 'Social Media', 'Entertainment']
    },
    {
      id: 'avatar-10',
      name: 'Diego',
      gender: 'male',
      ethnicity: 'latin-american',
      imageUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Friendly and approachable, ideal for customer service and educational content',
      languages: ['English', 'Spanish'],
      specialties: ['Education', 'Customer Service', 'Healthcare']
    }
  ];

  const filteredAvatars = selectedCategory === 'all' 
    ? avatars 
    : avatars.filter(avatar => avatar.ethnicity === selectedCategory);

  const handlePreview = (avatarId: string) => {
    setPreviewingAvatar(avatarId);
    // Simulate preview loading
    setTimeout(() => {
      setPreviewingAvatar(null);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">Select Avatar</h3>
        <p className="text-gray-300 text-lg">Browse through our diverse collection of professional AI avatars and choose the perfect presenter for your video.</p>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Browse by Category</h4>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Avatar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAvatars.map((avatar) => (
          <Card 
            key={avatar.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedAvatar?.id === avatar.id 
                ? 'ring-2 ring-purple-500 shadow-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                : 'card-professional hover:shadow-xl'
            }`}
            onClick={() => onAvatarChange(avatar)}
          >
            <div className="relative">
              <img 
                src={avatar.imageUrl} 
                alt={avatar.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              
              {/* Selection Indicator */}
              {selectedAvatar?.id === avatar.id && (
                <div className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-lg">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              {/* Preview Button */}
              <div className="absolute bottom-3 left-3">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(avatar.id);
                  }}
                  disabled={previewingAvatar === avatar.id}
                  icon={Play}
                  className="glass bg-black/50 border-white/20 text-white hover:bg-black/70 text-xs px-3 py-1"
                >
                  {previewingAvatar === avatar.id ? 'Playing...' : 'Preview'}
                </Button>
              </div>

              {/* Ethnicity Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs text-white font-medium capitalize">{avatar.ethnicity.replace('-', ' ')}</span>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-white">{avatar.name}</h4>
                <span className="text-xs text-gray-400 capitalize bg-gray-800 px-2 py-1 rounded">
                  {avatar.gender}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">{avatar.description}</p>
              
              {/* Languages */}
              <div className="mb-3">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Languages</div>
                <div className="flex flex-wrap gap-1">
                  {avatar.languages.map((lang, index) => (
                    <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">Specialties</div>
                <div className="flex flex-wrap gap-1">
                  {avatar.specialties.slice(0, 2).map((specialty, index) => (
                    <span key={index} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                      {specialty}
                    </span>
                  ))}
                  {avatar.specialties.length > 2 && (
                    <span className="text-xs text-gray-400">+{avatar.specialties.length - 2} more</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedAvatar && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-300 mb-3">✓ Avatar Selected</h4>
          <div className="flex items-start space-x-4">
            <img 
              src={selectedAvatar.imageUrl} 
              alt={selectedAvatar.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="text-green-200 font-semibold mb-1">
                {selectedAvatar.name} - {selectedAvatar.ethnicity.replace('-', ' ')} {selectedAvatar.gender}
              </p>
              <p className="text-sm text-green-300 mb-2">{selectedAvatar.description}</p>
              <div className="flex items-center space-x-4 text-xs">
                <div>
                  <span className="text-green-400 font-medium">Languages: </span>
                  <span className="text-green-200">{selectedAvatar.languages.join(', ')}</span>
                </div>
                <div>
                  <span className="text-green-400 font-medium">Specialties: </span>
                  <span className="text-green-200">{selectedAvatar.specialties.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Avatar Option */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
        <h4 className="text-lg font-bold text-yellow-300 mb-2">🎨 Need a Custom Avatar?</h4>
        <p className="text-yellow-200 mb-3">
          Our Premium and Enterprise plans include custom avatar training to match your specific brand requirements, 
          including custom clothing, backgrounds, and even training on your team members.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-yellow-500/10 p-3 rounded-lg">
            <div className="font-semibold text-yellow-300 mb-1">Brand Matching</div>
            <div className="text-yellow-200">Custom clothing, colors, and styling</div>
          </div>
          <div className="bg-yellow-500/10 p-3 rounded-lg">
            <div className="font-semibold text-yellow-300 mb-1">Team Training</div>
            <div className="text-yellow-200">Train avatars on your actual team members</div>
          </div>
          <div className="bg-yellow-500/10 p-3 rounded-lg">
            <div className="font-semibold text-yellow-300 mb-1">Unlimited Use</div>
            <div className="text-yellow-200">Use your custom avatar across all videos</div>
          </div>
        </div>
      </div>
    </div>
  );
}