
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
    <div ref={outputRef} className="mb-6 command-output">
      <div className="command-line px-3 py-2 rounded-t-md bg-terminal-command-bg border-l-2 border-t border-r border-terminal-accent/40">
        <span className="prompt text-terminal-accent font-bold mr-2">$</span>
        <span className="text-terminal-command font-semibold">{command}</span>
      </div>
      <div className="command-result bg-terminal-result-bg border border-t-0 border-terminal-border rounded-b-md px-4 py-3">
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
