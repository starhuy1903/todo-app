import { createContext as reactCreateContext, useContext } from 'react';

function createContext<T>(defaultValue?: T) {
  const Context = reactCreateContext<T | undefined>(defaultValue);

  const useContextHook = () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error('useContext must be used within a Provider');
    }
    return context;
  };

  return [useContextHook, Context] as const;
}

export default createContext;
