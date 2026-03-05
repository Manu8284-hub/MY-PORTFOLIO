import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's work together.</h2>
        <a href="mailto:hello@example.com" className="text-2xl md:text-4xl text-indigo-400 hover:text-indigo-300 transition border-b-2 border-indigo-400 pb-2">
          manusharma15march2006@gmail.com
        </a>
        
        <div className="mt-12 flex justify-center gap-8 text-zinc-500">
          <a href="https://www.linkedin.com/in/manu-sharma-866372318/" className="hover:text-white transition">LinkedIn</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="https://github.com/Manu8284-hub" className="hover:text-white transition">GitHub</a>
        </div>
        
        <p className="mt-20 text-zinc-600 text-sm">© 2026 MANU SHARMA.</p>
      </div>
    </section>
  );
};

export default Footer;