
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useTerminal } from '../contexts/TerminalContext';
import { getSuggestions } from '../utils/commands';
import Cursor from './Cursor';

const CommandInput: React.FC = () => {
  const {
    commandInput,
    setCommandInput,
    history,
    historyIndex,
    setHistoryIndex,
    isTyping,
    suggestions,
    setSuggestions,
    selectedSuggestion,
    setSelectedSuggestion
  } = useTerminal();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  // Update suggestions when input changes
  useEffect(() => {
    if (commandInput.trim()) {
      setSuggestions(getSuggestions(commandInput));
    } else {
      setSuggestions([]);
    }
    setSelectedSuggestion(-1);
  }, [commandInput, setSuggestions, setSelectedSuggestion]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle history navigation with up/down arrows
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0 && selectedSuggestion < suggestions.length - 1) {
        // Fix: Directly set the value instead of using a function
        setSelectedSuggestion(selectedSuggestion + 1);
      } else if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommandInput(history[history.length - 1 - newIndex].command);
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedSuggestion > 0) {
        // Fix: Directly set the value instead of using a function
        setSelectedSuggestion(selectedSuggestion - 1);
      } else if (selectedSuggestion === 0) {
        setSelectedSuggestion(-1);
        setSuggestions(getSuggestions(commandInput));
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommandInput(history[history.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommandInput('');
      }
    }
    // Handle tab completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const suggestion = suggestions[selectedSuggestion >= 0 ? selectedSuggestion : 0];
        setCommandInput(suggestion);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      }
    }
  };

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Avoid processing when isTyping
  if (isTyping) {
    return (
      <div className="command-line">
        <span className="prompt">$</span>
        <span className="opacity-50">{commandInput}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="command-line">
        <span className="prompt">$</span>
        <div className="relative flex-1 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="bg-transparent border-none outline-none w-full text-terminal-foreground font-mono"
            autoComplete="off"
            spellCheck="false"
          />
          {focused && commandInput.length === 0 && (
            <Cursor className="absolute top-1 left-0" />
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute left-6 mt-1 w-48 bg-terminal-background border border-terminal-muted/30 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-3 py-1.5 hover:bg-terminal-accent/10 cursor-pointer ${
                index === selectedSuggestion ? 'bg-terminal-accent/10 text-terminal-accent' : ''
              }`}
              onClick={() => {
                setCommandInput(suggestion);
                setSuggestions([]);
                setSelectedSuggestion(-1);
                inputRef.current?.focus();
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandInput;
