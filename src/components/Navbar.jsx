import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
          isScrolled
            ? 'border-zinc-700/80 bg-zinc-950/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0_0_0_/_0.25)]'
            : 'border-transparent bg-zinc-950/30 backdrop-blur-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter hover:text-indigo-300 transition-colors">
            MANU SHARMA.
          </Link>
          
          <div className="hidden md:flex space-x-8 text-sm text-zinc-400">
            <Link to="/projects" className="hover:text-white transition px-2 py-1 rounded-md hover:bg-white/5">Work</Link>
            <Link to="/about" className="hover:text-white transition px-2 py-1 rounded-md hover:bg-white/5">About</Link>
            <Link to="/contact" className="hover:text-white transition px-2 py-1 rounded-md hover:bg-white/5">Contact</Link>
          </div>

          <div className="flex items-center space-x-4 text-zinc-400">
            <a href="https://github.com/Manu8284-hub" className="hover:text-white hover:scale-110 transition-transform"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/manu-sharma-866372318/" className="hover:text-white hover:scale-110 transition-transform"><Linkedin size={20} /></a>
            <button
              type="button"
              onClick={() => setIsPhotoOpen(true)}
              className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-900/80 overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              aria-label="Open profile photo"
            >
              <img
                src="/2410990448.jpg"
                alt="Manu Sharma"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </nav>

      {isPhotoOpen ? (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setIsPhotoOpen(false)}
        >
          <img
            src="/2410990448.jpg"
            alt="Manu Sharma enlarged"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl border border-zinc-700 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;