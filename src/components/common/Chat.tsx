import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatStage, setChatStage] = useState<'initial' | 'waiting_brand' | 'waiting_model' | 'waiting_year' | 'done'>('initial');
  const [userInfo, setUserInfo] = useState<{ brand?: string; model?: string; year?: string }>({});

  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Здравствуйте! Чем могу помочь?', isUser: false },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!message.trim()) return;

  const userMsg = message.trim();
  setMessages([...messages, { text: userMsg, isUser: true }]);
  setMessage('');

  setTimeout(() => {
    let botResponse = '';
    switch (chatStage) {
      case 'initial':
        botResponse = 'Уточните, пожалуйста, марку вашего автомобиля (например, Toyota).';
        setChatStage('waiting_brand');
        break;
      case 'waiting_brand':
        setUserInfo(prev => ({ ...prev, brand: userMsg }));
        botResponse = 'Спасибо! А теперь укажите модель (например, Camry).';
        setChatStage('waiting_model');
        break;
      case 'waiting_model':
        setUserInfo(prev => ({ ...prev, model: userMsg }));
        botResponse = 'Отлично. Уточните, пожалуйста, год выпуска.';
        setChatStage('waiting_year');
        break;
      case 'waiting_year':
        setUserInfo(prev => ({ ...prev, year: userMsg }));
        botResponse = `Спасибо! Мы ищем автозапчасти для ${userInfo.brand} ${userInfo.model} ${userMsg}. Наш менеджер скоро свяжется с вами.`;
        setChatStage('done');
        break;
      case 'done':
        botResponse = 'Если у вас есть ещё вопросы — пишите!';
        break;
    }

    setMessages(current => [...current, { text: botResponse, isUser: false }]);
  }, 700);
};


  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="bg-primary-700 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Онлайн-консультант</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-3 h-64 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                  msg.isUser 
                    ? 'ml-auto bg-primary-100 text-secondary-800' 
                    : 'bg-gray-200 text-secondary-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button 
                type="submit"
                className="bg-primary-700 text-white px-4 py-2 rounded-r-lg hover:bg-primary-800"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      )}
      
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-3 bg-primary-700 text-white rounded-full shadow-lg hover:bg-primary-800 z-50 transition-colors flex items-center justify-center"
      >
        <MessageSquare size={24} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          1
        </span>
      </button>
    </>
  );
};

export default Chat;