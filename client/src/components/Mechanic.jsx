// src/components/Mechanic.jsx

import EditModal from "./modals/EditModal";

function Mechanic({ mechanic, setUpdate, modalId, setModalId }) {
  // --- FIX 1: Destructure the CORRECT properties from the mechanic object ---
  const { id, name, surname, specialization, city, servicer, reviews } = mechanic;

  const openEditModalHandler = () => {
    // This handler remains the same. It correctly toggles the modal.
    if (modalId === id) {
      setModalId(""); // Close the modal if it's already open for this card
    } else {
      setModalId(id); // Open the modal for this card
    }
  };

  // The 'reserveHandler' has been removed as it doesn't fit the new data model.

  return (
      <div className="shadow-lg m-4 p-6 border rounded-xl flex flex-col justify-between w-full max-w-sm bg-white transition-shadow hover:shadow-2xl">
        {/* Main Content Area */}
        <div className="text-center mb-4">
          {/* Display the full name prominently */}
          <h2 className="text-2xl font-bold text-gray-800">{`${name} ${surname}`}</h2>

          {/* Display specialization and city */}
          <p className="text-md text-blue-600 font-semibold">{specialization}</p>
          <p className="text-sm text-gray-500 mt-1">City: {city}</p>
        </div>

        {/* --- FIX 2: Handle nested objects and lists gracefully --- */}
        <div className="text-left text-sm space-y-2 border-t pt-4">
          <p>
            <span className="font-semibold text-gray-700">Works at: </span>
            {/* Use optional chaining (?.) in case the servicer object is null */}
            <span className="text-gray-600">{servicer?.name || 'N/A'}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Reviews: </span>
            {/* Display the number of reviews. If reviews is null, it will show 0. */}
            <span className="text-gray-600">{reviews?.length || 0}</span>
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
                entity={mechanic} // Pass the entire mechanic object to the modal
                entityType="Mechanic" // Let the modal know what type of entity it's editing
            />
        )}
      </div>
  );
}

export default Mechanic;