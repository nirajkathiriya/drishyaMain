import React from 'react';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { DemoVideos } from '../components/landing/DemoVideos';
import { Pricing } from '../components/landing/Pricing';
import { WhyUs } from '../components/landing/WhyUs';
import { Testimonials } from '../components/landing/Testimonials';
import { CTA } from '../components/landing/CTA';

export function Landing() {
  return (
    <div className="pt-16">
      <Hero />
      <HowItWorks />
      <DemoVideos />
      <Pricing />
      <WhyUs />
      <Testimonials />
      <CTA />
    </div>
  );
}