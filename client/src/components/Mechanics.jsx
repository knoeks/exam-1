// src/components/Mechanics.jsx

import { useState } from "react";
import Mechanic from "./Mechanic";
import CreateMechanicModal from "./CreateMechanicModal.jsx";


function Mechanics({ mechanics, setUpdate }) {
    const [modalId, setModalId] = useState("");
    // --- ADD STATE TO CONTROL THE CREATE MODAL ---
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div>
            <div className="text-right mb-4 mr-4">
                {/* --- ADD THE CREATE BUTTON --- */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
                >
                    + Add New Mechanic
                </button>
            </div>

            {/* --- Conditionally render the create modal --- */}
            {isCreateModalOpen && (
                <CreateMechanicModal
                    setIsModalOpen={setIsCreateModalOpen}
                    setUpdate={setUpdate}
                />
            )}

            {/* The existing grid of mechanics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(mechanics) && mechanics.map((mechanic) => (
                    <Mechanic
                        key={mechanic.id}
                        mechanic={mechanic}
                        setUpdate={setUpdate}
                        setModalId={setModalId}
                        modalId={modalId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Mechanics;