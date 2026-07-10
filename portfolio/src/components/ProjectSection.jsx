import { ExternalLink, Tag } from "lucide-react";
import { FaGithub } from "react-icons/fa";
// Import your project screenshots here (only for projects that have a real image)
import projectOneImg from "/image.png";
import Calculator from "/calculator.png";
import pum from "/pum.png";
import sncfPipeline from "/sncf-bi-pipeline.svg";
import atpPipeline from "/atp-tennis-graph.svg";
import airbnbPipeline from "/airbnb-price-prediction.svg";
import jadeMarketplace from "/jade-marketplace-sniffer.png";
import jadeTrafficLight from "/jade-traffic-light-sim.png";
import ecgArchitecture from "/ecg-three-architectures.svg";
import digitalBankPipeline from "/banksystem.png";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Personal Portfolio Website",
      techStack: ["React", "Vite", "Tailwind CSS", "JavaScript", "Lucide React"],
      image: projectOneImg,
      description: "Designed and built this portfolio from scratch a React + Tailwind site with a git-log/ETL-pipeline themed hero, a terminal-style experience log, and an interactive skills dashboard, all animated and fully responsive.",
      githubUrl: "https://github.com/yourusername/portfolio", // update with your actual repo
      demoUrl: null // set to your live portfolio URL once deployed, or remove if this page is the demo
    },
    {
      title: "Pum - Perfect Bouquet",
      techStack: ["React", "JavaScript", "Vite", "Tailwind CSS", "React icons", "Lucide React"],
      image: pum,
      description: "Developed a machine learning model to predict user behavior patterns, achieving 92% accuracy on historical datasets.",
      githubUrl: "https://github.com/SilverFangXk/Pum",
      demoUrl: null// Set to null if no live demo exists
    },
    {
      title: "AI-Powered Desktop Calculator",
      techStack: ["React", "JavaScript", "Vite", "Groq API", "Web Speech API", "Tailwind CSS", "Lucide React"],
      image: Calculator,
      description: "A multi-mode desktop calculator featuring standard, scientific, currency, and unit conversion modes. Includes a dark/light theme toggle, calculation history panel, and an AI voice accessibility feature built with Groq API and Web Speech API to assist visually impaired users.",
      githubUrl: "https://github.com/SilverFangXk/Calculator",
      demoUrl: "https://calculator-two-wine-84.vercel.app/"
    },
    {
      title: "ATP Tennis Tournament Graph Analysis",
      techStack: ["Apache Spark", "Scala", "GraphX", "GraphFrames", "PageRank"],
      image: atpPipeline,
      description: "Modeled ATP tour tournaments as distributed graphs (players as vertices, matches as edges) using GraphX and GraphFrames on a real-world dataset spanning 2020-2022 (10,912 vertices, 9,725 edges). Applied PageRank to identify the most influential players, detected repeated matchups, and used connected components and subgraph filtering to isolate tournament-specific analyses.",
      githubUrl: "https://github.com/SilverFangXk/atp-tennis-graph-analysis", // placeholder, update once repo is public
      demoUrl: null
    },
    {
      title: "Airbnb Price Prediction with Spark MLlib",
      techStack: ["Apache Spark", "Scala", "Spark MLlib", "Random Forest", "Cross Validation"],
      image: airbnbPipeline,
      description: "Built an end-to-end Spark ML pipeline to predict Airbnb listing prices from features like neighbourhood, room type, reviews, and availability. Handled missing values with Imputer, encoded categorical variables with StringIndexer and OneHotEncoder, and trained a Random Forest Regressor tuned via cross-validation and grid search, reaching an RMSE of ~374 on the test set.",
      githubUrl: "https://github.com/SilverFangXk/airbnb-price-prediction-spark", // placeholder, update once repo is public
      demoUrl: null
    },
    {
      title: "SNCF Data Warehouse & BI Dashboard",
      techStack: ["Talend Open Studio", "MySQL", "Power BI", "ETL", "DAX", "Star Schema"],
      image: sncfPipeline,
      description: "Designed and built an end-to-end BI architecture for a simulated SNCF (French railway) dataset spanning 2021-2025. Built ETL jobs in Talend Open Studio to consolidate multi-year CSV files into a normalized OLTP database (30M+ rows), then modeled a star-schema Data Warehouse (fact_ventes + 10 dimensions) with surrogate keys and SCD handling. Delivered interactive Power BI dashboards with DAX measures (revenue, occupancy rate, MoM growth) covering revenue, demand, station, and customer analysis.",
      githubUrl: "https://github.com/SilverFangXk/sncf-bi-project", // placeholder, update once repo is public
      demoUrl: null
    },
    {
      title: "Automated Marketplace with JADE",
      techStack: ["Java", "JADE", "Multi-Agent Systems", "FIPA ACL", "Swing"],
      image: jadeMarketplace,
      description: "Built a multi-agent negotiation system with JADE where a Buyer agent and Seller agent discover each other via JADE's Directory Facilitator and negotiate a book purchase through standard FIPA ACL messages (CFP, PROPOSE, ACCEPT_PROPOSAL, INFORM). Includes a reusable Swing GUI per agent and full message-exchange supervision via the JADE Sniffer.",
      githubUrl: "https://github.com/SilverFangXk/jade-multi-agent-systems", // placeholder, update once repo is public
      demoUrl: null
    },
    {
      title: "Traffic Light Coordination with JADE",
      techStack: ["Java", "JADE", "Multi-Agent Systems", "FIPA ACL", "Swing"],
      image: jadeTrafficLight,
      description: "Simulated a traffic-light coordination system where a FeuAgent manages VERT/ROUGE cycles via a TickerBehaviour and multiple AgentVoiture instances repeatedly request passage. Requests and responses (REQUEST/INFORM/REFUSE) are exchanged over FIPA ACL messages, with a color-coded Swing GUI and JADE Sniffer providing real-time visual feedback on every car's status.",
      githubUrl: "https://github.com/SilverFangXk/jade-multi-agent-systems", // placeholder, update once repo is public
      demoUrl: null
    },
    {
      title: "Cardiac Arrhythmia Detection with Deep Learning",
      techStack: ["Python", "TensorFlow/Keras", "PyTorch", "CNN", "Bi-LSTM", "SMOTE"],
      image: ecgArchitecture,
      description: "Built and compared three deep learning architectures (CNN, Bidirectional LSTM, hybrid CNN-LSTM) to classify ECG heartbeats into 5 clinical categories using the MIT-BIH Arrhythmia Dataset (87,554 signals). Addressed severe class imbalance (Normal: 66% vs Fusion: 0.6%) with SMOTE, adaptive class weights, and random oversampling. The CNN reached 98.33% accuracy (F1=99.1% on the normal class), while the hybrid CNN-LSTM achieved 88% accuracy with higher clinical sensitivity on rarer, more ambiguous rhythms.",
      githubUrl: "https://github.com/SilverFangXk/ecg-arrhythmia-deep-learning", // placeholder, update once repo is public
      demoUrl: null
    },
    {
      title: "Digital Bank Data Pipeline (Fintech Simulation)",
      techStack: ["Kafka", "Apache Spark", "SQL Server", "Power BI"],
      image: digitalBankPipeline,
      description: "A learning project simulating part of the data pipeline behind a digital bank, inspired by fintech platforms like Revolut and N26. Modeled a simplified banking data flow  customer onboarding, account and transaction data  streamed through Kafka, processed with Spark, and loaded into SQL Server for analytical reporting in Power BI. The goal was to practice designing a data pipeline that could plausibly scale to handle high transaction volumes, not to reproduce a full banking system.",
      githubUrl: "https://github.com/SilverFangXk/digital-bank-data-pipeline", // placeholder, update once repo is public
      demoUrl: null
    }
  ]
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">

        {/* Section Heading — matches Hero / About / Experience / Education / Skills */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            ThingsHaveShipped.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm md:text-base text-foreground/70">
            Technical implementations, architecture designs, and hands-on coding milestones.
          </p>
        </div>

        {/* Projects Grid — wider container, bigger gaps, one column on mobile/tablet
            so each card gets room to breathe instead of competing for space */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Project Preview — taller aspect ratio than before */}
              <div className="relative aspect-[16/10] w-full bg-muted/30 overflow-hidden border-b border-border/20">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                    <project.icon className="h-14 w-14 text-primary/70" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Project Details — more padding and bigger text */}
              <div className="p-8 space-y-5">
                <h3 className="font-bold text-2xl text-foreground">{project.title}</h3>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider bg-primary/10 text-primary px-3 py-1.5 rounded-md">
                      <Tag size={11} />
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-base text-foreground/75 leading-relaxed">
                  {project.description}
                </p>

                {/* Footer Actions */}
                <div className="flex items-center gap-5 pt-5 border-t border-border/10">
                  <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-bold uppercase text-foreground hover:text-primary transition-colors">
                    <FaGithub size={16} /> Source
                  </a>
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="flex items-center gap-2 text-sm font-bold uppercase text-foreground hover:text-primary transition-colors">
                      <ExternalLink size={16} /> Live Demo
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