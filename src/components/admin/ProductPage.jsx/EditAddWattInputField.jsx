import React, { useState, useEffect } from 'react';
import InputData from './InputData';
import { useRecoilState } from 'recoil';
import { createProductAtom, newWattFieldsAtom } from '../../../store/atoms/adminAtoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';  // Import UUID for unique IDs

export default function EditAddWattInputField() {
    const [formData, setFormData] = useRecoilState(createProductAtom);
    const [newWattFields, setNewWattFields] = useRecoilState(newWattFieldsAtom); // For new watt fields
    const [error, setError] = useState('');

    // Initialize with existing watt variants
    useEffect(() => {
        if (!formData.watts) {
            setFormData(prevData => ({
                ...prevData,
                watts: [] // Ensure that watts array is initialized
            }));
        }
    }, [formData, setFormData]);

    // Function to add new watt variant
    const addNewField = () => {
        const newField = { id: uuidv4(), watt: '', price: '' };  // Add unique ID for new field
        setNewWattFields(prevFields => [...prevFields, newField]);
    };

    // Function to remove newly added watt variant
    const removeNewField = (id) => {
        setNewWattFields(prevFields => prevFields.filter(field => field.id !== id));
    };

    // Handle changes for both existing and new fields
    const handleChange = (id, name, value, isNew) => {
        if (value === '') {
            setError('');
            if (isNew) {
                // Update newly added watt field with empty value
                setNewWattFields(prevFields =>
                    prevFields.map(field =>
                        field.id === id ? { ...field, [name]: '' } : field
                    )
                );
            } else {
                // Update existing watt field with empty value
                setFormData(prevData => ({
                    ...prevData,
                    watts: prevData.watts.map(field =>
                        field.watt_id === id ? { ...field, [name]: '' } : field
                    )
                }));
            }
            return;
        }
    
        const numericValue = parseFloat(value);
    
        if (isNaN(numericValue)) {
            setError(`${name === 'watt' ? 'Watt' : 'Price'} must be a valid number.`);
            return;
        } else {
            setError('');
        }
    
        if (isNew) {
            // Update newly added watt field with valid number
            setNewWattFields(prevFields =>
                prevFields.map(field =>
                    field.id === id ? { ...field, [name]: numericValue } : field
                )
            );
        } else {
            // Update existing watt field with valid number
            setFormData(prevData => ({
                ...prevData,
                watts: prevData.watts.map(field =>
                    field.watt_id === id ? { ...field, [name]: numericValue } : field
                )
            }));
        }
    };
    
    return (
        <div>
            <div className='text-center text-sm text-gray-600 mb-2'>In existing fields only prices are changeable</div>
            {/* Render existing watt variants (non-removable) */}
            {formData.watts?.map((field) => (
                <div className='flex justify-center items-center gap-4' key={field.watt_id}>
                    <InputData
                        type="number"
                        label="Watt Value"
                        name="watt"
                        value={field.watt}
                        onChange={(e) => handleChange(field.watt_id, 'watt', e.target.value, false)} // false means existing field
                        required={true}
                        disabled={true} // Disable input for existing fields
                    />
                    <InputData
                        type="number"
                        label="Price"
                        name="price"
                        value={field.price}
                        onChange={(e) => handleChange(field.watt_id, 'price', e.target.value, false)} // false means existing field
                        required={true}
                    />
                </div>
            ))}

            

            {/* Render newly added watt variants (removable) */}
            {newWattFields.map((field) => (
                <div className='flex justify-center items-center gap-4' key={field.id}>
                    <InputData
                        type="number"
                        label="Watt Value"
                        name="watt"
                        value={field.watt}
                        onChange={(e) => handleChange(field.id, 'watt', e.target.value, true)} // true means new field
                        required={true}
                    />
                    <InputData
                        type="number"
                        label="Price"
                        name="price"
                        value={field.price}
                        onChange={(e) => handleChange(field.id, 'price', e.target.value, true)} // true means new field
                        required={true}
                    />
                    <button className='text-red-700 mt-2' onClick={() => removeNewField(field.id)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            ))}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Button to add new watt variant */}
            <div className='flex justify-center'>
                <button type="button" onClick={addNewField} className='shadow-md border-2 p-2 text-sm rounded hover:bg-gray-300 transition duration-300 font-semibold text-green-900'>
                    <FontAwesomeIcon icon={faPlus} /> Add More Fields
                </button>
            </div>
        </div>
    );
}
