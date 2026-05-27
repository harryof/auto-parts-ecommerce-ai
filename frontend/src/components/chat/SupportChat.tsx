import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Здравствуйте! Чем могу помочь?", isUser: false }
  ]);
  const [inputStr, setInputStr] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputStr.trim()) return;

    
    const newMsg = { id: Date.now(), text: inputStr, isUser: true };
    setMessages((prev) => [...prev, newMsg]);
    setInputStr('');

    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Я нейросеть-консультант. Скоро меня подключат для ответов на ваши вопросы!",
          isUser: false
        }
      ]);
    }, 1000);
  };

  return (
    <>
      
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-transform duration-300 z-50 flex items-center justify-center
          ${isOpen ? 'scale-0' : 'scale-100'}`}
        style={{
          background: 'linear-gradient(135deg, #F3C15F, #e2ae44)',
          color: '#fff',
        }}
      >
        <MessageSquare size={28} />
      </button>

      
      <div
        className={`fixed bottom-6 right-6 w-80 md:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right glass
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{
          height: '500px'
        }}
      >
        
        <div 
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--color-border2)', background: 'rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #F3C15F, #e2ae44)' }}>
              🤖
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>AI-Помощник</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-dark-300 hover:text-dark-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${m.isUser ? 'rounded-br-sm' : 'rounded-bl-sm'} ${m.isUser ? '' : 'glass'}`}
                style={{
                  background: m.isUser ? 'rgba(243, 193, 95, 0.9)' : undefined,
                  color: m.isUser ? '#000' : 'var(--color-text)',
                  border: m.isUser ? 'none' : '1px solid var(--color-border2)'
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        
        <form 
          onSubmit={sendMessage} 
          className="p-3 mb-2 mx-3 rounded-2xl flex items-center gap-2"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--color-border2)' }}
        >
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            style={{ color: 'var(--input-color)' }}
            placeholder="Напишите сообщение..."
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ color: '#F3C15F', background: 'rgba(243,193,95,0.1)' }}
            disabled={!inputStr.trim()}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
};

export default SupportChat;
