import React, { useState } from 'react';
import InputData from './InputData';
import { useRecoilState } from 'recoil';
import { createProductAtom } from '../../../store/atoms/adminAtoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';  // Import UUID for unique IDs

export default function AddProductWattInputField() {
  const [formData, setFormData] = useRecoilState(createProductAtom);
  const [error, setError] = useState('');

  const addField = () => {

    if (!formData.watts) {
        setFormData({ ...formData, watts: [] });  // Ensure watts array exists
      }

    const newField = { id: uuidv4(), watt: '', price: '' };  // Add unique ID
    console.log("New Field :",newField);
    setFormData(prevData => ({
      ...prevData,
      watts: [...prevData.watts, newField]
    }));
    console.log(formData)
  };

  const removeField = (id) => {
    setFormData(prevData => ({
      ...prevData,
      watts: prevData.watts.filter(field => field.id !== id)
    }));
  };


  const handleChange = (id, name, value) => {
    let numericValue;
    
    // Check for watt (integer) or price (float) and handle accordingly
    if (name === 'watt') {
      numericValue = parseInt(value,10);  // Convert to float for watt
    } else if (name === 'price') {
      numericValue = parseFloat(value);  // Convert to float for price
    }
    
    // Check if the value is valid
    if (isNaN(numericValue)) {
      setError(`${name === 'watt' ? 'Watt' : 'Price'} must be a valid number.`);
      return;
    } else {
      setError('');  // Clear the error if the input is valid
    }
  
    setFormData(prevData => ({
      ...prevData,
      watts: prevData.watts.map(field =>
        field.id === id ? { ...field, [name]: numericValue } : field
      )
    }));
    console.log("Form Data:",formData)
  };

  return (
    <div>
      {formData.watts.map((field) => (
        <div className='flex justify-center items-center gap-4' key={field.id}>
          <InputData
            type="number"
            label="Watt Value"
            name="watt"
            value={field.watt}
            onChange={(e) => handleChange(field.id, 'watt', e.target.value)}
            required={true}
          />
          <InputData
            type="number"
            label="Price"
            name="price"
            value={field.price}
            onChange={(e) => handleChange(field.id, 'price', e.target.value)}
            required={true}
          />
          <button className='text-red-700 mt-2' onClick={() => removeField(field.id)}> 
            <FontAwesomeIcon icon={faMinus}/> 
          </button>
        </div>
      ))}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className='flex justify-center'>
        <button type="button" onClick={addField} className='shadow-md border-2 p-2 text-sm rounded hover:bg-gray-300 transition duration-300 font-semibold text-green-900'>
          <FontAwesomeIcon icon={faPlus}/> Add More Fields
        </button>
      </div>
    </div>
  );
}
