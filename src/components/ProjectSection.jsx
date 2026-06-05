import { Code2, ExternalLink, Tag } from "lucide-react";
import {FaGithub} from "react-icons/fa";
// Import your project screenshots here
import projectOneImg from "/pic1.png"; 

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Real-time Data Pipeline",
      techStack: ["Kafka", "Python", "Docker"],
      image: projectOneImg,
      description: "Architected a scalable, event-driven data pipeline using Apache Kafka to process streaming telemetry data with sub-second latency.",
      githubUrl: "https://github.com/yourusername/repo",
      demoUrl: "https://demo-link.com"
    },
    {
      title: "Predictive Analytics Engine",
      techStack: ["Scikit-Learn", "Pandas", "FastAPI"],
      image: projectOneImg, // Replace with actual project image
      description: "Developed a machine learning model to predict user behavior patterns, achieving 92% accuracy on historical datasets.",
      githubUrl: "https://github.com/yourusername/repo",
      demoUrl: null // Set to null if no live demo exists
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center space-y-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Code2 className="h-7 w-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-foreground/70 max-w-xl text-sm md:text-base">
            Technical implementations, architecture designs, and hands-on coding milestones.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Project Preview */}
              <div className="relative aspect-video w-full bg-muted/30 overflow-hidden border-b border-border/20">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Details */}
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-xl text-foreground">{project.title}</h3>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-md">
                      <Tag size={10} />
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-foreground/75 leading-relaxed">
                  {project.description}
                </p>

                {/* Footer Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/10">
                  <a href={project.githubUrl} className="flex items-center gap-2 text-xs font-bold uppercase text-foreground hover:text-primary transition-colors">
                    <FaGithub /> Source
                  </a>
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="flex items-center gap-2 text-xs font-bold uppercase text-foreground hover:text-primary transition-colors">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};