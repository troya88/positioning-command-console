
import React from 'react';

// Command definitions
export type Command = {
  name: string;
  description: string;
  usage: string;
  execute: (args: string[]) => React.ReactNode;
};

// Available commands
export const availableCommands: string[] = [
  'help',
  'about',
  'assessment',
  'explore',
  'calculate',
  'clear',
  'exit'
];

// Generate command suggestions based on input
export const getSuggestions = (input: string): string[] => {
  if (!input) return [];
  
  const normalizedInput = input.toLowerCase().trim();
  
  return availableCommands.filter(cmd => 
    cmd.toLowerCase().startsWith(normalizedInput)
  );
};

// Parse the command and arguments
export const parseCommand = (input: string): { command: string; args: string[] } => {
  const parts = input.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

// Get command help
export const getCommandHelp = (command: string): React.ReactNode => {
  switch (command) {
    case 'help':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Display available commands and usage information.</p>
          <p className="text-terminal-muted">Usage: help [command]</p>
        </div>
      );
    case 'about':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Display information about Troy Assoignon and the Positioning Command Center.</p>
          <p className="text-terminal-muted">Usage: about</p>
        </div>
      );
    case 'assessment':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Start the interactive positioning assessment (5 questions).</p>
          <p className="text-terminal-muted">Usage: assessment [start|resume|results]</p>
        </div>
      );
    case 'explore':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Browse client success case studies.</p>
          <p className="text-terminal-muted">Usage: explore [industry|challenge|id]</p>
        </div>
      );
    case 'calculate':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Estimate revenue growth potential based on positioning improvements.</p>
          <p className="text-terminal-muted">Usage: calculate</p>
        </div>
      );
    case 'clear':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Clear the terminal screen.</p>
          <p className="text-terminal-muted">Usage: clear</p>
        </div>
      );
    case 'exit':
      return (
        <div className="mb-2">
          <p className="text-terminal-foreground mb-1">Close the current session.</p>
          <p className="text-terminal-muted">Usage: exit</p>
        </div>
      );
    default:
      return (
        <div className="mb-2 text-terminal-error">
          <p>Unknown command: {command}</p>
        </div>
      );
  }
};

// Execute the help command
export const executeHelpCommand = (args: string[]): React.ReactNode => {
  if (args.length > 0) {
    const command = args[0].toLowerCase();
    if (availableCommands.includes(command)) {
      return (
        <div className="my-2">
          <p className="text-terminal-accent font-bold mb-1">{command}</p>
          {getCommandHelp(command)}
        </div>
      );
    } else {
      return <p className="text-terminal-error my-2">Unknown command: {command}</p>;
    }
  }

  return (
    <div className="my-2">
      <p className="text-terminal-foreground mb-3">Available commands:</p>
      {availableCommands.map(cmd => (
        <div key={cmd} className="mb-3">
          <p className="text-terminal-accent font-bold">{cmd}</p>
          {getCommandHelp(cmd)}
        </div>
      ))}
    </div>
  );
};

// Execute the about command
export const executeAboutCommand = (): React.ReactNode => {
  return (
    <div className="my-4">
      <h2 className="text-terminal-accent text-xl font-bold mb-3">Positioning Command Center</h2>
      <p className="mb-3">Developed by Troy Assoignon, Positioning Consultant</p>
      
      <div className="mb-4">
        <p className="mb-2">Troy Assoignon helps businesses clarify their positioning to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Stand out in crowded markets</li>
          <li>Attract ideal clients effortlessly</li>
          <li>Command premium pricing</li>
          <li>Scale with confidence</li>
        </ul>
      </div>
      
      <p className="mb-4">
        This interactive terminal provides tools and resources to assess and 
        improve your business positioning.
      </p>
      
      <p className="text-terminal-muted">
        Version 1.0.0 | Type 'help' for available commands
      </p>
    </div>
  );
};

// Define placeholder responses for other commands
export const executeAssessmentCommand = (args: string[]): React.ReactNode => {
  return (
    <div className="my-2">
      <p className="text-terminal-foreground">Interactive positioning assessment.</p>
      <p className="mt-2 text-terminal-muted">
        Assessment module is ready for implementation in the next phase.
      </p>
    </div>
  );
};

export const executeExploreCommand = (args: string[]): React.ReactNode => {
  return (
    <div className="my-2">
      <p className="text-terminal-foreground">Client success explorer.</p>
      <p className="mt-2 text-terminal-muted">
        Explorer module is ready for implementation in the next phase.
      </p>
    </div>
  );
};

export const executeCalculateCommand = (): React.ReactNode => {
  return (
    <div className="my-2">
      <p className="text-terminal-foreground">Revenue growth calculator.</p>
      <p className="mt-2 text-terminal-muted">
        Calculator module is ready for implementation in the next phase.
      </p>
    </div>
  );
};

export const executeExitCommand = (): React.ReactNode => {
  return (
    <div className="my-2 text-terminal-foreground">
      <p>Thank you for using the Positioning Command Center.</p>
      <p className="mt-2">
        Session ended. Refresh the page to start a new session.
      </p>
    </div>
  );
};
