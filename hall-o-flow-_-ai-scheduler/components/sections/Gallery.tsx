import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Layers, PenTool, Layout } from 'lucide-react';

const SERVICES = [
  {
    icon: <Layout className="w-8 h-8 text-gold-500" />,
    title: "Architecture",
    desc: "We conceive structures that respect their environment while making a bold statement of modernity."
  },
  {
    icon: <Layers className="w-8 h-8 text-gold-500" />,
    title: "Interior Design",
    desc: "Curating textures, light, and furniture to create cohesive narratives within every room."
  },
  {
    icon: <PenTool className="w-8 h-8 text-gold-500" />,
    title: "Product Design",
    desc: "Custom furniture and fixture design to ensure every detail creates a unified vision."
  }
];

export const Gallery: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Our Expertise</h2>
            <div className="w-20 h-[1px] bg-gold-500 mx-auto"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES.map((service, index) => (
            <Reveal key={index} delay={index * 0.2}>
              <div className="group p-8 border border-white/5 hover:border-gold-500/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 h-full">
                <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif text-white mb-4 group-hover:text-gold-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};