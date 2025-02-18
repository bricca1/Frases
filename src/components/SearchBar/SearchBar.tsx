import React from 'react';
import { usePhraseContext } from '../../context/PhrasesContext';
import './styles.css'
import { TextField } from '@mui/material';

const SearchBar = () => {
  const { searchText, setSearchText } = usePhraseContext();

  return (
    
    <div className='searchbar-container'>
      <TextField
        className="input-search"
        value={searchText} 
        size='small' 
        label="Buscar frase..."
        variant="outlined" 
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;