import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, X, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

import type { Language } from '@/lib/translations';
import { t } from '@/lib/translations';

interface ChatbotProps {
  language?: Language;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://j639b8j9tk.execute-api.us-east-1.amazonaws.com/prod';
const CHAT_ENDPOINT = `${API_URL}/prod-janvani-chat`;

export const Chatbot = ({ language = 'english' }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tr = t(language);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: tr.chatGreeting, sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize Web Speech API for voice input
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on prop
      const langCode = language === 'hindi' ? 'hi-IN' : language === 'tamil' ? 'ta-IN' : 'en-IN';
      recognitionRef.current.lang = langCode;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [language]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(CHAT_ENDPOINT, {
        message: input,
        language
      }, { timeout: 30000 });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      
      let errorText = '';
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorText = 'Request timed out. The AI is taking too long to respond. Please try again.';
      } else if (error.response?.data?.error) {
        const serverError = error.response.data.error;
        if (serverError.includes('model access denied') || serverError.includes('Bedrock')) {
          errorText = 'AI model is not enabled yet. Please enable "Amazon Nova Lite" in AWS Bedrock Model Access (us-east-1 region).';
        } else {
          errorText = `Server error: ${serverError}`;
        }
      } else if (error.response?.status === 403) {
        errorText = 'Access denied. The AI model may not be enabled in AWS Bedrock. Please enable "Amazon Nova Lite" model access.';
      } else if (error.response?.status === 500) {
        errorText = `Server error: ${error.response.data?.message || 'Internal server error. Check Lambda logs.'}`;
      } else if (error.message === 'Network Error') {
        errorText = 'Cannot reach the server. Check that the API URL is configured correctly.';
      } else {
        errorText = `Error: ${error.message || 'Unknown error occurred.'}`;
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleTextToSpeech = (text: string, msgId: string) => {
    // If already speaking this message, stop it
    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    // Stop any current speech
    window.speechSynthesis.cancel();

    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hindi' ? 'hi-IN' : language === 'tamil' ? 'ta-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-elevated bg-primary hover:bg-primary/90 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-elevated border border-border flex flex-col z-50 animate-fade-in">
      {/* Header */}
      <div className="gradient-hero p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            🤖
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
            <p className="text-xs text-primary-foreground/80">JanVani Bharat</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                {msg.sender === 'bot' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTextToSpeech(msg.text, msg.id)}
                    className={`mt-1 h-6 px-2 text-xs ${speakingId === msg.id ? 'text-red-500' : ''}`}
                  >
                    <Volume2 className="w-3 h-3 mr-1" />
                    {speakingId === msg.id ? 'Stop' : 'Listen'}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-2 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleVoiceInput}
            className={isRecording ? 'bg-red-500 text-white' : ''}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={tr.chatPlaceholder}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
