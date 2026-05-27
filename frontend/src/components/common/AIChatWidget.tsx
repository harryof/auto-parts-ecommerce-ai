import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api, { ChatMessage } from '../../services/api';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Здравствуйте! Я ИИ-консультант магазина. Помогу подобрать запчасти, подскажу по ценам и наличию. Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      
      const recentHistory = messages.slice(-5);
      const response = await api.sendChatMessage(userMsg.content, recentHistory);
      setMessages([...newHistory, response]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newHistory,
        { role: 'assistant', content: 'Простите, произошла ошибка связи с сервером AI. Попробуйте попозже.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <div 
        className={`transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-0 opacity-0 h-0 w-0 overflow-hidden'
        }`}
      >
        <div className="glass w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col h-[500px] max-h-[80vh] border border-white/5 overflow-hidden">
          
          <div className="p-4 bg-dark-800/80 border-b border-white/5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">ИИ Консультант</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  В сети
                </span>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-dark-400 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-dark-900/40">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-dark-500/30 text-white' : 'bg-primary-500/20 text-primary-400'
                  }`}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div 
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600/20 text-white rounded-tr-sm border border-primary-500/10' 
                      : 'bg-dark-800 text-dark-100 rounded-tl-sm border border-white/5 whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-3 bg-dark-800 rounded-2xl rounded-tl-sm flex items-center gap-2 border border-white/5">
                  <Loader2 size={16} className="text-primary-400 animate-spin" />
                  <span className="text-xs text-dark-400">Думает...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          
          <form 
            onSubmit={handleSend}
            className="p-3 bg-dark-800/80 border-t border-white/5 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-dark-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center flex-shrink-0 hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
            </button>
          </form>
        </div>
      </div>

      
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-primary-500 text-white shadow-[0_0_20px_rgba(243,193,95,0.4)] hover:shadow-[0_0_30px_rgba(243,193,95,0.6)] hover:scale-105 transition-all flex items-center justify-center animate-bounce-subtle"
        >
          <MessageSquare size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark-900"></span>
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;
