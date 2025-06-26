import { useState } from "react";
import Mechanic from "./Mechanic";

function Mechanics({ mechanics, setUpdate }) {
  const [modalId, setModalId] = useState("");

  return (
      <div className="grid grid-cols-3">
        {/*
        This is a "guard clause". It checks if `mechanics` is an array
        before attempting to call .map() on it.
      */}
        {Array.isArray(mechanics) && mechanics.map((mechanic) => (
            <Mechanic
                key={mechanic.id}
                // FIX 2: This prop name is likely a typo. Should be mechanic={mechanic}
                mechanic={mechanic}
                setUpdate={setUpdate}
                setModalId={setModalId}
                modalId={modalId}
            />
        ))}
      </div>
  );
}

export default Mechanics;