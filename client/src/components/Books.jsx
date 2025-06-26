import { useState } from "react";
import Book from "./Book";

function Books({ books, setUpdate }) {
  const [modalId, setModalId] = useState("");

  return (
    <div className="grid grid-cols-3">
      {books.map((book) => (
        <Book key={book.id} book={book} setUpdate={setUpdate} setModalId={setModalId} modalId={modalId}/>
      ))}
    </div>
  );
}

export default Books;
