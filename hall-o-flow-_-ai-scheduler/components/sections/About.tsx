import React from 'react';
import { Reveal } from '../ui/Reveal';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Image Side */}
        <div className="relative">
          <Reveal direction="right">
            <div className="relative aspect-[3/4] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                 alt="Interior Detail" 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
               />
               {/* Decorative Border */}
               <div className="absolute top-4 -right-4 w-full h-full border border-gold-500/30 -z-10 hidden md:block"></div>
            </div>
          </Reveal>
        </div>

        {/* Text Side */}
        <div>
           <Reveal delay={0.2}>
             <h4 className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Philosophy</h4>
           </Reveal>
           
           <Reveal delay={0.3}>
             <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
               Timeless Elegance <br /> For Modern Living.
             </h2>
           </Reveal>
           
           <Reveal delay={0.4}>
             <div className="space-y-6 text-gray-400 font-light leading-relaxed">
               <p>
                 At Aurum, we believe that space is not merely occupied; it is experienced. 
                 Our approach blends classical architectural principles with contemporary aesthetics, 
                 creating environments that are both visually stunning and deeply personal.
               </p>
               <p>
                 From bespoke residential sanctuaries to high-end commercial spaces, 
                 we bring a meticulous eye for detail and an unwavering commitment to quality 
                 in every project we undertake.
               </p>
             </div>
           </Reveal>

           <Reveal delay={0.5}>
             <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                   <span className="block text-4xl font-serif text-white mb-2">15+</span>
                   <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
                </div>
                <div>
                   <span className="block text-4xl font-serif text-white mb-2">120+</span>
                   <span className="text-xs uppercase tracking-widest text-gray-500">Projects Completed</span>
                </div>
             </div>
           </Reveal>
        </div>

      </div>
    </section>
  );
};