import React, { useState, useRef, useEffect } from 'react';
import { Book, ChatMessage } from '../types';
import { chatWithBook } from '../services/geminiService';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

interface ChatInterfaceProps {
  book: Book;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ book }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: `Hello. I am the spirit of the story "${book.title}". Ask me anything... if you dare.`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithBook(history, userMsg.text, book);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 bg-slate-950 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blood-900/50 flex items-center justify-center border border-blood-500/30">
                <Bot size={20} className="text-blood-400" />
            </div>
            <div>
                <h3 className="font-medium text-white text-sm">Chat with "{book.title}"</h3>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                </span>
            </div>
        </div>
        <button 
            onClick={() => setMessages([messages[0]])}
            className="text-xs text-slate-500 hover:text-white transition-colors"
        >
            Reset
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700' : 'bg-blood-900/30'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-blood-400" />}
            </div>
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-blood-900/30 flex items-center justify-center">
                <Bot size={14} className="text-blood-400" />
             </div>
             <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-4 border border-white/5">
                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950 border-t border-white/5">
        <div className="relative">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the plot, characters, or mood..."
                className="w-full bg-slate-900 border border-slate-700 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blood-500 transition-colors placeholder-slate-600"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 p-1.5 bg-blood-600 text-white rounded-full hover:bg-blood-500 disabled:opacity-50 disabled:hover:bg-blood-600 transition-colors"
            >
                <Send size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;