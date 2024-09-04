import React, { useEffect } from 'react'
import { useRecoilState } from "recoil";
import { categoriesAtom, colorsAtom, createProductAtom } from '../../../store/atoms/adminAtoms';
import InputData from './InputData';
import InputTextField from './InputTextField';
import Cookies from 'js-cookie';
import axios from 'axios';
import InputDropdown from './InputDropdown';
import AddInputField from './AddInputField';


const apiUrl = import.meta.env.VITE_URL;

export default function Form({ onSubmit, buttonLabel , isSubmitting}) {

    const [formData, setFormData] = useRecoilState(createProductAtom);
    const [categories, setCategories] = useRecoilState(categoriesAtom);


    const handleChange = (e) => {

        const { name, value, type } = e.target;

        let convertedValue

        if (type === 'number') {
            // Convert the value to a number, handling the case where the value is an empty string
            convertedValue = value === '' ? value : Number(value);
        } else {
            convertedValue = value;
        }

        setFormData({
            ...formData,
            [name]: convertedValue,
        });
        

    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product/categories`);
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error.response ? error.response.data : error.message);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <div>
            <form onSubmit={onSubmit}>
                {/* Basic Details */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h3 className=" col-span-2 text-center text-xl font-semibold my-3 underline">
                        Basic Details
                    </h3>
                    <InputData
                        type="text"
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="text"
                        label="SKU"
                        name="SKU"
                        value={formData.SKU}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputTextField
                        type="text"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="number"
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="number"
                        label="Availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="number"
                        label="Discount (in percent)"
                        name="discount_percent"
                        value={formData.discount_percent}
                        onChange={handleChange}
                    />

                    <InputDropdown
                        label={"Category"}
                        array={categories}
                        value={formData.category_id}
                        onChange={handleChange}
                        required={true}

                    />


                </div>


                <h3 className="text-center text-xl font-semibold my-3 underline">
                    Add Color Variants
                </h3>

                <div className="grid grid-cols-1 gap-6">
                    <AddInputField />
                </div>

{/* Dimensions */}
<h3 className="text-center text-xl font-semibold my-3 underline">
                    Dimensions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputData
                        type="text"
                        label="Height (in cms)"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="text"
                        label="Width (in cms)"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="text"
                        label="Length (in cms)"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        required={true}
                    />
                    <InputData
                        type="text"
                        label="Item Weight (in grams)"
                        name="item_weight"
                        value={formData.item_weight}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                {/* Product Details */}
                <h3 className="text-center text-xl font-semibold my-3 underline">
                    Product Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputData
                        type="text"
                        label="Material"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Shape"
                        name="shape"
                        value={formData.shape}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Design Style"
                        name="design_style"
                        value={formData.design_style}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Fixture Form"
                        name="fixture_form"
                        value={formData.fixture_form}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Fixture Type"
                        name="fixture_type"
                        value={formData.fixture_type}
                        onChange={handleChange}
                    />
                    <InputTextField
                        type="text"
                        label="Ideal For"
                        name="ideal_for"
                        value={formData.ideal_for}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Power Source"
                        name="power_source"
                        value={formData.power_source}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Installation"
                        name="installation"
                        value={formData.installation}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Shade Material"
                        name="shade_material"
                        value={formData.shade_material}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Voltage"
                        name="voltage"
                        value={formData.voltage}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Light Source"
                        name="light_source"
                        value={formData.light_source}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Light Color"
                        name="light_color"
                        value={formData.light_color}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Light Color Temperature"
                        name="light_color_temperature"
                        value={formData.light_color_temperature}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Included Components"
                        name="included_components"
                        value={formData.included_components}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Lighting Method"
                        name="lighting_method"
                        value={formData.lighting_method}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </div>

                

                {/* Extra Details */}
                <h3 className="text-center text-xl font-semibold my-3 underline">
                    More Extra Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputData
                        type="text"
                        label="Power Rating"
                        name="power_rating"
                        value={formData.power_rating}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Brightness"
                        name="brightness"
                        value={formData.brightness}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Controller Type"
                        name="controller_type"
                        value={formData.controller_type}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Switch Type"
                        name="switch_type"
                        value={formData.switch_type}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Switch Mounting"
                        name="switch_mounting"
                        value={formData.switch_mounting}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Mounting Type"
                        name="mounting_type"
                        value={formData.mounting_type}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Assembly Required"
                        name="assembly_required"
                        value={formData.assembly_required}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Primary Material"
                        name="primary_material"
                        value={formData.primary_material}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Number of Light Sources"
                        name="number_of_light_sources"
                        value={formData.number_of_light_sources}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Surge Protection"
                        name="surge_protection"
                        value={formData.surge_protection}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Shade Color"
                        name="shade_color"
                        value={formData.shade_color}
                        onChange={handleChange}
                    />
                    <InputTextField
                        type="text"
                        label="Key Features"
                        name="key_features"
                        value={formData.key_features}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Batteries"
                        name="batteries"
                        value={formData.batteries}
                        onChange={handleChange}
                    />
                    <InputData
                        type="text"
                        label="Embellishment"
                        name="embellishment"
                        value={formData.embellishment}
                        onChange={handleChange}
                    />

                </div>

                <button
        type="submit"
        className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        disabled={isSubmitting}
    >
        {isSubmitting ? "Creating..." : buttonLabel}
    </button>
            </form>
        </div>
    )
}
