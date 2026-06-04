import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";

// 1. Your actual certification images correctly referenced
import kaggleCertImg from "../assets/khadija_chkhichkh_IntroToMachineLearning.png";
import kaggleCertImg2 from "../assets/khadija_chkhichkh_DataCleaning.png";
import DataCampCertImg from "../assets/data_camp.png";

export const CertificationsSection = () => {
  // 2. Updated data array matching your actual credentials
  const certifications = [
    {
      title: "Introduction to Machine Learning",
      issuer: "Kaggle",
      issueDate: "Completed 2026",
      image: kaggleCertImg,
      verificationUrl: "https://www.kaggle.com/learn/intro-to-machine-learning", // Update with your personal certificate link if you have it
      description: "Covered core machine learning concepts including model building, random forests, data validation, underfitting and overfitting, and competing in Kaggle competitions."
    },
    {
      title: "Data Cleaning",
      issuer: "Kaggle",
      issueDate: "Completed 2026",
      image: kaggleCertImg2,
      verificationUrl: "https://www.kaggle.com/learn/data-cleaning", // Update with your personal certificate link if you have it
      description: "Mastered workflows for handling missing values, parsing dates, encoding problematic character sets, correcting inconsistent data entries, and scaling/normalizing features."
    },
    {
      title: "Data Engineering Track Progression",
      issuer: "DataCamp",
      issueDate: "Completed 2025",
      image: DataCampCertImg,
      verificationUrl: "https://www.datacamp.com", // Update with your personal certificate link if you have it
      description: "Comprehensive training focused on data pipeline architecture, managing relational databases, workflow orchestration, and parsing complex enterprise data structures."
    }
  ];

  return (
    <section id="certifications" className="py-24 px-6 relative bg-background">
      {/* Subtle Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center space-y-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Award className="h-7 w-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Licenses & <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-foreground/70 max-w-xl text-sm md:text-base">
            Verified professional credentials, specialized training paths, and engineering milestones achieved.
          </p>
        </div>

        {/* Certifications Dynamic Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="gradient-border group rounded-2xl border border-border/40 bg-card overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Top Section: Visual Preview Media Layer */}
              <div>
                <div className="relative aspect-video w-full bg-muted/30 overflow-hidden border-b border-border/20 flex items-center justify-center p-4 group-hover:bg-primary/5 transition-colors duration-300">
                  <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  <img 
                    src={cert.image} 
                    alt={`${cert.title} Preview Document`} 
                    className="max-h-full max-w-full object-contain rounded-md shadow-md transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Main Copy */}
                <div className="p-6 space-y-3 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary">
                    <Calendar size={13} />
                    <span>{cert.issueDate}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-medium text-foreground/70">
                      {cert.issuer}
                    </p>
                  </div>

                  <p className="text-sm text-foreground/75 leading-relaxed pt-2 border-t border-border/10">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Public Verification Call To Action */}
              <div className="p-6 pt-0 text-left">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors py-2 group/btn cursor-pointer"
                >
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Verify Certificate</span>
                  <ExternalLink size={12} className="opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};