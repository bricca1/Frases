import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import withPhraseActions from '../../context/WithPhrasesActions';
import Person3Icon from '@mui/icons-material/Person3';
import './styles.css'
import { IconButton } from '@mui/material';
interface CardProps {
  id: number;
  text: string;
  onDelete: () => void;
}

const Card = ({ id, text, onDelete }: CardProps) => {
  return (
    <div className="card">
      <Person3Icon />
      <h2 className='text-style'>{text}</h2>
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default withPhraseActions(Card);