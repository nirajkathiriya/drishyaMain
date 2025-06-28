import { Avatar, PricingPlan, Testimonial, VideoProject } from '../types';

export const avatars: Avatar[] = [
  {
    id: '1',
    name: 'Sarah',
    gender: 'female',
    ethnicity: 'Caucasian',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    description: 'Professional and approachable'
  },
  {
    id: '2',
    name: 'Marcus',
    gender: 'male',
    ethnicity: 'African American',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    description: 'Confident and engaging'
  },
  {
    id: '3',
    name: 'Elena',
    gender: 'female',
    ethnicity: 'Hispanic',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    description: 'Warm and trustworthy'
  },
  {
    id: '4',
    name: 'David',
    gender: 'male',
    ethnicity: 'Asian',
    imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    description: 'Tech-savvy and modern'
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 15,
    features: [
      'Single video creation',
      'Basic AI avatar selection',
      'Up to 60 seconds video',
      'Standard script review',
      'Basic editing & effects',
      '7-day delivery',
      '1 revision included'
    ],
    maxRevisions: 1,
    deliveryDays: 7,
    type: 'one-time'
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 100,
    features: [
      '2 videos per week (8/month)',
      'Premium AI avatar library',
      'Up to 3 minutes per video',
      'Script assistance included',
      'Professional editing',
      'Background music & graphics',
      '3-day delivery per video',
      '2 revisions per video',
      'Priority support',
      'Team collaboration tools'
    ],
    maxRevisions: 2,
    deliveryDays: 3,
    type: 'subscription',
    billingPeriod: 'monthly'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // Custom pricing
    features: [
      'Unlimited video creation',
      'Custom AI avatar training',
      'Unlimited video length',
      'Dedicated scriptwriting team',
      'Advanced editing & animations',
      'Custom graphics & branding',
      'White-label solutions',
      'API access & integrations',
      '24-hour delivery available',
      'Unlimited revisions',
      'Dedicated account manager',
      'Custom training & onboarding'
    ],
    maxRevisions: -1, // Unlimited
    deliveryDays: 1,
    type: 'enterprise'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Chen',
    company: 'TechStart Inc.',
    role: 'Marketing Director',
    content: 'Drishya transformed our training videos. The subscription model lets us create consistent content for our growing team.',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    company: 'Growth Agency',
    role: 'Founder',
    content: 'From product demos to client presentations, Drishya helps us deliver professional videos at scale. Game-changer!',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  },
  {
    id: '3',
    name: 'Amanda Foster',
    company: 'E-learning Solutions',
    role: 'CEO',
    content: 'The enterprise plan gives us everything we need for our educational content. Custom avatars and unlimited creation!',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  }
];

export const demoVideos = [
  {
    id: '1',
    title: 'Employee Training Module',
    category: 'informative',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: '2:30'
  },
  {
    id: '2',
    title: 'Product Launch Campaign',
    category: 'promotional',
    thumbnail: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: '1:45'
  },
  {
    id: '3',
    title: 'Customer Success Story',
    category: 'emotional',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: '3:15'
  },
  {
    id: '4',
    title: 'Software Tutorial',
    category: 'informative',
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: '4:20'
  },
  {
    id: '5',
    title: 'Company Culture Video',
    category: 'emotional',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: '2:10'
  },
  {
    id: '6',
    title: 'Sales Presentation',
    category: 'promotional',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: '1:55'
  }
];

// Subscription plan details
export const subscriptionFeatures = {
  starter: {
    videosPerWeek: 2,
    videosPerMonth: 8,
    maxDuration: 180, // 3 minutes in seconds
    features: [
      'Premium AI avatars',
      'Script assistance',
      'Professional editing',
      'Background music',
      'Custom graphics',
      'Team collaboration',
      'Priority support'
    ]
  },
  enterprise: {
    videosPerWeek: -1, // Unlimited
    videosPerMonth: -1, // Unlimited
    maxDuration: -1, // Unlimited
    features: [
      'Custom AI avatar training',
      'Dedicated scriptwriting team',
      'Advanced editing & animations',
      'White-label solutions',
      'API access',
      'Dedicated account manager',
      'Custom training'
    ]
  }
};

// Use cases for different business types
export const useCases = [
  {
    businessType: 'Startups',
    examples: ['Product demos', 'Pitch videos', 'Team introductions', 'Customer testimonials']
  },
  {
    businessType: 'Enterprise',
    examples: ['Training modules', 'Internal communications', 'Sales presentations', 'Onboarding videos']
  },
  {
    businessType: 'Agencies',
    examples: ['Client presentations', 'Case studies', 'Service explanations', 'Team showcases']
  },
  {
    businessType: 'Education',
    examples: ['Course content', 'Tutorials', 'Student orientations', 'Faculty introductions']
  },
  {
    businessType: 'E-commerce',
    examples: ['Product showcases', 'How-to guides', 'Brand stories', 'Customer reviews']
  },
  {
    businessType: 'Healthcare',
    examples: ['Patient education', 'Procedure explanations', 'Staff training', 'Health awareness']
  }
];