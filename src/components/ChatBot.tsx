import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Globe, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatBotProps {
  setHighlightedProducts: (ids: string[]) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ setHighlightedProducts }) => {
  const { isChatOpen, toggleChat, setCategoryFilter, setSearchQuery, products } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: '¡Hola! Soy Nova. ¿Qué hardware buscas hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  const handleCloseChat = () => {
    toggleChat();
    setHighlightedProducts([]);
  };

  const handleOpenChat = () => {
    toggleChat();
    const lastRecommendation = [...messages].reverse().find(
      msg => msg.recommendedProductIds && msg.recommendedProductIds.length > 0
    );

    if (lastRecommendation && lastRecommendation.recommendedProductIds) {
      setHighlightedProducts(lastRecommendation.recommendedProductIds);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMsg.text, products);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: new Date(),
        recommendedProductIds: response.recommendedIds,
        externalRec: response.externalRec
      };

      setMessages(prev => [...prev, botMsg]);

      // CRITICAL: Ensure the product is actually visible on screen
      if (response.recommendedIds.length > 0) {
        // 1. Reset filters so the product isn't hidden
        setCategoryFilter('ALL');
        setSearchQuery('');

        // 2. Set the highlight
        setHighlightedProducts(response.recommendedIds);

        // 3. Scroll to the product grid
        setTimeout(() => {
          const productsSection = document.getElementById('products-section');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300); // Slight delay to allow React to render the cleared filter state
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return (
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 group"
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
          Asistente IA
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-slide-in-up">
      {/* Header */}
      <div
        onClick={handleCloseChat}
        className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex justify-between items-center text-white cursor-pointer hover:brightness-95 transition-all select-none"
      >
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Nova AI</h3>
            <p className="text-xs text-indigo-100">Experto Tech</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCloseChat();
          }}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              </div>

              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>

            {/* External Recommendation Card */}
            {msg.externalRec && (
              <div className="ml-10 max-w-[85%] bg-slate-50 rounded-lg p-3 border border-indigo-100 shadow-sm mt-1">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Globe className="h-3 w-3" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Alternativa de Mercado</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{msg.externalRec.name}</h4>
                    <p className="text-xs font-bold text-slate-500">{msg.externalRec.price}</p>
                  </div>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(msg.externalRec.name)}`} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 leading-snug border-t border-slate-200 pt-2">
                  {msg.externalRec.reason}
                </p>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe aquí..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;