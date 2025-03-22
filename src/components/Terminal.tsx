
import React, { useEffect, useRef, KeyboardEvent } from 'react';
import { useTerminal } from '../contexts/TerminalContext';
import CommandInput from './CommandInput';
import CommandOutput from './CommandOutput';
import { 
  parseCommand, 
  executeHelpCommand, 
  executeAboutCommand,
  executeAssessmentCommand,
  executeExploreCommand,
  executeCalculateCommand,
  executeExitCommand
} from '../utils/commands';

const Terminal: React.FC = () => {
  const { 
    history, 
    commandInput, 
    setCommandInput, 
    addToHistory, 
    clearHistory, 
    isTyping 
  } = useTerminal();
  
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Execute command
  const executeCommand = () => {
    if (!commandInput.trim() || isTyping) return;

    const { command, args } = parseCommand(commandInput);
    let output: React.ReactNode;

    switch (command) {
      case 'help':
        output = executeHelpCommand(args);
        break;
      case 'about':
        output = executeAboutCommand();
        break;
      case 'assessment':
        output = executeAssessmentCommand(args);
        break;
      case 'explore':
        output = executeExploreCommand(args);
        break;
      case 'calculate':
        output = executeCalculateCommand();
        break;
      case 'clear':
        clearHistory();
        setCommandInput('');
        return;
      case 'exit':
        output = executeExitCommand();
        break;
      default:
        output = (
          <p className="text-terminal-error">
            Command not found: {command}. Type 'help' for available commands.
          </p>
        );
    }

    addToHistory(commandInput, output);
    setCommandInput('');
  };

  // Handle key press events
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      executeCommand();
    }
  };

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div 
      className="terminal-window"
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      <div className="terminal-header">
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm text-terminal-foreground/70 ml-2">
          Positioning Command Center
        </span>
      </div>
      
      <div className="terminal-body" ref={terminalBodyRef}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-terminal-accent mb-1">
            Positioning Command Center
          </h1>
          <p className="text-terminal-foreground/70 mb-3">
            Troy Assoignon's Interactive Positioning Terminal
          </p>
          <p className="text-terminal-muted">
            Type 'help' for available commands or 'about' for more information.
          </p>
        </div>

        {history.map((item) => (
          <CommandOutput 
            key={item.id} 
            command={item.command} 
            output={item.output} 
          />
        ))}

        <CommandInput />
      </div>
    </div>
  );
};

export default Terminal;
