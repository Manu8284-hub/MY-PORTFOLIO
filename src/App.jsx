import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Contact from './components/Contact';

const projects = [
  {
    title: "Human-Following Suitcase",
    tag: "Most Important Hardware Project",
    image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1600&auto=format&fit=crop",
    overview:
      "Designed a smart suitcase that automatically follows its owner in places like airports, railway stations, and campuses so luggage does not need to be dragged manually.",
    technologies: [
      "ESP32 microcontroller (system brain)",
      "Ultrasonic sensors (distance measurement and user detection)",
      "DC motors (wheel movement)",
      "Motor driver module (speed and direction control)",
      "Battery supply (portable power)",
    ],
    workingPrinciple: [
      "Ultrasonic sensors detect distance between suitcase and user.",
      "ESP32 processes distance data in real time.",
      "When user moves forward, controller sends commands to motor driver.",
      "DC motors rotate wheels so suitcase follows the user.",
      "On obstacle detection, suitcase adjusts direction or stops.",
    ],
    skills: [
      "Embedded systems",
      "Sensor integration",
      "Motor control",
      "Hardware-software interaction",
      "Real-time system logic",
      "Technical presentation and explanation",
    ],
  },
  {
    title: "Campus Connect Hub",
    tag: "GitHub Project",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    overview:
      "Built a web platform repository intended for managing and connecting campus activities, clubs, and communities.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js (backend concepts)"],
    contributions: [
      "Created and configured the GitHub repository.",
      "Uploaded and structured project source code.",
      "Made the repository public for sharing.",
      "Shared project access and ZIP download workflow.",
    ],
    skills: [
      "GitHub usage",
      "Project sharing",
      "Version control basics",
      "Web project structuring",
    ],
    repository: "https://github.com/Manu8284-hub/campus-connect-hub",
  },
  {
    title: "E-Commerce Website",
    tag: "Frontend Web Project",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop",
    overview:
      "Developed an online shopping website with a complete user flow from product browsing to checkout.",
    features: [
      "Product listing",
      "Add to cart functionality",
      "Shopping cart page",
      "Payment flow",
      "Structured frontend code",
    ],
    cssStructure: [
      "index.css (homepage styles)",
      "cart.css (cart styles)",
      "payment.css (payment styles)",
      "shared.css (common reusable styles)",
    ],
    designStyle: [
      "Light backgrounds",
      "Bold accent color usage (for example #9b59b6)",
      "Responsive layout",
    ],
    skills: [
      "Frontend web development",
      "UI design principles",
      "Modular CSS architecture",
      "Basic e-commerce logic",
    ],
  },
  {
    title: "React Website",
    tag: "Modern Frontend Learning Project",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
    overview:
      "Started React.js development using Vite and moved from static pages to component-based frontend architecture.",
    technologies: ["React.js", "Vite", "JavaScript", "Component-based architecture"],
    contributions: [
      "Created organized folder structure inside src.",
      "Built reusable UI components.",
      "Ran and managed local development server.",
    ],
    skills: [
      "React fundamentals",
      "Project organization",
      "Component-driven development",
    ],
  },
  {
    title: "Backend Concepts (Node.js & Express)",
    tag: "Ongoing Learning",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1600&auto=format&fit=crop",
    overview:
      "Currently learning backend fundamentals to move toward full-stack development.",
    technologies: ["Node.js", "Express.js"],
    learningFocus: [
      "Handling requests with Express.js",
      "Serving static files",
      "File handling",
      "File streaming",
    ],
    skills: ["Backend basics", "Server-side logic", "Full-stack readiness"],
  },
];

function App() {
  return (
    <Router>
      <div className="bg-transparent min-h-screen text-zinc-100 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Footer />
            </>
          } />

          <Route
            path="/projects"
            element={
              <>
                <section className="pt-28 pb-24 bg-zinc-900/50 min-h-screen">
                  <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Selected Work</h2>

                    <div className="space-y-6">
                      {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                      ))}
                    </div>
                  </div>
                </section>
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <About />
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;