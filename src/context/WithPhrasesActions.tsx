import React from 'react';
import { usePhraseContext } from './PhrasesContext';

// Este HOC proporcionará la lógica para agregar y eliminar frases
const withPhraseActions = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { addPhrase, deletePhrase } = usePhraseContext();

    // Creamos una nueva propiedad que contiene las funciones de agregar y eliminar
    const phraseActions = {
      addPhrase,
      deletePhrase,
    };

    return <Component {...props} {...phraseActions} />;
  };
};

export default withPhraseActions;