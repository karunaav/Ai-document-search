import { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileName(file.name);
      setDocumentUploaded(true);
      setMessages([
        {
          type: 'system',
          content: `Successfully uploaded "${file.name}". You can now ask questions about the document.`,
        },
      ]);
    } catch (error) {
      alert('Error uploading file: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (query) => {
    if (!documentUploaded) {
      alert('Please upload a document first');
      return;
    }

    const userMessage = { type: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/query`, {
        query: query,
      });

      const assistantMessage = {
        type: 'assistant',
        content: response.data.answer,
        source: response.data.source,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: 'Error querying document: ' + (error.response?.data?.detail || error.message),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setDocumentUploaded(false);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">RAG Chatbot</h1>
              <p className="text-slate-400 text-sm mt-1">AI Document Search with LangChain</p>
            </div>
            {documentUploaded && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex">
          {!documentUploaded ? (
            <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
          ) : (
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              fileName={fileName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;