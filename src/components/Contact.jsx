import { useState } from 'react';
import { Mail, Linkedin, Github, Send, ExternalLink, Copy, Check, Terminal, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { personalInfo, socialLinks } from '../data/portfolioData';
import TerminalPromptHeader from './TerminalPromptHeader';

// TODO: Connect and configure production Email service credentials here
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'APB6ajSLgGPRUfN_l';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_qg1kwwo';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_lm0bbfi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'OPERATOR NAME REQUIRED';
    if (!formData.email.trim()) {
      newErrors.email = 'TRANSMISSION ADDR REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'INVALID ADDR SYNTAX';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'PAYLOAD TOO SHORT (MIN 10 CHARS)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setStatusMessage('');

    try {
      // TODO: Connect your backend endpoint or EmailJS webhook here
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
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setStatusMessage('PACKET TRANSMITTED SUCCESSFULLY. ACK RECEIVED.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 8000);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      const errMsg = error?.text || error?.message || '';
      if (errMsg.includes('Invalid grant') || errMsg.includes('reconnect your Gmail')) {
        setStatusMessage(
          'EmailJS Gmail service connection expired: Gmail token needs reconnection. Use direct email transmission below:'
        );
      } else {
        setStatusMessage(
          errMsg || 'TRANSMISSION FAILED. Please route via direct email protocol below.'
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
    <section id="contact" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <TerminalPromptHeader
          title="CONTACT"
          tag="// 07 TRANSMIT"
          subtitle="Open terminal uplink, dispatch project proposals, or establish professional connection."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          {/* Terminal Console Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="cyber-bracket cyber-card rounded-lg bg-[#0B0F17] border border-[#1B2433] shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Form Terminal Bar */}
              <div className="px-5 py-3 bg-[#05060A] border-b border-[#1B2433] flex items-center justify-between text-xs text-[#6B7A90]">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#00FF9C]" />
                  <span className="text-[#D6E2F0]">dispatch_packet.sh [PORT 443]</span>
                </div>
                <span className="text-[10px] text-[#00FF9C]">STATUS: LISTENING</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#D6E2F0] font-['Space_Grotesk']">
                    Dispatch Transmission
                  </h3>
                  <p className="text-xs text-[#6B7A90] mt-1">
                    Enter payload details below. Payload verified before socket dispatch.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="flex items-center justify-between text-xs font-bold text-[#D6E2F0] mb-1.5">
                      <span>&gt; SENDER_NAME:</span>
                      {errors.name && <span className="text-[#FF2BD6] text-[10px]">{errors.name}</span>}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-[#05060A] border rounded text-xs font-mono text-[#D6E2F0] placeholder-[#6B7A90] focus:outline-none transition-colors ${
                        errors.name ? 'border-[#FF2BD6]' : 'border-[#1B2433] focus:border-[#00FF9C]'
                      }`}
                      placeholder="e.g. Alex Johnson"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="flex items-center justify-between text-xs font-bold text-[#D6E2F0] mb-1.5">
                      <span>&gt; SENDER_EMAIL:</span>
                      {errors.email && <span className="text-[#FF2BD6] text-[10px]">{errors.email}</span>}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-[#05060A] border rounded text-xs font-mono text-[#D6E2F0] placeholder-[#6B7A90] focus:outline-none transition-colors ${
                        errors.email ? 'border-[#FF2BD6]' : 'border-[#1B2433] focus:border-[#00FF9C]'
                      }`}
                      placeholder="e.g. alex@company.com"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="flex items-center justify-between text-xs font-bold text-[#D6E2F0] mb-1.5">
                      <span>&gt; PAYLOAD_BODY:</span>
                      {errors.message && <span className="text-[#FF2BD6] text-[10px]">{errors.message}</span>}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2.5 bg-[#05060A] border rounded text-xs font-mono text-[#D6E2F0] placeholder-[#6B7A90] focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-[#FF2BD6]' : 'border-[#1B2433] focus:border-[#00FF9C]'
                      }`}
                      placeholder="e.g. Hi Manu, we are building a full-stack system and would love to collaborate..."
                    />
                  </div>
                </div>

                {/* Transmit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="cyber-bracket cyber-button-sweep w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-extrabold font-mono rounded text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="animate-pulse">&gt;&gt; TRANSMITTING DATA PACKETS...</span>
                  ) : (
                    <>
                      <span>[ TRANSMIT PACKET ]</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

                {/* Status Alert with Animation */}
                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      role="alert"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={`p-4 rounded text-xs font-mono leading-relaxed border space-y-2.5 ${
                        status === 'success'
                          ? 'bg-[#00FF9C]/10 border-[#00FF9C] text-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.2)]'
                          : 'bg-[#FF2BD6]/10 border-[#FF2BD6] text-[#FF2BD6]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        {status === 'success' ? (
                          <Check size={14} className="text-[#00FF9C]" />
                        ) : (
                          <AlertCircle size={14} className="text-[#FF2BD6]" />
                        )}
                        <span>{statusMessage}</span>
                      </div>

                      {status === 'error' && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          <a
                            href={directMailtoLink}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black rounded text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <span>Open Mail Client</span>
                            <ExternalLink size={12} />
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#05060A] border border-[#1B2433] hover:border-[#00FF9C] text-[#D6E2F0] rounded text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <Check size={12} className="text-[#00FF9C]" />
                                <span className="text-[#00FF9C]">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Copy Email</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Direct Comms Links (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Direct Email Card */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="cyber-bracket cyber-card block p-5 rounded-lg border border-[#1B2433] hover:border-[#00FF9C] bg-[#0B0F17] transition-all group"
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded bg-[#05060A] border border-[#00FF9C]/40 flex items-center justify-center text-[#00FF9C] shrink-0 group-hover:shadow-[0_0_12px_rgba(0,255,156,0.3)] transition-shadow">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A90]">
                    // DIRECT EMAIL UPLINK
                  </h4>
                  <p className="text-[#D6E2F0] font-bold text-xs sm:text-sm break-all mt-0.5 group-hover:text-[#00FF9C] transition-colors">
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
              className="cyber-bracket cyber-card block p-5 rounded-lg border border-[#1B2433] hover:border-[#00D9FF] bg-[#0B0F17] transition-all group"
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded bg-[#05060A] border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shrink-0 group-hover:shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-shadow">
                  <Linkedin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A90]">
                    // LINKEDIN NETWORK
                  </h4>
                  <p className="text-[#D6E2F0] font-bold text-xs sm:text-sm mt-0.5 group-hover:text-[#00D9FF] transition-colors">
                    Connect on LinkedIn &rarr;
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="cyber-bracket cyber-card block p-5 rounded-lg border border-[#1B2433] hover:border-[#FF2BD6] bg-[#0B0F17] transition-all group"
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded bg-[#05060A] border border-[#FF2BD6]/40 flex items-center justify-center text-[#FF2BD6] shrink-0 group-hover:shadow-[0_0_12px_rgba(255,43,214,0.3)] transition-shadow">
                  <Github size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A90]">
                    // GITHUB SOURCE HUB
                  </h4>
                  <p className="text-[#D6E2F0] font-bold text-xs sm:text-sm mt-0.5 group-hover:text-[#FF2BD6] transition-colors">
                    Review Code Repositories &rarr;
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
