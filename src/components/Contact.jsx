import { Mail, Linkedin, Github, Send, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolioData';

// User's working EmailJS credentials with environment override support
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'APB6ajSLgGPRUfN_l';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_qg1kwwo';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_lm0bbfi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    try {
      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error('Email service credentials are not configured.');
      }

      const templateParams = {
        to_email: personalInfo.email,
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setStatus('success');
      setStatusMessage('Message sent successfully! I will respond to your email shortly.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 7000);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      
      const errMsg = error?.text || error?.message || '';
      if (errMsg.includes('Invalid grant') || errMsg.includes('reconnect your Gmail')) {
        setStatusMessage(
          'EmailJS Gmail service connection expired: Gmail token needs reconnection in the EmailJS dashboard. You can send directly using the button below:'
        );
      } else {
        setStatusMessage(
          errMsg || `Failed to send automatically. Please use the direct email link below.`
        );
      }
    }
  };

  const directMailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-100/10 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
              Contact Me
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block mb-3" />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-3xl shadow-sm bg-white/80 dark:bg-slate-900/80 space-y-6 border border-slate-200/60 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Send Me a Message</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Have an opportunity, internship, or project to discuss? Fill out the form below.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 font-medium text-sm"
                    placeholder="E.g., Alex Johnson"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 font-medium text-sm"
                    placeholder="E.g., alex@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 resize-none font-medium text-sm"
                    placeholder="E.g., Hi Manu, we love your work and would like to discuss an engineering role..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-blue-500/20 cursor-pointer text-sm"
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

              {/* Status Alert with a11y Live Region & One-Click Fallback */}
              {statusMessage && (
                <motion.div
                  role="alert"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-xs font-semibold leading-relaxed border space-y-2.5 ${
                    status === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
                  }`}
                >
                  <p>{statusMessage}</p>
                  
                  {status === 'error' && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href={directMailtoLink}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>Open in Email App with Message</span>
                        <ExternalLink size={13} />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span>Email Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Manu&apos;s Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Quick Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email Contact Card */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="block glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-premium-hover hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-slate-900"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Direct Email</h4>
                  <p className="text-slate-800 dark:text-slate-200 font-extrabold text-sm sm:text-base break-all mt-0.5">
                    {personalInfo.email}
                  </p>
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-premium-hover hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-slate-900"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Linkedin size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">LinkedIn</h4>
                  <p className="text-slate-800 dark:text-slate-200 font-extrabold text-sm sm:text-base mt-0.5">
                    Connect Professionally
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="block glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-premium-hover hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-slate-900"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Github size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">GitHub Profile</h4>
                  <p className="text-slate-800 dark:text-slate-200 font-extrabold text-sm sm:text-base mt-0.5">
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
