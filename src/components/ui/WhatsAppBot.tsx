import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ArrowRight, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionUrl?: string;
  actionLabel?: string;
}

const WHATSAPP_NUMBER = '254741733878';

export const WhatsAppBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Hello! 👋 Welcome to Mixon.',
      time: getCurrentTime(),
    },
    {
      id: 'welcome-2',
      sender: 'bot',
      text: 'How can we help your business today? Type your message below to chat directly with our team on WhatsApp.',
      time: getCurrentTime(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(scrollToBottom, 150);
    }
  }, [isOpen, messages]);

  const buildWhatsAppUrl = (text: string) => {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const time = getCurrentTime();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time,
    };

    const targetUrl = buildWhatsAppUrl(trimmed);

    const botReply: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: 'Opening WhatsApp to connect you directly with our team...',
      time,
      actionUrl: targetUrl,
      actionLabel: 'Continue to WhatsApp →',
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInputText('');

    // Open WhatsApp in a new tab
    setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  return (
    <aside
      aria-label="WhatsApp customer support"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[75] flex flex-col items-end"
    >
      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] h-[480px] max-h-[80vh] flex flex-col rounded-xl overflow-hidden border border-black/10 bg-[#EFEAE2] shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Mixon Brand Logo Icon */}
                  <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center p-1.5 shadow-inner">
                    <img
                      src="/mixon-icon-loader-white.png"
                      alt="Mixon"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                  {/* Active online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 font-sans font-bold text-base tracking-tight text-white leading-tight">
                    <span>Mixon</span>
                    {/* Verified blue/green badge */}
                    <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-[#075E54] inline-flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                  <div className="text-[11px] text-white/80 font-sans flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span>Typically replies in minutes</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Feed */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.02) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              {/* Date stamp */}
              <div className="flex justify-center my-1">
                <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-md bg-white/80 text-gray-500 shadow-2xs">
                  Today
                </span>
              </div>

              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3.5 py-2.5 shadow-2xs text-[13px] leading-relaxed relative ${
                        isUser
                          ? 'bg-[#D9FDD3] text-gray-900 rounded-tr-xs'
                          : 'bg-white text-gray-900 rounded-tl-xs border border-black/5'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {msg.actionUrl && (
                        <a
                          href={msg.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-xs shadow-sm transition-all active:scale-95"
                        >
                          <span>{msg.actionLabel || 'Continue to WhatsApp'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                        <span>{msg.time}</span>
                        {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-2.5 bg-white border-t border-black/[0.08] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 hover:bg-gray-150/70 focus:bg-white text-xs sm:text-[13px] text-gray-900 rounded-lg px-3.5 py-2.5 outline-none border border-transparent focus:border-[#25D366] transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-40 disabled:hover:bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer"
                aria-label="Send message to WhatsApp"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_14px_35px_rgba(37,211,102,0.6)] transition-shadow duration-300 cursor-pointer"
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            {/* WhatsApp Icon */}
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white fill-white"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            {/* Unread Ping Dot */}
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-xs">
                1
              </span>
            )}
          </>
        )}
      </motion.button>
    </aside>
  );
};

export default WhatsAppBot;
