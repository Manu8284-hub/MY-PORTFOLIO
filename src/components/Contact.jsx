import { Mail, Linkedin, Github } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [statusMessage, setStatusMessage] = useState('');

  // Initialize EmailJS with your public key
  // Get your keys from: https://www.emailjs.com/
  // Replace 'YOUR_PUBLIC_KEY' with your actual public key
  const PUBLIC_KEY = 'APB6ajSLgGPRUfN_l';
  const SERVICE_ID = 'service_qg1kwwo';
  const TEMPLATE_ID = 'template_lm0bbfi';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    try {
      if (PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS not configured. Please set up your PUBLIC_KEY, SERVICE_ID, and TEMPLATE_ID in Contact.jsx');
      }

      emailjs.init(PUBLIC_KEY);

      const templateParams = {
        to_email: 'manusharma15march2006@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      setStatus('success');
      setStatusMessage('Email sent! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setStatusMessage(error.message || 'Failed to send email. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="pt-28 pb-24 min-h-screen bg-zinc-900/50 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-indigo-400 font-medium mb-4 tracking-wide uppercase text-sm">Contact</p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Let&apos;s build something <span className="text-zinc-400">great together</span>.
        </h1>

        <p className="text-zinc-300 text-lg leading-relaxed mb-10">
          I&apos;m open to internships, freelance work, and collaboration opportunities in web development and embedded systems.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mb-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-zinc-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-400 transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-zinc-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-400 transition"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-zinc-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-400 transition resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-zinc-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {statusMessage && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-900/30 border border-green-700 text-green-300'
                : 'bg-red-900/30 border border-red-700 text-red-300'
            }`}>
              {statusMessage}
            </div>
          )}
        </form>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=manusharma15march2006@gmail.com"
            target="_blank"
            rel="noreferrer"
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
