import { ExternalLink, Calendar, ShieldCheck } from "lucide-react";

// 1. Your actual certification images correctly referenced
import kaggleCertImg from "../assets/khadija_chkhichkh_IntroToMachineLearning.png";
import kaggleCertImg2 from "../assets/khadija_chkhichkh_DataCleaning.png";
import DataCampCertImg from "../assets/data_camp.png";
import htmlBeginnerImg from "../assets/part1.png"; 
import htmlIntermediateImg from "../assets/part2.png";
import htmlAdvancedImg from "../assets/part3.png";

export const CertificationsSection = () => {
  // 2. Updated data array matching your actual credentials
  const certifications = [
    {
      title: "Introduction to Machine Learning",
      issuer: "Kaggle",
      issueDate: "Completed 2025",
      image: kaggleCertImg,
      verificationUrl: "https://www.kaggle.com/learn/certification/khadijachkhichkh1/intro-to-machine-learning",
      description: "Covered core machine learning concepts including model building, random forests, data validation, underfitting and overfitting, and competing in Kaggle competitions."
    },
    {
      title: "Data Cleaning",
      issuer: "Kaggle",
      issueDate: "Completed 2025",
      image: kaggleCertImg2,
      verificationUrl: "https://www.kaggle.com/learn/certification/khadijachkhichkh1/data-cleaning",
      description: "Mastered workflows for handling missing values, parsing dates, encoding problematic character sets, correcting inconsistent data entries, and scaling/normalizing features."
    },
    {
      title: "Introduction to Apache Kafka — DataCamp",
      issuer: "DataCamp",
      issueDate: "Completed 2025",
      image: DataCampCertImg,
      verificationUrl: "https://www.datacamp.com/statement-of-accomplishment/course/045d11c911a8ae6decf20bbdc141b020475a9931?raw=1",
      description: "Covered the fundamentals of Apache Kafka, including event-driven architecture, real-time data streaming, and building scalable message-based data pipelines for distributed systems."
    },
    {
      title: "Mastering HTML5 and CSS3 (Beginner Level)",
      issuer: "Udemy",
      issueDate: "June 2025",
      image: htmlBeginnerImg,
      verificationUrl: "https://www.udemy.com/certificate/UC-7ee3ff26-a06f-40ef-b5b5-2322a7bf06bf/",
      description: "Foundational course covering the basics of HTML5 markup and CSS3 styling."
    },
    {
      title: "Mastering HTML5 and CSS3 (Intermediate Level)",
      issuer: "Udemy",
      issueDate: "June 2025",
      image: htmlIntermediateImg,
      verificationUrl: "https://www.udemy.com/certificate/UC-c952e112-2173-429b-ac29-727f84dbe419/",
      description: "Intermediate course focusing on deeper web development techniques and responsive design principles."
    },
    {
      title: "Mastering HTML5 and CSS3 (Advanced Level)",
      issuer: "Udemy",
      issueDate: "June 2025",
      image: htmlAdvancedImg,
      verificationUrl: "https://www.udemy.com/certificate/UC-9a90d55d-3cf1-48d5-a660-168214b1c0ec/",
      description: "Advanced course covering complex layout techniques, animations, and professional web styling workflows."
    }
  ];

  return (
    <section id="certifications" className="py-24 px-6 relative">

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Section Heading — matched to the interests dashboard header style */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            certifications.render()
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Licenses &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/70 leading-relaxed">
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
              <div>
                <div className="relative aspect-video w-full bg-muted/30 overflow-hidden border-b border-border/20 flex items-center justify-center p-4 group-hover:bg-primary/5 transition-colors duration-300">
                  <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  <img
                    src={cert.image}
                    alt={`${cert.title} Preview Document`}
                    className="max-h-full max-w-full object-contain rounded-md shadow-md transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

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