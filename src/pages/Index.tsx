
import React from 'react';
import Terminal from '../components/Terminal';
import { TerminalProvider } from '../contexts/TerminalContext';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4 sm:p-8">
      <div className="w-full max-w-5xl h-[80vh] md:h-[85vh] overflow-hidden rounded-lg shadow-2xl border border-terminal-accent/20">
        <TerminalProvider>
          <Terminal />
        </TerminalProvider>
      </div>
      <footer className="mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Troy Assoignon | Positioning Command Center
      </footer>
    </div>
  );
};

export default Index;
