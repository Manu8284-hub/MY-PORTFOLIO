import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Github, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [messageText, setMessageText] = useState('');
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/guestbook');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.warn('Guestbook fetch fallback:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !messageText.trim()) return;

    setStatus('sending');
    setStatusMessage('');

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim() || name.toLowerCase().replace(/\s+/g, ''),
          message: messageText.trim()
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit message.');
      }

      setStatus('success');
      setStatusMessage(
        result.pendingModeration
          ? 'Thank you! Your message was submitted and is pending automated moderation review.'
          : 'Thank you! Your note has been posted to the guestbook.'
      );
      setMessageText('');
      fetchMessages();
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setStatusMessage(err.message || 'Error posting message. Please try again later.');
      setTimeout(() => setStatus('idle'), 7000);
    }
  };

  return (
    <section id="guestbook" className="py-24 bg-slate-50 dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Visitor Community
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
              Guestbook
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl">
              Leave a greeting or feedback! Backed by MongoDB with rate-limiting and content moderation.
            </p>
          </div>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block mb-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sign Form Column */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />
              Sign the Guestbook
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Say hello or leave a review of Manu&apos;s portfolio.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="E.g., Sarah Chen"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  GitHub Handle (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="github_username"
                    className="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required
                  rows={3}
                  maxLength={280}
                  placeholder="Drop a note..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-blue-600 resize-none"
                />
                <p className="text-[10px] text-right text-slate-400 mt-1">
                  {messageText.length}/280 chars
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
              >
                {status === 'sending' ? (
                  <span>Signing...</span>
                ) : (
                  <>
                    <span>Post Message</span>
                    <Send size={13} />
                  </>
                )}
              </button>

              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    status === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

          {/* Messages Feed Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified &amp; Moderated Messages ({messages.length})
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Clock size={12} /> Rate limited (5/hr)
              </span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {messages.map((item) => (
                <div
                  key={item.id || item._id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"}
                        alt={item.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          @{item.username}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-9">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
