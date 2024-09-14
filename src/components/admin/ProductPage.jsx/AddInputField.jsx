import React, { useState } from 'react';
import InputData from './InputData';
import { useRecoilState } from 'recoil';
import { createProductAtom } from '../../../store/atoms/adminAtoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';  // Import UUID for unique IDs

export default function AddInputField() {
  const [formData, setFormData] = useRecoilState(createProductAtom);
  const [error, setError] = useState('');

  const addField = () => {
    const newField = { id: uuidv4(), color_name: '', hex: '' };  // Add unique ID
    setFormData(prevData => ({
      ...prevData,
      colors: [...prevData.colors, newField]
    }));
  };

  const removeField = (id) => {
    setFormData(prevData => ({
      ...prevData,
      colors: prevData.colors.filter(field => field.id !== id)
    }));
  };

  const handleChange = (id, name, value) => {
    if (name === 'hex' && value.trim() !== '') {
      const isDuplicate = formData.colors.some(field => 
        field.hex === value && field.id !== id  // Check for duplicates except the current field
      );
      if (isDuplicate) {
        setError('Hex code must be unique');
        return;
      } else {
        setError('');
      }
    }

    setFormData(prevData => ({
      ...prevData,
      colors: prevData.colors.map(field => 
        field.id === id ? { ...field, [name]: value } : field
      )
    }));

    console.log("Form Data :", formData);
  };

  return (
    <div>
      {formData.colors.map((field) => (
        <div className='flex justify-center items-center gap-4' key={field.id}>
          <InputData
            type="text"
            label="Color Name"
            name="color_name"
            value={field.color_name}
            onChange={(e) => handleChange(field.id, 'color_name', e.target.value)}
            required={true}
          />
          <InputData
            type="text"
            label="Hex Code (Example: #FFFFFF)"
            name="hex"
            value={field.hex}
            onChange={(e) => handleChange(field.id, 'hex', e.target.value)}
            required={true}
          />
          <button className='text-red-700 mt-2' onClick={() => removeField(field.id)}> <FontAwesomeIcon icon={faMinus}/> </button>
        </div>
      ))}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className='flex justify-center'>
        <button  type="button" onClick={addField} className='shadow-md border-2 p-2 text-sm rounded hover:bg-gray-300 transition duration-300 font-semibold text-green-900'>
          <FontAwesomeIcon icon={faPlus}/> Add More Fields
        </button>
      </div>
    </div>
  );
}
