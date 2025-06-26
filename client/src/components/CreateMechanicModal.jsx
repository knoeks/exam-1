import { useState } from 'react';
import {createMechanic} from "../helpers/api.js";
// We'll create this helper next

const CreateMechanicModal = ({ setIsModalOpen, setUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        specialization: '',
        city: '',
        servicerId: '', // We'll link by servicer ID
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.surname || !formData.servicerId) {
            setError('Name, Surname, and Servicer ID are required.');
            return;
        }

        // Prepare the data for the API, creating the nested servicer object
        const newMechanicData = {
            name: formData.name,
            surname: formData.surname,
            specialization: formData.specialization,
            city: formData.city,
            servicer: { id: parseInt(formData.servicerId, 10) } // Your backend expects a Servicer object
        };

        try {
            await createMechanic(newMechanicData);
            setUpdate(prev => prev + 1); // Trigger re-fetch in parent
            setIsModalOpen(false); // Close modal on success
        } catch (err) {
            setError('Failed to create mechanic. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Create New Mechanic</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="w-full p-2 border rounded" />
                    <input name="surname" value={formData.surname} onChange={handleInputChange} placeholder="Surname" required className="w-full p-2 border rounded" />
                    <input name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Specialization" className="w-full p-2 border rounded" />
                    <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full p-2 border rounded" />
                    <input type="number" name="servicerId" value={formData.servicerId} onChange={handleInputChange} placeholder="Servicer ID" required className="w-full p-2 border rounded" />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMechanicModal;