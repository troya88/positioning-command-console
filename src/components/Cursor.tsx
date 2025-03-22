
import React, { useEffect, useState } from 'react';

type CursorProps = {
  isBlinking?: boolean;
  className?: string;
};

const Cursor: React.FC<CursorProps> = ({ isBlinking = true, className = '' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isBlinking) {
      setVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [isBlinking]);

  return (
    <span 
      className={`cursor ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Cursor;
