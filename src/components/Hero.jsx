import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="text-indigo-400 font-medium mb-4 tracking-wide uppercase text-sm">
          SOFTWARE ENGINEER | VIDEO EDITOR 
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Designing digital <br />
          experiences that <span className="text-zinc-500">matter.</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          I craft clean, user-centric interfaces and robust code. Currently building the future of web interaction.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/projects" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-200 transition shadow-lg shadow-white/10 hover:shadow-white/20">
            View Projects
          </Link>
          <Link to="/contact" className="border border-zinc-700 bg-zinc-900/50 px-8 py-3 rounded-full font-semibold hover:border-white transition">
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;