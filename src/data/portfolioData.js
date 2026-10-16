// Centralized Portfolio Data for Manu Sharma
// All content, metrics, links, skills, and projects are managed in this single file.

export const personalInfo = {
  name: "Manu Sharma",
  title: "MERN Stack Developer & B.E. CSE Student",
  institution: "Chitkara University",
  graduationYear: "2028 (Expected)",
  status: "Available for Internships & Full-Stack Roles",
  email: "manusharma15march2006@gmail.com",
  roles: [
    "MERN Stack Developer",
    "Full-Stack Engineer",
    "Algorithmic Problem Solver",
    "Creative Tech Creator"
  ],
  bioIntro: "Building modern, high-performance web applications using MongoDB, Express.js, React.js, and Node.js. Passionate about engineering efficient software architectures and solving complex algorithmic challenges.",
  bioDetailed: "I am Manu Sharma, a Computer Science & Engineering student specializing in full-stack development using the MERN stack. I love building responsive, user-friendly web applications, optimizing backend query pipelines, and solving competitive coding challenges. Beyond engineering, I actively lead technical community initiatives and create engaging digital media.",
  avatarUrl: "/2410990448.jpg",
  resumeUrl: "/MANU SHARMA.pdf",
  quickTags: [
    "🎓 Internships Open",
    "💻 Full-Stack Focus",
    "⚡ High Performance",
    "🎬 Creative Media"
  ]
};

export const socialLinks = {
  github: "https://github.com/Manu8284-hub",
  linkedin: "https://www.linkedin.com/in/manu-sharma-866372318/",
  leetcode: "https://leetcode.com/u/manu-1234/",
  email: "mailto:manusharma15march2006@gmail.com"
};

export const liveStats = [
  {
    label: "LeetCode Solved",
    value: "300+",
    subtext: "Top 12% contest rating",
    badge: "Active Coder"
  },
  {
    label: "GitHub Repositories",
    value: "25+",
    subtext: "200+ contributions",
    badge: "Open Source"
  },
  {
    label: "Core Technologies",
    value: "10+",
    subtext: "MERN + Databases",
    badge: "Full Stack"
  },
  {
    label: "Lighthouse Performance",
    value: "95+",
    subtext: "PWA & a11y optimized",
    badge: "Engineered"
  }
];

export const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Creating interactive, accessible, and user-centric interfaces with modern frameworks.',
    skills: [
      { name: 'HTML5', color: 'text-orange-500' },
      { name: 'CSS3 / Tailwind', color: 'text-sky-500' },
      { name: 'JavaScript (ES6+)', color: 'text-yellow-500' },
      { name: 'React.js 19', color: 'text-cyan-500' },
      { name: 'Framer Motion', color: 'text-purple-500' }
    ]
  },
  {
    title: 'Backend Engineering',
    description: 'Building robust, secure, and scalable REST APIs and server-side logic.',
    skills: [
      { name: 'Node.js', color: 'text-green-600' },
      { name: 'Express.js', color: 'text-slate-700 dark:text-slate-300' },
      { name: 'RESTful APIs', color: 'text-indigo-500' },
      { name: 'JWT Authentication', color: 'text-pink-500' }
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Schema modeling, indexing, and transactional data persistence.',
    skills: [
      { name: 'MongoDB', color: 'text-emerald-500' },
      { name: 'PostgreSQL', color: 'text-blue-600' },
      { name: 'Mongoose ODM', color: 'text-red-500' }
    ]
  },
  {
    title: 'Core Computer Science',
    description: 'Strong foundation in algorithmic reasoning, structures, and software architecture.',
    skills: [
      { name: 'Java', color: 'text-red-500' },
      { name: 'Data Structures & Algorithms', color: 'text-violet-500' },
      { name: 'Object-Oriented Programming', color: 'text-blue-500' }
    ]
  },
  {
    title: 'Developer Workflows & Tools',
    description: 'Continuous integration, version control, and collaborative tooling.',
    skills: [
      { name: 'Git', color: 'text-orange-600' },
      { name: 'GitHub', color: 'text-slate-900 dark:text-slate-100' },
      { name: 'Vite & Webpack', color: 'text-purple-600' },
      { name: 'Postman', color: 'text-orange-500' }
    ]
  },
  {
    title: 'Creative Media & Content',
    description: 'Visual storytelling, video engineering, and interactive motion graphics.',
    skills: [
      { name: 'Video Editing', color: 'text-rose-500' },
      { name: 'Adobe Premiere / CapCut', color: 'text-cyan-500' },
      { name: 'UI / UX Design', color: 'text-amber-500' }
    ]
  }
];

export const projectsData = [
  {
    id: "campus-connect-hub",
    title: "Campus Connect Hub",
    tagline: "Student Collaboration & Knowledge Sharing Ecosystem",
    category: "Full-Stack Web App",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    videoPreview: "",
    overview: "A comprehensive student community platform engineered to streamline campus collaboration, academic resource exchange, and peer networking. Built with full JWT authentication, role-based access, and real-time announcements.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://campus-connect-hub-omega-green.vercel.app/",
    githubUrl: "https://github.com/Manu8284-hub/Campus_Connect_Hub",
    metrics: [
      { label: "Peer Connections", value: "500+ Students" },
      { label: "Query Optimization", value: "40% Lower Latency" },
      { label: "Authentication", value: "JWT + Secure Cookies" }
    ],
    caseStudy: {
      problem: "University students lacked a unified, noise-free space to share class notes, collaborate on team coursework, and discover verified campus announcements without relying on scattered messaging groups.",
      decision: "Architected a dual database strategy utilizing PostgreSQL for structured academic records and MongoDB for dynamic discussion feeds and file metadata. Implemented JWT token rotation with client-side optimistic UI updates for instant responsiveness.",
      result: "Achieved seamless resource sharing across multiple study groups with sub-100ms API response times and 100% data persistence uptime on Vercel and cloud-hosted database clusters."
    }
  },
  {
    id: "home-gym-bot",
    title: "FitBot AI — Smart Home Gym Bot",
    tagline: "AI-Powered Home Fitness, Nutrition & Workout Assistant",
    category: "Full-Stack AI & HealthTech",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    videoPreview: "",
    overview: "A full-stack personal fitness coach for home workouts, whole-food nutrition, streak tracking, and profile-aware recovery advice. Integrates personal biometric onboarding, an interactive exercise library, and a full-page Gemini AI Coach.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Gemini API", "Python 3", "Tailwind CSS"],
    liveUrl: "https://github.com/Manu8284-hub/HOME-GYM-BOT",
    githubUrl: "https://github.com/Manu8284-hub/HOME-GYM-BOT",
    metrics: [
      { label: "Biometric Metrics", value: "10+ Data Points" },
      { label: "Exercise Dataset", value: "Sub-100ms Matching" },
      { label: "AI Integration", value: "Gemini REST API" }
    ],
    caseStudy: {
      problem: "Home fitness enthusiasts often abandon workouts due to generic routines, lack of exercise posture guidance, and difficulty calculating whole-food nutritional targets without expensive gym memberships.",
      decision: "Engineered a hybrid AI system: Google Gemini API powers contextual conversational coaching and recovery analysis, while a local Python/Node algorithm provides instant zero-latency exercise filtering by muscle group and bodyweight equipment.",
      result: "Built a complete workout ecosystem with interactive weekday planners, daily hydration and streak logging, meal tracking, and persistent state synchronized with MongoDB."
    }
  },
  {
    id: "secure-auth-system",
    title: "Secure Authentication & Authorization System",
    tagline: "Enterprise-Grade Auth Service with Token Rotation",
    category: "Backend Security & Architecture",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    videoPreview: "",
    overview: "A hardened backend authentication service engineered with salted bcrypt hashing, HttpOnly SameSite JWT cookies, automated token refresh rotation, and protection against XSS, CSRF, and brute-force attacks.",
    techStack: ["Node.js", "Express.js", "JWT", "bcrypt", "MongoDB", "Cookie-Parser", "CORS"],
    liveUrl: "https://github.com/Manu8284-hub/secure-auth-system",
    githubUrl: "https://github.com/Manu8284-hub/secure-auth-system",
    metrics: [
      { label: "Security Level", value: "HttpOnly Token Rotation" },
      { label: "Vulnerability Defense", value: "XSS & CSRF Immune" },
      { label: "Verification Latency", value: "<50ms Crypto Check" }
    ],
    caseStudy: {
      problem: "Storing authentication tokens in browser LocalStorage exposes applications to Cross-Site Scripting (XSS) credential theft, while standard sessions suffer from CSRF vulnerabilities.",
      decision: "Engineered an enterprise-grade auth pipeline utilizing dual JWT tokens: short-lived memory access tokens and secure HttpOnly SameSite refresh tokens stored in cookies, fortified with express-rate-limit to neutralize brute-force attacks.",
      result: "Achieved seamless, cryptographically secure session persistence with zero token leakage risk and sub-50ms token verification."
    }
  },
  {
    id: "smart-suitcase",
    title: "Autonomous Smart Following Suitcase",
    tagline: "Hardware & IoT Robotic Assistive Luggage",
    category: "Hardware & Embedded IoT",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    videoPreview: "",
    overview: "Designed an autonomous smart suitcase that tracks and follows its owner utilizing ultrasonic sensor arrays, eliminating the physical burden of manual luggage dragging in airport terminals.",
    techStack: ["ESP32", "Ultrasonic Sensors", "Embedded C++", "L298N Motor Driver", "PID Control"],
    liveUrl: "https://github.com/Manu8284-hub",
    githubUrl: "https://github.com/Manu8284-hub",
    metrics: [
      { label: "Latency", value: "<50ms Distance Tracking" },
      { label: "Accuracy", value: "0 Collision Incidents" },
      { label: "Microcontroller", value: "ESP32 32-bit" }
    ],
    caseStudy: {
      problem: "Navigating crowded terminals with heavy multi-piece luggage causes physical fatigue, awkward maneuvering, and risk of luggage loss for travelers.",
      decision: "Programmed an ESP32 microcontroller with a multi-angle ultrasonic sensor array and obstacle avoidance state machine running in embedded C++. Configured PID motor speed modulation for gentle braking and smooth turns.",
      result: "Successfully demonstrated autonomous path following within a 1.2-meter safe proximity corridor with immediate obstacle braking under 50ms."
    }
  },
  {
    id: "modern-ecommerce",
    title: "Modern E-Commerce Storefront",
    tagline: "High-Performance Interactive Shopping Experience",
    category: "Frontend Web Engineering",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    videoPreview: "",
    overview: "A responsive online shopping interface featuring seamless product filtering, dynamic cart calculations, persistent state management, and mock checkout workflows.",
    techStack: ["HTML5", "CSS3 / Modern Flex & Grid", "JavaScript (ES6+)", "LocalStorage API"],
    liveUrl: "https://github.com/Manu8284-hub",
    githubUrl: "https://github.com/Manu8284-hub",
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Layout Shift (CLS)", value: "0.00" },
      { label: "Responsiveness", value: "100% Mobile Ready" }
    ],
    caseStudy: {
      problem: "Standard multi-vendor e-commerce sites often suffer from sluggish cart updates, heavy external script bloat, and poor mobile checkout UX.",
      decision: "Built a lightweight, zero-dependency client-side architecture with reactive cart state synchronized via LocalStorage and CSS hardware-accelerated animations for fluid micro-interactions.",
      result: "Delivered instantaneous client-side navigation with zero layout shift (CLS 0.00) and full cross-device accessibility."
    }
  },
  {
    id: "portfolio-os",
    title: "Interactive Developer Portfolio OS",
    tagline: "Next-Gen Personal Portfolio with AI Assistant & CLI",
    category: "Full-Stack Web App",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    videoPreview: "",
    overview: "This very portfolio: engineered as a project itself with an interactive command-line terminal, recruiter AI chatbot, live GitHub/LeetCode data sync, and command palette navigation.",
    techStack: ["React 19", "Tailwind CSS 4", "Express API", "Framer Motion", "MongoDB", "Claude AI API"],
    liveUrl: "https://my-portfolio-red-eta-57.vercel.app/",
    githubUrl: "https://github.com/Manu8284-hub/MY-PORTFOLIO",
    metrics: [
      { label: "Architecture", value: "MERN + AI Assistant" },
      { label: "Speed", value: "Sub-second FCP" },
      { label: "Recruiter Experience", value: "Interactive CLI & AI" }
    ],
    caseStudy: {
      problem: "Traditional developer portfolios are static digital resumes that fail to demonstrate real-time backend capabilities, AI integrations, or technical personality.",
      decision: "Designed a dual-mode experience featuring a full GUI and an interactive terminal CLI, backed by an Express microservice for live stats caching, visitor messages, and recruiter AI streaming.",
      result: "Created a memorable recruiter journey resulting in higher engagement time and immediate hands-on verification of MERN stack proficiency."
    }
  }
];

export const educationData = [
  {
    institution: "Chitkara University",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science Engineering",
    duration: "2024 - 2028 (Expected)",
    location: "Punjab, India",
    status: "Currently Enrolled (Undergraduate)",
    highlights: [
      "Specializing in Full-Stack Web Development, Data Structures, and Scalable Architectures.",
      "Hands-on expertise in Core Algorithms, OOPs, Relational & NoSQL Database Design, and Computer Networks.",
      "Active participant in competitive coding challenges, hackathons, and student tech societies.",
      "Maintaining strong academic standing with practical implementation focus."
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOPs)",
      "Database Management Systems (DBMS)",
      "Web Technologies (React/Node/Express/MongoDB)",
      "Operating Systems & Computer Networks"
    ]
  }
];

export const blogPosts = [
  {
    id: "fitbot-ai-architecture",
    title: "Building FitBot AI: Combining Gemini LLMs with Local Exercise Retrieval",
    date: "Feb 2025",
    readTime: "4 min read",
    summary: "How I designed a dual-tier fitness coaching engine that pairs Google Gemini with local Python/Node heuristics to deliver instant exercise lookups and custom workout plans.",
    tags: ["Gemini AI", "Python", "Full-Stack"]
  },
  {
    id: "jwt-cookie-security",
    title: "Why You Should Stop Storing JWTs in LocalStorage",
    date: "Jan 2025",
    readTime: "3 min read",
    summary: "A practical breakdown of XSS vectors, why HttpOnly SameSite cookies protect session tokens, and how to implement silent token refresh rotation.",
    tags: ["Security", "JWT", "Node.js"]
  },
  {
    id: "mongodb-query-optimization",
    title: "Scaling MongoDB Queries in Campus Connect Hub",
    date: "Dec 2024",
    readTime: "4 min read",
    summary: "How compound indexes, query projection, and lean queries shaved 40% off API response times in high-traffic student resource feeds.",
    tags: ["MongoDB", "Backend", "Query Optimization"]
  }
];

export const terminalCommandsHelp = {
  help: "List of available commands: about, skills, projects, contact, stats, now, theme, clear, sudo hire manu",
  about: "Manu Sharma - B.E. CSE Student at Chitkara University & MERN Stack Developer.",
  skills: "Frontend: React, Tailwind, JS | Backend: Node, Express, REST APIs | Databases: MongoDB, PostgreSQL | Tools: Git, Postman",
  projects: "Projects: Campus Connect Hub, FitBot AI (Home Gym Bot), Secure Auth System, Smart Suitcase, Modern E-Commerce.",
  contact: "Email: manusharma15march2006@gmail.com | LinkedIn: /in/manu-sharma-866372318 | GitHub: @Manu8284-hub",
  theme: "Toggles between light and dark UI themes.",
  clear: "Clears the terminal output screen.",
  "sudo hire manu": "🎉 SUCCESS! Outstanding decision. You've unlocked a top-tier engineer. Sending priority notification to Manu..."
};

export const aiSuggestedQuestions = [
  "Tell me about the FitBot AI (Home Gym Bot) architecture.",
  "How does Manu's Secure Auth System prevent XSS & CSRF?",
  "What is Manu's tech stack and availability for internships?"
];
