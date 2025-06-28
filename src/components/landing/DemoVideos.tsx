import React from 'react';
import { Play, Clock, Users, BookOpen, Megaphone } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { demoVideos } from '../../data/mockData';

export function DemoVideos() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'promotional':
        return 'bg-purple-100 text-purple-800';
      case 'informative':
        return 'bg-blue-100 text-blue-800';
      case 'emotional':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'promotional':
        return Megaphone;
      case 'informative':
        return BookOpen;
      case 'emotional':
        return Users;
      default:
        return Play;
    }
  };

  const handleVideoPlay = (videoId: string) => {
    // In a real app, this would open a video modal or navigate to video player
    alert(`Playing demo video: ${videoId}`);
  };

  return (
    <section id="demo-videos" className="space-section bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 text-purple-300 shadow-lg mb-6">
            <Play className="h-4 w-4 mr-2 text-purple-400" />
            <span className="font-semibold">Video Showcase</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 text-display">
            See Drishya{' '}
            <span className="gradient-text">
              In Action
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-body">
            From training modules to product launches, explore the variety and quality of AI videos created with Drishya across different industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoVideos.map((video) => {
            const CategoryIcon = getCategoryIcon(video.category);
            
            return (
              <Card key={video.id} className="card-professional group cursor-pointer rounded-2xl overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Play button overlay */}
                  <div 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    onClick={() => handleVideoPlay(video.id)}
                  >
                    <div className="play-button rounded-full p-6 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-12 w-12 text-gray-900" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(video.category)}`}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      <span className="capitalize">{video.category}</span>
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-white" />
                    <span className="text-xs text-white font-medium">{video.duration}</span>
                  </div>
                  
                  {/* Quality indicator */}
                  <div className="absolute bottom-4 right-4 bg-green-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs text-white font-bold">HD</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Professional AI avatar with custom script, branded elements, and engaging visuals
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium border border-blue-500/30">
                      AI Avatar
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium border border-purple-500/30">
                      Custom Script
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-medium border border-green-500/30">
                      Professional Edit
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Use cases section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Perfect for Every Use Case
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Training & Education',
                description: 'Employee onboarding, skill development, compliance training, and educational content',
                icon: BookOpen,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Marketing & Sales',
                description: 'Product demos, promotional videos, customer testimonials, and sales presentations',
                icon: Megaphone,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Internal Communications',
                description: 'Company updates, team introductions, policy explanations, and culture videos',
                icon: Users,
                color: 'from-green-500 to-teal-500'
              }
            ].map((useCase, index) => (
              <Card key={index} className="card-professional text-center rounded-2xl">
                <CardContent className="p-8">
                  <div className={`feature-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${useCase.color}`}>
                    <useCase.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{useCase.title}</h4>
                  <p className="text-gray-300">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}