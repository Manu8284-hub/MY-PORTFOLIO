const About = () => {
  return (
    <section className="pt-28 pb-24 min-h-screen bg-zinc-900/50 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-indigo-400 font-medium mb-4 tracking-wide uppercase text-sm">
          About Me
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif">
          Building real-world products across <span className="text-zinc-400">hardware and software</span>.
        </h1>

        <p className="text-zinc-300 text-lg leading-relaxed mb-8">
          I am Manu Sharma, a developer focused on practical, user-centered solutions. My strongest project is a
          Human-Following Suitcase using ESP32, ultrasonic sensors, and motor control logic. Alongside embedded systems,
          I build modern web applications using HTML, CSS, JavaScript, React, and Vite.
        </p>

        <div className="mb-10">
          <a
            href="public/RESUME (2).pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center bg-white text-black px-7 py-3 rounded-full font-semibold hover:bg-zinc-200 transition"
          >
            See My Resume
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Core Skills</h2>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Embedded systems and sensor integration</li>
              <li>Motor driver and real-time control logic</li>
              <li>Frontend development with React and responsive UI</li>
              <li>Version control and project sharing with GitHub</li>
            </ul>
          </article>

          <article className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Currently Learning</h2>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Node.js and Express.js backend fundamentals</li>
              <li>File handling and streaming in server-side apps</li>
              <li>Full-stack development workflow</li>
              <li>Scalable project structure and clean architecture</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
