import { useState } from "react";
import Servicer from "./Servicer";

function Servicers({ servicers, setUpdate }) {
  const [modalId, setModalId] = useState("");

  return (
    <div className="grid grid-cols-3">
      {servicers.map((servicer) => (
        <Servicer key={servicer.id} book={servicer} setUpdate={setUpdate} setModalId={setModalId} modalId={modalId}/>
      ))}
    </div>
  );
}

export default Servicers;
