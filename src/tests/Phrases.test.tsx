import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Phrases from "../views/Phrases";
import { PhraseContext } from "../context/PhrasesContext";

// Mock del contexto
const mockContext = {
  phrases: [
    { id: 1, text: "Hola mundo" },
    { id: 2, text: "React es increíble" },
  ],
  addPhrase: vi.fn(),
  deletePhrase: vi.fn(),
  searchText: "",
  setSearchText: vi.fn(),
};

describe("Phrases Component", () => {
  it("debería permitir agregar una nueva frase válida", () => {
    render(
      <PhraseContext.Provider value={mockContext}>
        <Phrases />
      </PhraseContext.Provider>
    );

    const input = screen.getByLabelText(/Agregar nueva frase/i);
    const button = screen.getByRole("button", { name: /agregar/i });

    fireEvent.change(input, { target: { value: "Nueva frase de prueba" } });
    fireEvent.click(button);

    expect(mockContext.addPhrase).toHaveBeenCalledWith("Nueva frase de prueba");
  });

  it("debería mostrar un mensaje de error si la frase tiene menos de dos palabras", () => {
    render(
      <PhraseContext.Provider value={mockContext}>
        <Phrases />
      </PhraseContext.Provider>
    );

    const input = screen.getByLabelText(/Agregar nueva frase/i);
    const button = screen.getByRole("button", { name: /agregar/i });

    fireEvent.change(input, { target: { value: "Hola" } });
    fireEvent.click(button);

    expect(screen.getByText(/La frase debe tener al menos dos palabras/i)).toBeInTheDocument();
  });

  it("debería filtrar frases según el texto de búsqueda", () => {
    render(
      <PhraseContext.Provider value={{ ...mockContext, searchText: "React" }}>
        <Phrases />
      </PhraseContext.Provider>
    );

    expect(screen.getByText("React es increíble")).toBeInTheDocument();
    expect(screen.queryByText("Hola mundo")).not.toBeInTheDocument();
  });
});
