import React from 'react';
import { createProductAtom } from '../../../store/atoms/adminAtoms';
import { useRecoilState } from 'recoil';

const InputData = ({ type, label, name, value, onChange, required = false , disabled = false }) => {

  const [formData, setFormData] = useRecoilState(createProductAtom)

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default InputData;
 