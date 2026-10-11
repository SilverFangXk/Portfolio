import kaggleCertImg from "../assets/khadija_chkhichkh_IntroToMachineLearning.png";
import kaggleCertImg2 from "../assets/khadija_chkhichkh_DataCleaning.png";
import dataCampCertImg from "../assets/data_camp.png";
import htmlBeginnerImg from "../assets/part1.png";
import htmlIntermediateImg from "../assets/part2.png";
import htmlAdvancedImg from "../assets/part3.png";

// Built-in content. The site shows this until it is imported into Firestore
// (admin -> Experience -> "Import current data"), and again if Firestore is unreachable.

export const DEFAULT_EXPERIENCE = [
  {
    id: "nexteer",
    role: "Data Engineering Intern (PFA/PFE)",
    company: "Nexteer Automotive Morocco",
    location: "Zone Franche de Kénitra, Morocco",
    startDate: "2026-07-14",
    endDate: "",
    description: [
      "Developing digital solutions for HSE processes within an automotive manufacturing environment.",
    ],
    tags: [],
    color: "primary",
    order: 1,
  },
  {
    id: "safe-consulting",
    role: "Développeuse Stagiaire",
    company: "Safe Consulting",
    location: "Salé, Morocco",
    startDate: "2025-07-01",
    endDate: "2025-08-01",
    description: [
      "Designed and developed a stock management web application for product tracking and administration.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Flask", "MySQL"],
    color: "purple",
    order: 2,
  },
];

export const DEFAULT_EDUCATION = [
  {
    id: "ensaf-engineering",
    degree: "Engineering Cycle in Big Data & Data Engineering",
    school: "National School of Applied Sciences – Fès (ENSAF)",
    location: "Fès, Morocco",
    startYear: "2024",
    endYear: "2027",
    description:
      "Currently specializing in data engineering, big data systems, machine learning, deep learning, web development, and exploratory data analysis (EDA).",
    logo: "",
    color: "primary",
    order: 1,
  },
  {
    id: "ensaf-preparatory",
    degree: "Preparatory Cycle in Engineering Sciences",
    school: "National School of Applied Sciences – Fès (ENSAF)",
    location: "Fès, Morocco",
    startYear: "2022",
    endYear: "2024",
    description:
      "An intensive preparatory journey in mathematics, physics, algorithms, and programming (C language), with exposure to tools such as MATLAB and Simulink.",
    logo: "",
    color: "accent",
    order: 2,
  },
  {
    id: "bac-2022",
    degree: "Baccalaureate in Mathematical Sciences (With Honors)",
    school: "El Yassmine High School",
    location: "Khémisset, Morocco",
    startYear: "",
    endYear: "2022",
    description:
      "Academic background in mathematics and physics, completed with a 'Mention Bien' distinction.",
    logo: "",
    color: "purple",
    order: 3,
  },
];

export const DEFAULT_SKILLS = [
  { id: "java", name: "Java", category: "DATA ENGINEERING", iconKey: "java", icon: "", order: 1 },
  { id: "apache-spark", name: "Apache Spark", category: "DATA ENGINEERING", iconKey: "spark", icon: "", order: 2 },
  { id: "hadoop", name: "Hadoop", category: "DATA ENGINEERING", iconKey: "hadoop", icon: "", order: 3 },
  { id: "kafka", name: "Kafka", category: "DATA ENGINEERING", iconKey: "kafka", icon: "", order: 4 },
  { id: "etl-pipelines", name: "ETL Pipelines", category: "DATA ENGINEERING", iconKey: "etl", icon: "", order: 5 },
  { id: "python", name: "Python", category: "ARTIFICIAL INTELLIGENCE", iconKey: "python", icon: "", order: 6 },
  { id: "numpy-pandas", name: "NumPy / Pandas", category: "ARTIFICIAL INTELLIGENCE", iconKey: "chart-blue", icon: "", order: 7 },
  { id: "matplotlib-seaborn", name: "Matplotlib / Seaborn", category: "ARTIFICIAL INTELLIGENCE", iconKey: "chart-purple", icon: "", order: 8 },
  { id: "scikit-learn", name: "Scikit-learn", category: "ARTIFICIAL INTELLIGENCE", iconKey: "scikit-learn", icon: "", order: 9 },
  { id: "tensorflow", name: "TensorFlow", category: "ARTIFICIAL INTELLIGENCE", iconKey: "tensorflow", icon: "", order: 10 },
  { id: "deep-learning", name: "Deep Learning", category: "ARTIFICIAL INTELLIGENCE", iconKey: "deep-learning", icon: "", order: 11 },
  { id: "machine-learning-models", name: "Machine Learning Models", category: "ARTIFICIAL INTELLIGENCE", iconKey: "brain", icon: "", order: 12 },
  { id: "aws", name: "AWS", category: "CLOUD & DEVOPS", iconKey: "aws", icon: "", order: 13 },
  { id: "docker", name: "Docker", category: "CLOUD & DEVOPS", iconKey: "docker", icon: "", order: 14 },
  { id: "git", name: "Git", category: "CLOUD & DEVOPS", iconKey: "git", icon: "", order: 15 },
  { id: "linux", name: "Linux", category: "CLOUD & DEVOPS", iconKey: "linux", icon: "", order: 16 },
  { id: "postgresql", name: "PostgreSQL", category: "DATABASES", iconKey: "postgresql", icon: "", order: 17 },
  { id: "mysql", name: "MySQL", category: "DATABASES", iconKey: "mysql", icon: "", order: 18 },
  { id: "sql-server", name: "SQL Server", category: "DATABASES", iconKey: "database-red", icon: "", order: 19 },
  { id: "oracle", name: "Oracle", category: "DATABASES", iconKey: "database-dark-red", icon: "", order: 20 },
  { id: "mongodb", name: "MongoDB", category: "DATABASES", iconKey: "mongodb", icon: "", order: 21 },
  { id: "power-bi", name: "Power BI", category: "BUSINESS INTELLIGENCE", iconKey: "chart-yellow", icon: "", order: 22 },
  { id: "tableau", name: "Tableau", category: "BUSINESS INTELLIGENCE", iconKey: "tableau", icon: "", order: 23 },
  { id: "react-js", name: "React.js", category: "WEB DEVELOPMENT", iconKey: "react", icon: "", order: 24 },
  { id: "node-js", name: "Node.js", category: "WEB DEVELOPMENT", iconKey: "nodejs", icon: "", order: 25 },
  { id: "flask", name: "Flask", category: "WEB DEVELOPMENT", iconKey: "flask", icon: "", order: 26 },
  { id: "html", name: "HTML", category: "WEB DEVELOPMENT", iconKey: "html", icon: "", order: 27 },
  { id: "css", name: "CSS", category: "WEB DEVELOPMENT", iconKey: "css", icon: "", order: 28 },
  { id: "javascript", name: "JavaScript", category: "WEB DEVELOPMENT", iconKey: "javascript", icon: "", order: 29 },
  { id: "php", name: "PHP", category: "WEB DEVELOPMENT", iconKey: "php", icon: "", order: 30 },
];

// Same shape the admin's project form saves. The page walkthrough shows `steps`.
const BASE_PROJECTS = [
  {
    id: "personal-portfolio",
    slug: "personal-portfolio",
    title: "Personal Portfolio Website",
    summary: "Designed and built this portfolio from scratch a React + Tailwind site with a git-log/ETL-pipeline themed hero, a terminal-style experience log, and an interactive skills dashboard, all animated and fully responsive.",
    cover: "/image.png",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "JavaScript",
      "Lucide React"
    ],
    githubUrl: "https://github.com/yourusername/portfolio",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Personal Portfolio Website",
        text: "Designed and built this portfolio from scratch a React + Tailwind site with a git-log/ETL-pipeline themed hero, a terminal-style experience log, and an interactive skills dashboard, all animated and fully responsive.",
        image: "/image.png"
      }
    ]
  },
  {
    id: "pum-perfect-bouquet",
    slug: "pum-perfect-bouquet",
    title: "Pum - Perfect Bouquet",
    summary: "Developed a machine learning model to predict user behavior patterns, achieving 92% accuracy on historical datasets.",
    cover: "/pum.png",
    tags: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "React icons",
      "Lucide React"
    ],
    githubUrl: "https://github.com/SilverFangXk/Pum",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Pum - Perfect Bouquet",
        text: "Developed a machine learning model to predict user behavior patterns, achieving 92% accuracy on historical datasets.",
        image: "/pum.png"
      }
    ]
  },
  {
    id: "ai-calculator",
    slug: "ai-calculator",
    title: "AI-Powered Desktop Calculator",
    summary: "A multi-mode desktop calculator featuring standard, scientific, currency, and unit conversion modes. Includes a dark/light theme toggle, calculation history panel, and an AI voice accessibility feature built with Groq API and Web Speech API to assist visually impaired users.",
    cover: "/calculator.png",
    tags: [
      "React",
      "JavaScript",
      "Vite",
      "Groq API",
      "Web Speech API",
      "Tailwind CSS",
      "Lucide React"
    ],
    githubUrl: "https://github.com/SilverFangXk/Calculator",
    demoUrl: "https://calculator-two-wine-84.vercel.app/",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "AI-Powered Desktop Calculator",
        text: "A multi-mode desktop calculator featuring standard, scientific, currency, and unit conversion modes. Includes a dark/light theme toggle, calculation history panel, and an AI voice accessibility feature built with Groq API and Web Speech API to assist visually impaired users.",
        image: "/calculator.png"
      }
    ]
  },
  {
    id: "atp-tennis-graph-analysis",
    slug: "atp-tennis-graph-analysis",
    title: "ATP Tennis Tournament Graph Analysis",
    summary: "Modeled ATP tour tournaments as distributed graphs (players as vertices, matches as edges) using GraphX and GraphFrames on a real-world dataset spanning 2020-2022 (10,912 vertices, 9,725 edges). Applied PageRank to identify the most influential players, detected repeated matchups, and used connected components and subgraph filtering to isolate tournament-specific analyses.",
    cover: "/atp-tennis-graph.svg",
    tags: [
      "Apache Spark",
      "Scala",
      "GraphX",
      "GraphFrames",
      "PageRank"
    ],
    githubUrl: "https://github.com/SilverFangXk/atp-tennis-graph-analysis",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "ATP Tennis Tournament Graph Analysis",
        text: "Modeled ATP tour tournaments as distributed graphs (players as vertices, matches as edges) using GraphX and GraphFrames on a real-world dataset spanning 2020-2022 (10,912 vertices, 9,725 edges). Applied PageRank to identify the most influential players, detected repeated matchups, and used connected components and subgraph filtering to isolate tournament-specific analyses.",
        image: "/atp-tennis-graph.svg"
      }
    ]
  },
  {
    id: "airbnb-price-prediction",
    slug: "airbnb-price-prediction",
    title: "Airbnb Price Prediction with Spark MLlib",
    summary: "Built an end-to-end Spark ML pipeline to predict Airbnb listing prices from features like neighbourhood, room type, reviews, and availability. Handled missing values with Imputer, encoded categorical variables with StringIndexer and OneHotEncoder, and trained a Random Forest Regressor tuned via cross-validation and grid search, reaching an RMSE of ~374 on the test set.",
    cover: "/airbnb-price-prediction.svg",
    tags: [
      "Apache Spark",
      "Scala",
      "Spark MLlib",
      "Random Forest",
      "Cross Validation"
    ],
    githubUrl: "https://github.com/SilverFangXk/airbnb-price-prediction-spark",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Airbnb Price Prediction with Spark MLlib",
        text: "Built an end-to-end Spark ML pipeline to predict Airbnb listing prices from features like neighbourhood, room type, reviews, and availability. Handled missing values with Imputer, encoded categorical variables with StringIndexer and OneHotEncoder, and trained a Random Forest Regressor tuned via cross-validation and grid search, reaching an RMSE of ~374 on the test set.",
        image: "/airbnb-price-prediction.svg"
      }
    ]
  },
  {
    id: "sncf-bi",
    slug: "sncf-bi",
    title: "SNCF Data Warehouse & BI Dashboard",
    summary: "Designed and built an end-to-end BI architecture for a simulated SNCF (French railway) dataset spanning 2021-2025. Built ETL jobs in Talend Open Studio to consolidate multi-year CSV files into a normalized OLTP database (30M+ rows), then modeled a star-schema Data Warehouse (fact_ventes + 10 dimensions) with surrogate keys and SCD handling. Delivered interactive Power BI dashboards with DAX measures (revenue, occupancy rate, MoM growth) covering revenue, demand, station, and customer analysis.",
    cover: "/sncf-bi-pipeline.svg",
    tags: [
      "Talend Open Studio",
      "MySQL",
      "Power BI",
      "ETL",
      "DAX",
      "Star Schema"
    ],
    githubUrl: "https://github.com/SilverFangXk/sncf-bi-project",
    demoUrl: "",
    pdfUrl: "",
    details: [
      {
        label: "Dataset",
        value: "2021 to 2025"
      },
      {
        label: "Volume",
        value: "30M+ rows"
      },
      {
        label: "Stack",
        value: "Talend, MySQL, Power BI"
      }
    ],
    steps: [
      {
        label: "Model",
        title: "Start with the model",
        text: "Everything begins with the questions the dashboards must answer. One sales fact table and ten dimensions are modeled around them, with surrogate keys and slowly changing dimensions handled up front.",
        image: ""
      },
      {
        label: "Load",
        title: "Then, get the data in",
        text: "With the model fixed, Talend jobs merge five years of CSV files into a normalized database of 30M+ rows, then load the warehouse tables defined in step 1.",
        image: ""
      },
      {
        label: "Measure",
        title: "Turn rows into answers",
        text: "Because the warehouse is clean, DAX measures stay simple: revenue, occupancy rate and month-over-month growth, all computed on top of the tables loaded in step 2.",
        image: ""
      },
      {
        label: "Explore",
        title: "Finally, slice it any way",
        text: "The same star schema lets you cut by station and customer without new queries. This is the payoff of steps 1 to 3 working together.",
        image: ""
      }
    ]
  },
  {
    id: "jade-marketplace",
    slug: "jade-marketplace",
    title: "Automated Marketplace with JADE",
    summary: "Built a multi-agent negotiation system with JADE where a Buyer agent and Seller agent discover each other via JADE's Directory Facilitator and negotiate a book purchase through standard FIPA ACL messages (CFP, PROPOSE, ACCEPT_PROPOSAL, INFORM). Includes a reusable Swing GUI per agent and full message-exchange supervision via the JADE Sniffer.",
    cover: "/jade-marketplace-sniffer.png",
    tags: [
      "Java",
      "JADE",
      "Multi-Agent Systems",
      "FIPA ACL",
      "Swing"
    ],
    githubUrl: "https://github.com/SilverFangXk/jade-multi-agent-systems",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Automated Marketplace with JADE",
        text: "Built a multi-agent negotiation system with JADE where a Buyer agent and Seller agent discover each other via JADE's Directory Facilitator and negotiate a book purchase through standard FIPA ACL messages (CFP, PROPOSE, ACCEPT_PROPOSAL, INFORM). Includes a reusable Swing GUI per agent and full message-exchange supervision via the JADE Sniffer.",
        image: "/jade-marketplace-sniffer.png"
      }
    ]
  },
  {
    id: "jade-traffic-light",
    slug: "jade-traffic-light",
    title: "Traffic Light Coordination with JADE",
    summary: "Simulated a traffic-light coordination system where a FeuAgent manages VERT/ROUGE cycles via a TickerBehaviour and multiple AgentVoiture instances repeatedly request passage. Requests and responses (REQUEST/INFORM/REFUSE) are exchanged over FIPA ACL messages, with a color-coded Swing GUI and JADE Sniffer providing real-time visual feedback on every car's status.",
    cover: "/jade-traffic-light-sim.png",
    tags: [
      "Java",
      "JADE",
      "Multi-Agent Systems",
      "FIPA ACL",
      "Swing"
    ],
    githubUrl: "https://github.com/SilverFangXk/jade-multi-agent-systems",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Traffic Light Coordination with JADE",
        text: "Simulated a traffic-light coordination system where a FeuAgent manages VERT/ROUGE cycles via a TickerBehaviour and multiple AgentVoiture instances repeatedly request passage. Requests and responses (REQUEST/INFORM/REFUSE) are exchanged over FIPA ACL messages, with a color-coded Swing GUI and JADE Sniffer providing real-time visual feedback on every car's status.",
        image: "/jade-traffic-light-sim.png"
      }
    ]
  },
  {
    id: "ecg-arrhythmia-detection",
    slug: "ecg-arrhythmia-detection",
    title: "Cardiac Arrhythmia Detection with Deep Learning",
    summary: "Built and compared three deep learning architectures (CNN, Bidirectional LSTM, hybrid CNN-LSTM) to classify ECG heartbeats into 5 clinical categories using the MIT-BIH Arrhythmia Dataset (87,554 signals). Addressed severe class imbalance (Normal: 66% vs Fusion: 0.6%) with SMOTE, adaptive class weights, and random oversampling. The CNN reached 98.33% accuracy (F1=99.1% on the normal class), while the hybrid CNN-LSTM achieved 88% accuracy with higher clinical sensitivity on rarer, more ambiguous rhythms.",
    cover: "/ecg-three-architectures.svg",
    tags: [
      "Python",
      "TensorFlow/Keras",
      "PyTorch",
      "CNN",
      "Bi-LSTM",
      "SMOTE"
    ],
    githubUrl: "https://github.com/SilverFangXk/ecg-arrhythmia-deep-learning",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Cardiac Arrhythmia Detection with Deep Learning",
        text: "Built and compared three deep learning architectures (CNN, Bidirectional LSTM, hybrid CNN-LSTM) to classify ECG heartbeats into 5 clinical categories using the MIT-BIH Arrhythmia Dataset (87,554 signals). Addressed severe class imbalance (Normal: 66% vs Fusion: 0.6%) with SMOTE, adaptive class weights, and random oversampling. The CNN reached 98.33% accuracy (F1=99.1% on the normal class), while the hybrid CNN-LSTM achieved 88% accuracy with higher clinical sensitivity on rarer, more ambiguous rhythms.",
        image: "/ecg-three-architectures.svg"
      }
    ]
  },
  {
    id: "digital-bank-pipeline",
    slug: "digital-bank-pipeline",
    title: "Digital Bank Data Pipeline (Fintech Simulation)",
    summary: "A learning project simulating part of the data pipeline behind a digital bank, inspired by fintech platforms like Revolut and N26. Modeled a simplified banking data flow  customer onboarding, account and transaction data  streamed through Kafka, processed with Spark, and loaded into SQL Server for analytical reporting in Power BI. The goal was to practice designing a data pipeline that could plausibly scale to handle high transaction volumes, not to reproduce a full banking system.",
    cover: "/banksystem.png",
    tags: [
      "Kafka",
      "Apache Spark",
      "SQL Server",
      "Power BI"
    ],
    githubUrl: "https://github.com/SilverFangXk/digital-bank-data-pipeline",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [
      {
        label: "Overview",
        title: "Digital Bank Data Pipeline (Fintech Simulation)",
        text: "A learning project simulating part of the data pipeline behind a digital bank, inspired by fintech platforms like Revolut and N26. Modeled a simplified banking data flow  customer onboarding, account and transaction data  streamed through Kafka, processed with Spark, and loaded into SQL Server for analytical reporting in Power BI. The goal was to practice designing a data pipeline that could plausibly scale to handle high transaction volumes, not to reproduce a full banking system.",
        image: "/banksystem.png"
      }
    ]
  }
];

// Filter fields for the Projects section (buttons: All, Web, AI, Data Engineering, BI).
// Change them here, or per project in admin -> Projects -> Fields.
const PROJECT_FIELDS = {
  "personal-portfolio": ["Web"],
  "pum-perfect-bouquet": ["Web"],
  "ai-calculator": ["Web", "AI"],
  "atp-tennis-graph-analysis": ["Data Engineering"],
  "airbnb-price-prediction": ["AI", "Data Engineering"],
  "sncf-bi": ["BI", "Data Engineering"],
  "jade-marketplace": ["AI"],
  "jade-traffic-light": ["AI"],
  "ecg-arrhythmia-detection": ["AI"],
  "digital-bank-pipeline": ["Data Engineering", "BI"],
};

export const DEFAULT_PROJECTS = BASE_PROJECTS.map((p) => ({
  ...p,
  fields: PROJECT_FIELDS[p.id] ?? [],
}));

export const DEFAULT_CERTIFICATIONS = [
  {
    id: "kaggle-intro-ml",
    name: "Introduction to Machine Learning",
    issuer: "Kaggle",
    date: "Completed 2025",
    credentialUrl: "https://www.kaggle.com/learn/certification/khadijachkhichkh1/intro-to-machine-learning",
    description: "Covered core machine learning concepts including model building, random forests, data validation, underfitting and overfitting, and competing in Kaggle competitions.",
    image: kaggleCertImg, // local file for now; the admin import uploads it to Cloudinary
    order: 1,
  },
  {
    id: "kaggle-data-cleaning",
    name: "Data Cleaning",
    issuer: "Kaggle",
    date: "Completed 2025",
    credentialUrl: "https://www.kaggle.com/learn/certification/khadijachkhichkh1/data-cleaning",
    description: "Mastered workflows for handling missing values, parsing dates, encoding problematic character sets, correcting inconsistent data entries, and scaling/normalizing features.",
    image: kaggleCertImg2, // local file for now; the admin import uploads it to Cloudinary
    order: 2,
  },
  {
    id: "datacamp-kafka",
    name: "Introduction to Apache Kafka — DataCamp",
    issuer: "DataCamp",
    date: "Completed 2025",
    credentialUrl: "https://www.datacamp.com/statement-of-accomplishment/course/045d11c911a8ae6decf20bbdc141b020475a9931?raw=1",
    description: "Covered the fundamentals of Apache Kafka, including event-driven architecture, real-time data streaming, and building scalable message-based data pipelines for distributed systems.",
    image: dataCampCertImg, // local file for now; the admin import uploads it to Cloudinary
    order: 3,
  },
  {
    id: "udemy-html-css-beginner",
    name: "Mastering HTML5 and CSS3 (Beginner Level)",
    issuer: "Udemy",
    date: "June 2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-7ee3ff26-a06f-40ef-b5b5-2322a7bf06bf/",
    description: "Foundational course covering the basics of HTML5 markup and CSS3 styling.",
    image: htmlBeginnerImg, // local file for now; the admin import uploads it to Cloudinary
    order: 4,
  },
  {
    id: "udemy-html-css-intermediate",
    name: "Mastering HTML5 and CSS3 (Intermediate Level)",
    issuer: "Udemy",
    date: "June 2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-c952e112-2173-429b-ac29-727f84dbe419/",
    description: "Intermediate course focusing on deeper web development techniques and responsive design principles.",
    image: htmlIntermediateImg, // local file for now; the admin import uploads it to Cloudinary
    order: 5,
  },
  {
    id: "udemy-html-css-advanced",
    name: "Mastering HTML5 and CSS3 (Advanced Level)",
    issuer: "Udemy",
    date: "June 2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-9a90d55d-3cf1-48d5-a660-168214b1c0ec/",
    description: "Advanced course covering complex layout techniques, animations, and professional web styling workflows.",
    image: htmlAdvancedImg, // local file for now; the admin import uploads it to Cloudinary
    order: 6,
  },
];

// Contact section (admin -> Contact). The first photo shows first; several photos fade as a slideshow.
// Local files live in /public (so "/meB.jpeg" works); photos uploaded in the admin are Cloudinary links.
export const DEFAULT_CONTACT = {
  email: "khadijachkhichkh1@gmail.com",
  phone: "+212 6 34 76 11 82",
  linkedin: "https://linkedin.com/in/khadija-chkhichkh", // a handle or a full URL both work
  location: "Khémisset, Morocco",
  photos: [{ url: "/meB.jpeg", caption: "" }],
};

// **double asterisks** = highlighted words
export const DEFAULT_EXP_STATUS =
  "currently searching for a **PFE internship in Data Engineering**";