import { useState, useEffect, useCallback } from 'react';

// HESOYAM - the legendary GTA San Andreas health/armor/money cheat
const HESOYAM_CODE = ['H', 'E', 'S', 'O', 'Y', 'A', 'M'];

export const useKonamiCode = (callback: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      // Only track letter keys
      if (key.length !== 1 || !/[A-Z]/.test(key)) return;
      
      const newInput = [...input, key];
      
      // Only keep the last N keys where N is the length of the code
      if (newInput.length > HESOYAM_CODE.length) {
        newInput.shift();
      }
      
      setInput(newInput);

      // Check if the input matches HESOYAM
      if (newInput.length === HESOYAM_CODE.length) {
        const isMatch = newInput.every((k, i) => k === HESOYAM_CODE[i]);
        if (isMatch) {
          callback();
          setInput([]);
        }
      }
    },
    [input, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return input.length;
};
