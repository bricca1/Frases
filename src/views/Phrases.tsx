import React, { useMemo, useState } from "react";
import { usePhraseContext } from "../context/PhrasesContext";
import Card from "../components/Card/Card";
import SearchBar from "../components/SearchBar/SearchBar";
import Alert from "@mui/material/Alert";
import { AppBar, Button, TextField } from "@mui/material";
import "./Styles.css";

export default function Phrases() {
  const { phrases, addPhrase, deletePhrase, searchText } = usePhraseContext();
  const [newPhrase, setNewPhrase] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Filtrar frases según el texto de búsqueda
  const filteredPhrases = useMemo(() => {
    return phrases.filter((phrase) =>
      phrase.text.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [phrases, searchText]);

  // Agregar una nueva frase
  const handleAddPhrase = () => {
    const trimmedPhrase = newPhrase.trim();
    const wordsCount = trimmedPhrase.split(/\s+/).length;

    if (wordsCount < 2) {
      setErrorMessage("La frase debe tener al menos dos palabras.");
      return;
    }

    addPhrase(trimmedPhrase);
    setNewPhrase("");
    setErrorMessage("");
  };

  return (
    <div className="container">
      <AppBar>
        <div className="header-text">
          <h1>FRASES APP</h1>
        </div>
      </AppBar>

      {/* Formulario de ingreso de frases */}
      <div className="form-container">
        <TextField
          className="frase-input"
          value={newPhrase}
          size="small"
          label="Agregar nueva frase"
          variant="outlined"
          onChange={(e) => setNewPhrase(e.target.value)}
        />
        <Button
          className="frase-button"
          disabled={newPhrase.trim() === ""}
          variant="contained"
          onClick={handleAddPhrase}
        >
          Agregar
        </Button>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <Alert severity="warning" className="error-alert">
          {errorMessage}
        </Alert>
      )}

      {/* Input  de búsqueda */}
      <SearchBar />

      {/* Lista de frases */}
      <div className="paper-wraper">
        {filteredPhrases.length > 0 ? (
          <div className="cards-container">
            {filteredPhrases.map((phrase) => (
              <Card
                key={phrase.id}
                id={phrase.id}
                text={phrase.text}
                onDelete={() => deletePhrase(phrase.id)}
              />
            ))}
          </div>
        ) : (
          <div className="phrases-message">No se encontró la frase...</div>
        )}
      </div>
    </div>
  );
}