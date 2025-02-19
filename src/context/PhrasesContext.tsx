import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Phrase {
  id: number;
  text: string;
}

interface PhraseContextType {
  phrases: Phrase[];
  addPhrase: (text: string) => void;
  deletePhrase: (id: number) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const PhraseContext = createContext<PhraseContextType | undefined>(undefined);

interface PhraseProviderProps {
  children: ReactNode;
}

export const PhraseProvider = ({ children }: PhraseProviderProps) => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const addPhrase = (text: string) => {
    setPhrases((prev) => [
      ...prev,
      { id: Date.now(), text },
    ]);
  };

  const deletePhrase = (id: number) => {
    setPhrases((prev) => prev.filter((phrase) => phrase.id !== id));
  };

  return (
    <PhraseContext.Provider
      value={{
        phrases,
        addPhrase,
        deletePhrase,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </PhraseContext.Provider>
  );
};

export const usePhraseContext = () => {
  const context = useContext(PhraseContext);
  if (!context) {
    throw new Error('usePhraseContext debe ser usado con un phraseprovider');
  }
  return context;
};

export { PhraseContext };