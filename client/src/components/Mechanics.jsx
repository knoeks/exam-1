import { useState } from "react";
import Mechanic from "./Mechanic";

function Mechanics({ mechanics, setUpdate }) {
  const [modalId, setModalId] = useState("");

  return (
    <div className="grid grid-cols-3">
      {mechanics.map((mechanic) => (
        <Mechanic key={mechanic.id} book={mechanic} setUpdate={setUpdate} setModalId={setModalId} modalId={modalId}/>
      ))}
    </div>
  );
}

export default Mechanics;
