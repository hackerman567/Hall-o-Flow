import React from 'react';
import { Project } from '../../types';
import { Reveal } from '../ui/Reveal';

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Obsidian Residence",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    description: "A modern masterpiece carved into the cliffside."
  },
  {
    id: 2,
    title: "The Gilded Lounge",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd354ca8?q=80&w=2000&auto=format&fit=crop",
    description: "An award-winning interior design for Tokyo's elite."
  },
  {
    id: 3,
    title: "Azure Villa",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    description: "Mediterranean aesthetics meets minimalist luxury."
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <Reveal>
            <div>
              <span className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Selected Works</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Curated Excellence</h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              A glimpse into our portfolio of award-winning architectural and interior design projects across the globe.
            </p>
          </Reveal>
        </div>

        <div className="space-y-32">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}>
              
              <div className="w-full md:w-3/5 overflow-hidden">
                <Reveal direction={index % 2 === 0 ? 'right' : 'left'}>
                  <div className="overflow-hidden relative aspect-[16/10]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </Reveal>
              </div>

              <div className="w-full md:w-2/5">
                <Reveal delay={0.2}>
                  <span className="text-gold-500 text-xs tracking-widest uppercase mb-4 block opacity-80">{project.category}</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 group-hover:text-gold-400 transition-colors duration-300 cursor-pointer">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <button className="text-white text-xs font-bold uppercase tracking-widest pb-2 border-b border-white/20 hover:border-gold-500 hover:text-gold-500 transition-all duration-300">
                    View Project
                  </button>
                </Reveal>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};