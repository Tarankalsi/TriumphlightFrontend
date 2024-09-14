import React, { useState } from "react";
import InputData from "./InputData";
import InputTextField from "./InputTextField";
import Cookies from 'js-cookie'
import { useRecoilState } from "recoil";
import { createdProductIdAtom, createProductAtom } from "../../../store/atoms/adminAtoms";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_URL;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(createProductAtom);
  const {category_id , ...productData} = formData

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);


    // Validate required fields
    if (!productData.name || !productData.description  || !productData.availability || !productData.SKU || !productData.colors.length || !productData.watts.length) {
      console.error("Missing required fields");
      setIsSubmitting(false); // Ensure isSubmitting is reset if validation fails
      return;
    }

    try {

      navigate('images', { state: { formData: formData } });

    } catch (error) {
      console.error(error);
    }

    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create New Product
      </h2>

      <Form onSubmit={handleSubmit} buttonLabel={"Create Product"} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateProduct;
