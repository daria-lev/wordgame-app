import { useState, useEffect } from 'react';

const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState(null);

  useEffect(() => {
    
    const handleKeyDown = ({ key }) => {
      if (key.match(/[a-zA-Z]/)) {
        setKeyPressed(key)
      }
      if (key === 'Enter') {
        setKeyPressed('Enter')
      }
      if (key === 'Backspace' || key === 'Delete') {
        setKeyPressed('Backspace')
      }
    };

    const handleKeyUp = () => {
      setKeyPressed(null)
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keyPressed;
};

export default useKeyPress;