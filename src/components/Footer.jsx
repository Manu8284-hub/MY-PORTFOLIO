import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 dark:bg-[#070b12] dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm">
            MS
          </span>
          <span className="text-white text-sm font-bold tracking-wider uppercase">
            Manu Sharma
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm font-medium">
          © {new Date().getFullYear()} Manu Sharma. Engineered with React 19 &amp; Tailwind CSS.
        </p>

        {/* Quick Back-to-Top Button */}
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold text-slate-300 transition-all duration-300 cursor-pointer shadow-md"
          aria-label="Back to Top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;