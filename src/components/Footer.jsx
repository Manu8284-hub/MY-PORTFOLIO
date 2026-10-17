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
    <footer className="bg-[#05060A] text-[#6B7A90] py-12 px-6 border-t border-[#1B2433] font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded border border-[#00FF9C] bg-[#0B0F17] flex items-center justify-center text-[#00FF9C] font-extrabold text-[10px] shadow-[0_0_8px_rgba(0,255,156,0.3)]">
            MS
          </span>
          <span className="text-[#D6E2F0] text-xs font-bold tracking-wider">
            MANU SHARMA // TERMINAL v4.2
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#6B7A90]">
          &copy; {new Date().getFullYear()} Manu Sharma. Cyberpunk HUD &bull; React 19 &bull; Tailwind CSS v4 &bull; Matter.js &bull; Lenis.
        </p>

        {/* Quick Back-to-Top Button */}
        <button
          onClick={handleScrollToTop}
          className="cyber-bracket flex items-center gap-2 px-4 py-2 bg-[#0B0F17] hover:bg-[#111723] border border-[#1B2433] hover:border-[#00FF9C] rounded text-xs font-bold text-[#D6E2F0] hover:text-[#00FF9C] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          aria-label="Back to Top"
        >
          <span>[ TOP ]</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;