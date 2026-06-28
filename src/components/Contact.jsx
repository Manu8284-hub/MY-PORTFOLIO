import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [statusMessage, setStatusMessage] = useState('');

  // EmailJS configuration keys (from existing project setup)
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
      if (!PUBLIC_KEY || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS keys are not configured.');
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
      setStatusMessage('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      setStatus('error');
      setStatusMessage(error.message || 'Failed to send message. Please email me directly.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              Contact Me
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full hidden md:block mb-3" />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-3xl shadow-sm bg-white/80 space-y-6 border border-slate-200/60">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Send Me a Message</h3>
                <p className="text-slate-500 text-sm">Fill out the form below, and I will respond to your email shortly.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-200 font-medium text-sm"
                    placeholder="E.g., John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-200 font-medium text-sm"
                    placeholder="E.g., john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-200 resize-none font-medium text-sm"
                    placeholder="E.g., Hello, I would like to inquire about..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer text-sm"
              >
                {status === 'sending' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {/* Status Alert box */}
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-xs font-semibold leading-relaxed border ${
                    status === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  {statusMessage}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Quick Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email Contact Card */}
            <a
              href="mailto:manusharma15march2006@gmail.com"
              className="block glass-card p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-premium-hover hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 bg-white"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Email</h4>
                  <p className="text-slate-800 font-extrabold text-sm sm:text-base break-all mt-0.5">
                    manusharma15march2006@gmail.com
                  </p>
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/manu-sharma-866372318/"
              target="_blank"
              rel="noreferrer"
              className="block glass-card p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-premium-hover hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 bg-white"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Linkedin size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">LinkedIn</h4>
                  <p className="text-slate-800 font-extrabold text-sm sm:text-base mt-0.5">
                    Connect Professionally
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/Manu8284-hub"
              target="_blank"
              rel="noreferrer"
              className="block glass-card p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-premium-hover hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 bg-white"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Github size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">GitHub Profile</h4>
                  <p className="text-slate-800 font-extrabold text-sm sm:text-base mt-0.5">
                    Explore Code Repositories
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
