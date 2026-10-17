import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, RefreshCw, AlertCircle, Terminal } from 'lucide-react';
import { aiSuggestedQuestions, personalInfo } from '../data/portfolioData';

const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: ">> NEURAL_AI_UPLINK ESTABLISHED. I am Manu's interactive AI assistant. Inquire about his MERN stack architectures, projects (FitBot AI, Campus Connect Hub), or engineering roles."
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;

    if (query.length > 400) {
      setErrorMsg('Payload exceeds maximum buffer limit (400 chars).');
      return;
    }

    setErrorMsg('');
    setInput('');

    const userMsgId = Date.now().toString();
    const assistantMsgId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', text: query },
      { id: assistantMsgId, role: 'assistant', text: '' }
    ]);

    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || 'Failed to establish neural response stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') break;
            try {
              const parsed = JSON.parse(raw);
              if (parsed.text) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? { ...msg, text: msg.text + parsed.text }
                      : msg
                  )
                );
              } else if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch {
              // ignore
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                text:
                  err.message ||
                  'Transmission error. Please email Manu directly at ' +
                    personalInfo.email
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 font-mono">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cyber-bracket relative flex items-center gap-2 px-4 py-3 bg-[#0B0F17] hover:bg-[#111723] text-[#00FF9C] rounded border border-[#00FF9C] shadow-[0_0_20px_rgba(0,255,156,0.3)] cursor-pointer select-none"
          aria-label="Ask Manu's AI Assistant"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9C]" />
          </span>
          <Bot size={17} className="text-[#00FF9C]" />
          <span className="text-xs font-bold tracking-wider hidden sm:inline">&gt; AI_UPLINK</span>
        </motion.button>
      </div>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="cyber-bracket fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] max-h-[82vh] bg-[#0B0F17] border border-[#00FF9C]/60 rounded-lg shadow-[0_0_35px_rgba(0,255,156,0.25)] flex flex-col overflow-hidden text-left font-mono select-none"
          >
            {/* Header */}
            <div className="p-3.5 bg-[#05060A] border-b border-[#1B2433] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#0B0F17] border border-[#00FF9C] flex items-center justify-center text-[#00FF9C]">
                  <Bot size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#D6E2F0] flex items-center gap-1.5">
                    MANU_AI // COPILOT
                    <Sparkles size={11} className="text-[#00FF9C]" />
                  </h3>
                  <p className="text-[9px] text-[#6B7A90]">
                    TRAINED ON RESUME &amp; CODEBASE
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded bg-[#05060A] hover:bg-[#111723] text-[#6B7A90] hover:text-[#00FF9C] border border-[#1B2433] transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-5 h-5 rounded bg-[#05060A] border border-[#00FF9C]/40 text-[#00FF9C] flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal size={11} />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] p-3 rounded text-xs whitespace-pre-wrap leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#00FF9C] text-black font-bold'
                        : 'bg-[#05060A] border border-[#1B2433] text-[#D6E2F0]'
                    }`}
                  >
                    {msg.text || (
                      <span className="inline-flex items-center gap-1.5 text-[#6B7A90] italic">
                        <RefreshCw size={10} className="animate-spin text-[#00FF9C]" /> Computing response...
                      </span>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-5 h-5 rounded bg-[#05060A] border border-[#00D9FF]/40 text-[#00D9FF] flex items-center justify-center shrink-0 mt-0.5">
                      <User size={11} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3.5 py-2 border-t border-[#1B2433] bg-[#05060A]">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B7A90] mb-1.5">
                // SUGGESTED PROMPTS
              </p>
              <div className="flex flex-wrap gap-1">
                {aiSuggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => handleSendMessage(q)}
                    className="text-[9px] px-2 py-1 rounded bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C] text-[#6B7A90] hover:text-[#00FF9C] transition-colors text-left cursor-pointer"
                  >
                    &gt; {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="px-3 py-1.5 bg-[#FF2BD6]/10 border-t border-[#FF2BD6] text-[#FF2BD6] text-[10px] flex items-center gap-1.5">
                <AlertCircle size={12} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-[#1B2433] bg-[#05060A] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Transmit query..."
                maxLength={400}
                disabled={isStreaming}
                className="flex-1 px-3 py-2 text-xs bg-[#0B0F17] border border-[#1B2433] focus:border-[#00FF9C] rounded text-[#D6E2F0] placeholder-[#6B7A90] focus:outline-none font-mono"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="p-2 bg-[#00FF9C] hover:bg-[#00FF9C]/90 disabled:opacity-40 text-black rounded font-bold transition-all cursor-pointer"
                aria-label="Send Message"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatWidget;
