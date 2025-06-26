// src/components/Servicer.jsx

import EditModal from "./modals/EditModal";

function Servicer({ servicer, setUpdate, modalId, setModalId }) {
  // --- FIX 1: Destructure the CORRECT properties from the servicer object ---
  const { id, name, address, managerName, mechanics } = servicer;

  const openEditModalHandler = () => {
    // This handler remains the same. It correctly toggles the modal.
    if (modalId === id) {
      setModalId("");
    } else {
      setModalId(id);
    }
  };

  return (
      <div className="shadow-lg m-4 p-6 border rounded-xl flex flex-col justify-between w-full max-w-sm bg-white transition-shadow hover:shadow-2xl">
        {/* Main Content Area */}
        <div className="text-center mb-4">
          {/* Display the servicer's name as the main heading */}
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>

          {/* Display address and manager's name */}
          <p className="text-md text-gray-600 mt-2">{address}</p>
          <p className="text-sm text-gray-500 mt-1">Manager: {managerName}</p>
        </div>

        {/* --- FIX 2: Handle the nested mechanics list gracefully --- */}
        <div className="text-left text-sm border-t pt-4">
          <p>
            <span className="font-semibold text-gray-700">Mechanics on Staff: </span>
            {/* Use optional chaining (?.) for safety and display the number of mechanics */}
            <span className="text-gray-600">{mechanics?.length || 0}</span>
          </p>
        </div>

        {/* Action Buttons Area */}
        <div className="w-full flex justify-center mt-6">
          <button
              className="px-6 py-2 font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={openEditModalHandler}
          >
            Edit Details
          </button>
        </div>

        {/* Modal rendering logic (unchanged) */}
        {modalId === id && (
            <EditModal
                setUpdate={setUpdate}
                setModalId={setModalId}
                entity={servicer} // Pass the entire servicer object
                entityType="Servicer" // Let the modal know what it's editing
            />
        )}
      </div>
  );
}

export default Servicer;