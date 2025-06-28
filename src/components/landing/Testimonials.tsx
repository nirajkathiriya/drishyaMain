import React from 'react';
import { Star, Quote, Play } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { testimonials } from '../../data/mockData';

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6">
            <Star className="h-4 w-4 mr-2" fill="currentColor" />
            Client Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied businesses who've transformed their marketing with AI videos that actually convert.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-8 relative">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                
                {/* Video play button overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="h-4 w-4 text-white" fill="currentColor" />
                  </div>
                </div>
                
                {/* Rating stars */}
                <div className="flex items-center mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                  <span className="ml-2 text-white/80 text-sm font-medium">5.0</span>
                </div>
                
                {/* Testimonial content */}
                <blockquote className="text-white mb-8 leading-relaxed text-lg font-medium italic">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-gray-300 text-sm">{testimonial.role}</div>
                    <div className="text-yellow-400 text-sm font-semibold">{testimonial.company}</div>
                  </div>
                </div>
                
                {/* Results badge */}
                <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-300 text-xs font-semibold">
                    {index === 0 ? '+150% Conversion Rate' : index === 1 ? '+200% Engagement' : '+300% ROI'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust metrics */}
        <div className="mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { metric: '2,500+', label: 'Videos Created' },
                { metric: '99.2%', label: 'Satisfaction Rate' },
                { metric: '150%', label: 'Avg. Conversion Boost' },
                { metric: '24hrs', label: 'Fastest Delivery' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black text-white mb-2">{stat.metric}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}