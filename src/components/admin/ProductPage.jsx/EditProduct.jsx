import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { colorsAtom, createProductAtom, createdProductIdAtom, newWattFieldsAtom } from "../../../store/atoms/adminAtoms";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EditForm from "./EditForm";

const apiUrl = import.meta.env.VITE_URL;

const EditProduct = ({product}) => {
  const navigate = useNavigate();
 // Assume route param provides the productId
  const [formData, setFormData] = useRecoilState(createProductAtom);
  const [newWattFields, setNewWattFields] = useRecoilState(newWattFieldsAtom);
  const [existingProduct, setExistingProduct] = useState(null); // State to store existing product data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newColors, setNewColors] = useRecoilState(colorsAtom)
  
  useEffect(() => {
    setExistingProduct(product)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

     // Combine existing and new watt fields
     const combinedWattFields = [...formData.watts, ...newWattFields];
    
     // Update formData with combined watt fields
     setFormData(prevData => ({
       ...prevData,
       watts: combinedWattFields
     }));

    try {
      // Update product data
 
      await axios.post(`${apiUrl}/product/update/product/${product.product_id}`, {
        name: formData.name, // Optional
        description: formData.description, // Optional
        availability: formData.availability, // Optional
        colors : newColors, // Optional and converted to uppercase if provided
        material: formData.material, // Optional
        shape: formData.shape, // Optional
        design_style: formData.design_style, // Optional
        fixture_form: formData.fixture_form, // Optional
        ideal_for: formData.ideal_for, // Optional
        power_source: formData.power_source, // Optional
        installation: formData.installation, // Optional
        shade_material: formData.shade_material, // Optional
        voltage: formData.voltage, // Optional
        light_color: formData.light_color, // Optional
        light_source: formData.light_source, // Optional
        light_color_temperature: formData.light_color_temperature, // Optional
        included_components: formData.included_components, // Optional
        lighting_method: formData.lighting_method, // Optional
        item_weight: formData.item_weight, // Required
        height: formData.height, // Optional
        length: formData.length, // Optional
        width: formData.width, // Optional
        quantity: formData.quantity, // Optional
        power_rating: formData.power_rating, // Optional
        brightness: formData.brightness, // Optional
        controller_type: formData.controller_type, // Optional
        switch_type: formData.switch_type, // Optional
        switch_mounting: formData.switch_mounting, // Optional
        mounting_type: formData.mounting_type, // Optional
        fixture_type: formData.fixture_type, // Optional
        assembly_required: formData.assembly_required, // Optional
        primary_material: formData.primary_material, // Optional
        number_of_light_sources: formData.number_of_light_sources, // Optional
        surge_protection: formData.surge_protection, // Optional
        shade_color: formData.shade_color, // Optional
        key_features: formData.key_features, // Optional
        batteries: formData.batteries, // Optional
        embellishment: formData.embellishment,
        watts:formData.watts, // Optional
      },{
        headers: {
            "Content-Type": "application/json",
          'Authorization': `Bearer ${Cookies.get('adminToken')}`
        }
      });

      navigate(''); // Redirect after successful update
    } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h2>
      {/* Only render the form when existing product data is loaded */}
      {existingProduct ? (
        <EditForm
          onSubmit={handleSubmit}
          buttonLabel={"Update Product"}
          isSubmitting={isSubmitting}
          initialData={existingProduct} // Pass initial data to the form
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
