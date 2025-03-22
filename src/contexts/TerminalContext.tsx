
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CommandHistoryItem = {
  command: string;
  output: React.ReactNode;
  id: string;
};

type TerminalContextType = {
  history: CommandHistoryItem[];
  commandInput: string;
  setCommandInput: (value: string) => void;
  addToHistory: (command: string, output: React.ReactNode) => void;
  clearHistory: () => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  selectedSuggestion: number;
  setSelectedSuggestion: (index: number) => void;
};

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};

type TerminalProviderProps = {
  children: ReactNode;
};

export const TerminalProvider: React.FC<TerminalProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  const addToHistory = (command: string, output: React.ReactNode) => {
    setHistory(prev => [...prev, { command, output, id: Date.now().toString() }]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    // Reset history index when history changes
    setHistoryIndex(-1);
  }, [history.length]);

  const value = {
    history,
    commandInput,
    setCommandInput,
    addToHistory,
    clearHistory,
    historyIndex,
    setHistoryIndex,
    isTyping,
    setIsTyping,
    suggestions,
    setSuggestions,
    selectedSuggestion,
    setSelectedSuggestion,
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};
