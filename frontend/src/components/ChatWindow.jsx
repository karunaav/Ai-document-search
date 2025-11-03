import { useState, useEffect, useRef } from 'react';

function ChatWindow({ messages, onSendMessage, isLoading, fileName }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-900">
      {/* Document Info Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <p className="text-slate-300 text-sm">
          📄 <span className="font-semibold">{fileName}</span>
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'system' && (
              <div className="max-w-2xl bg-green-900 bg-opacity-30 border border-green-700 rounded-lg px-4 py-3 text-green-200 text-sm">
                {message.content}
              </div>
            )}
            {message.type === 'user' && (
              <div className="max-w-2xl bg-blue-600 rounded-lg px-4 py-3 text-white">
                {message.content}
              </div>
            )}
            {message.type === 'assistant' && (
              <div className="max-w-2xl">
                <div className="bg-slate-800 rounded-lg px-4 py-3 text-slate-100 border border-slate-700">
                  <p className="mb-2">{message.content}</p>
                  {message.source && (
                    <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-600">
                      📌 Source: {message.source}
                    </p>
                  )}
                </div>
              </div>
            )}
            {message.type === 'error' && (
              <div className="max-w-2xl bg-red-900 bg-opacity-30 border border-red-700 rounded-lg px-4 py-3 text-red-200 text-sm">
                ⚠️ {message.content}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-lg px-4 py-3 text-slate-400">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-700 bg-slate-800 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
            disabled={isLoading}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;