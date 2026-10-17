import { useState, useEffect } from 'react';
import { MessageSquare, Send, ShieldCheck, Clock } from 'lucide-react';
import TerminalPromptHeader from './TerminalPromptHeader';

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
    } catch {
      // Keep empty or default if mock
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
        throw new Error(result.error || 'Failed to submit log entry.');
      }

      setStatus('success');
      setStatusMessage(
        result.pendingModeration
          ? 'ACK: Log submitted. Pending automated moderation verification.'
          : 'ACK: Entry broadcast to guestbook network.'
      );
      setMessageText('');
      fetchMessages();
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setStatusMessage(err.message || 'Error transmitting log. Please retry.');
      setTimeout(() => setStatus('idle'), 7000);
    }
  };

  return (
    <section id="guestbook" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-left">
        <TerminalPromptHeader
          title="GUESTBOOK"
          tag="// 08 COMMUNITY"
          subtitle="Visitor transmission log. Backed by MongoDB with rate limiting and automated content sanitization."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sign Form Column */}
          <div className="lg:col-span-5 cyber-bracket cyber-card p-6 rounded-lg bg-[#0B0F17] border border-[#1B2433] shadow-[0_0_25px_rgba(0,0,0,0.7)]">
            <h3 className="text-base font-bold text-[#D6E2F0] mb-2 flex items-center gap-2 font-['Space_Grotesk']">
              <MessageSquare size={16} className="text-[#00FF9C]" />
              Transmit Log Entry
            </h3>
            <p className="text-xs text-[#6B7A90] mb-5">
              Leave a public greeting or note in the portfolio log.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7A90] mb-1">
                  &gt; IDENTIFIER:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Sarah Chen"
                  className="w-full px-3 py-2 rounded bg-[#05060A] border border-[#1B2433] focus:border-[#00FF9C] text-[#D6E2F0] text-xs font-mono focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7A90] mb-1">
                  &gt; GITHUB_HANDLE (OPTIONAL):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-[#6B7A90] text-xs">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="github_username"
                    className="w-full pl-7 pr-3 py-2 rounded bg-[#05060A] border border-[#1B2433] focus:border-[#00FF9C] text-[#D6E2F0] text-xs font-mono focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7A90] mb-1">
                  &gt; MESSAGE_PAYLOAD:
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required
                  rows={3}
                  maxLength={280}
                  placeholder="Drop a note..."
                  className="w-full px-3 py-2 rounded bg-[#05060A] border border-[#1B2433] focus:border-[#00FF9C] text-[#D6E2F0] text-xs font-mono focus:outline-none transition-colors resize-none"
                />
                <p className="text-[10px] text-right text-[#6B7A90] mt-0.5">
                  {messageText.length}/280 bytes
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="cyber-bracket cyber-button-sweep w-full py-2.5 bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-extrabold rounded text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,156,0.3)] disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span>TRANSMITTING...</span>
                ) : (
                  <>
                    <span>[ BROADCAST NOTE ]</span>
                    <Send size={12} />
                  </>
                )}
              </button>

              {statusMessage && (
                <div
                  className={`p-2.5 rounded text-xs font-mono ${
                    status === 'success'
                      ? 'bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]'
                      : 'bg-[#FF2BD6]/10 text-[#FF2BD6] border border-[#FF2BD6]'
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

          {/* Messages Feed Column */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#6B7A90] pb-1 border-b border-[#1B2433]">
              <span className="font-bold flex items-center gap-1.5 text-[#00FF9C]">
                <ShieldCheck size={14} className="text-[#00FF9C]" />
                VERIFIED_FEED ({messages.length})
              </span>
              <span className="flex items-center gap-1 text-[10px]">
                <Clock size={11} /> 5/hr rate-limit
              </span>
            </div>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="p-6 rounded bg-[#0B0F17] border border-[#1B2433] text-center text-xs text-[#6B7A90]">
                  // No external entries logged yet. Be the first to broadcast a note!
                </div>
              ) : (
                messages.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="p-3.5 rounded bg-[#0B0F17] border border-[#1B2433] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]" />
                        <p className="text-xs font-bold text-[#D6E2F0]">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#00D9FF]">
                          @{item.username}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#6B7A90]">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-[#D6E2F0] pl-3.5 border-l border-[#1B2433] leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
