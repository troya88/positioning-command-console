
import React, { useEffect, useRef } from 'react';
import { useTypewriter } from '../utils/typewriter';
import { useTerminal } from '../contexts/TerminalContext';

type CommandOutputProps = {
  command: string;
  output: React.ReactNode;
  isLatest?: boolean;
};

const CommandOutput: React.FC<CommandOutputProps> = ({ command, output, isLatest = false }) => {
  const { setIsTyping } = useTerminal();
  const outputRef = useRef<HTMLDivElement>(null);
  
  // Determine if output is a string or React node
  const outputString = typeof output === 'string' ? output : '';
  
  const { displayText, isComplete } = useTypewriter({
    text: outputString,
    delay: 10,
    onComplete: () => {
      if (isLatest) {
        setIsTyping(false);
      }
    }
  });

  // Scroll to the bottom when new content is added
  useEffect(() => {
    if (outputRef.current && isLatest) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayText, isLatest]);

  // Set typing state
  useEffect(() => {
    if (isLatest && typeof output === 'string' && !isComplete) {
      setIsTyping(true);
    }
  }, [isLatest, output, isComplete, setIsTyping]);

  return (
    <div ref={outputRef} className="mb-4">
      <div className="command-line mb-2">
        <span className="prompt">$</span>
        <span className="text-terminal-foreground">{command}</span>
      </div>
      <div className="pl-6">
        {typeof output === 'string' ? (
          <div className="animate-text-fade-in">{displayText}</div>
        ) : (
          <div className="animate-text-fade-in">{output}</div>
        )}
      </div>
    </div>
  );
};

export default CommandOutput;
