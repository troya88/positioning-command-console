
import { useEffect, useState, useCallback } from 'react';

type TypewriterOptions = {
  text: string;
  delay?: number;
  onComplete?: () => void;
};

export const useTypewriter = ({ text, delay = 30, onComplete }: TypewriterOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const reset = useCallback(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const complete = useCallback(() => {
    setDisplayText(text);
    setCurrentIndex(text.length);
    setIsComplete(true);
    onComplete?.();
  }, [text, onComplete]);

  useEffect(() => {
    if (text !== displayText && currentIndex === 0) {
      reset();
    }
  }, [text, displayText, currentIndex, reset]);

  useEffect(() => {
    if (isPaused || isComplete || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      const nextChar = text[currentIndex];
      setDisplayText(prev => prev + nextChar);
      setCurrentIndex(prev => prev + 1);

      if (currentIndex + 1 >= text.length) {
        setIsComplete(true);
        onComplete?.();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, isPaused, isComplete, text, onComplete]);

  return {
    displayText,
    isComplete,
    isPaused,
    progress: text.length > 0 ? currentIndex / text.length : 0,
    reset,
    pause,
    resume,
    complete,
  };
};
