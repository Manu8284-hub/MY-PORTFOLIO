import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  return (
    <section className="pt-28 pb-24 min-h-screen bg-zinc-900/50 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-indigo-400 font-medium mb-4 tracking-wide uppercase text-sm">Contact</p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-serif">
          Let&apos;s build something <span className="text-zinc-400">great together</span>.
        </h1>

        <p className="text-zinc-300 text-lg leading-relaxed mb-10">
          I&apos;m open to internships, freelance work, and collaboration opportunities in web development and embedded systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="mailto:manusharma15march2006@gmail.com"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-400/50 transition"
          >
            <div className="flex items-center gap-3 text-indigo-300 mb-3">
              <Mail size={20} />
              <h2 className="text-xl font-semibold text-white">Email</h2>
            </div>
            <p className="text-zinc-300 break-all">manusharma15march2006@gmail.com</p>
          </a>

          <a
            href="https://www.linkedin.com/in/manu-sharma-866372318/"
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-400/50 transition"
          >
            <div className="flex items-center gap-3 text-indigo-300 mb-3">
              <Linkedin size={20} />
              <h2 className="text-xl font-semibold text-white">LinkedIn</h2>
            </div>
            <p className="text-zinc-300">Connect with me professionally</p>
          </a>

          <a
            href="https://github.com/Manu8284-hub"
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-400/50 transition md:col-span-2"
          >
            <div className="flex items-center gap-3 text-indigo-300 mb-3">
              <Github size={20} />
              <h2 className="text-xl font-semibold text-white">GitHub</h2>
            </div>
            <p className="text-zinc-300">View my projects, code repositories, and ongoing work.</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
