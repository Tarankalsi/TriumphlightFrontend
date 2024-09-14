import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

const apiUrl = import.meta.env.VITE_URL;

const ProdutPreview = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const { data } = await axios.get(`${apiUrl}/product/${productId}`);
        setProduct(data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 ">
          <div className="relative w-full ">
            <img
              src={product.images[0]?.url || "default-image-url"} // Use a default image if none is available
              alt={product.name}
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
            <div className=" mt-4 flex  justify-center">
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`Product thumbnail ${index}`}
                      className=" shadow-md w-16 h-16 object-cover rounded-full border-2 border-gray-800 cursor-pointer"
                      onClick={() => {
                        document.querySelector('.object-cover').src = img.url;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          {product.price && (
            <p className="text-lg font-semibold mb-2">Price: <FontAwesomeIcon icon={faIndianRupee} className="size-4"/> {product.price.toFixed(2)}</p>
          )}

          {product.discount_percent && (
            <p className="text-lg font-semibold mb-2">Discount: {product.discount_percent}%</p>
          )}

          {product.availability && (
            <p className="text-lg font-semibold mb-2">Stock: {product.availability}</p>
          )}

          {product.SKU && (
            <p className="text-lg font-semibold mb-2">SKU: {product.SKU}</p>
          )}

          {product.brand && (
            <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
          )}

          {product.material && (
            <p className="text-lg font-semibold mb-2">Material: {product.material}</p>
          )}

          {product.shape && (
            <p className="text-lg font-semibold mb-2">Shape: {product.shape}</p>
          )}

          {product.design_style && (
            <p className="text-lg font-semibold mb-2">Design Style: {product.design_style}</p>
          )}

          {product.fixture_form && (
            <p className="text-lg font-semibold mb-2">Fixture Form: {product.fixture_form}</p>
          )}

          {product.ideal_for && (
            <p className="text-lg font-semibold mb-2">Ideal For: {product.ideal_for}</p>
          )}

          {product.power_source && (
            <p className="text-lg font-semibold mb-2">Power Source: {product.power_source}</p>
          )}

          {product.installation && (
            <p className="text-lg font-semibold mb-2">Installation: {product.installation}</p>
          )}

          {product.shade_material && (
            <p className="text-lg font-semibold mb-2">Shade Material: {product.shade_material}</p>
          )}

          {product.voltage && (
            <p className="text-lg font-semibold mb-2">Voltage: {product.voltage}</p>
          )}

          {product.light_color && (
            <p className="text-lg font-semibold mb-2">Light Color: {product.light_color}</p>
          )}

          {product.light_source && (
            <p className="text-lg font-semibold mb-2">Light Source: {product.light_source}</p>
          )}

          {product.light_color_temperature && (
            <p className="text-lg font-semibold mb-2">Light Color Temperature: {product.light_color_temperature}</p>
          )}

          {product.included_components && (
            <p className="text-lg font-semibold mb-2">Included Components: {product.included_components}</p>
          )}

          {product.lighting_method && (
            <p className="text-lg font-semibold mb-2">Lighting Method: {product.lighting_method}</p>
          )}

          {product.item_weight && (
            <p className="text-lg font-semibold mb-2">Item Weight: {product.item_weight}</p>
          )}

          {product.height && (
            <p className="text-lg font-semibold mb-2">Height: {product.height}</p>
          )}

          {product.length && (
            <p className="text-lg font-semibold mb-2">Length: {product.length}</p>
          )}

          {product.width && (
            <p className="text-lg font-semibold mb-2">Width: {product.width}</p>
          )}

          {product.quantity && (
            <p className="text-lg font-semibold mb-2">Quantity: {product.quantity}</p>
          )}

          {product.power_rating && (
            <p className="text-lg font-semibold mb-2">Power Rating: {product.power_rating}</p>
          )}

          {product.brightness && (
            <p className="text-lg font-semibold mb-2">Brightness: {product.brightness}</p>
          )}

          {product.controller_type && (
            <p className="text-lg font-semibold mb-2">Controller Type: {product.controller_type}</p>
          )}

          {product.switch_type && (
            <p className="text-lg font-semibold mb-2">Switch Type: {product.switch_type}</p>
          )}

          {product.switch_mounting && (
            <p className="text-lg font-semibold mb-2">Switch Mounting: {product.switch_mounting}</p>
          )}

          {product.mounting_type && (
            <p className="text-lg font-semibold mb-2">Mounting Type: {product.mounting_type}</p>
          )}

          {product.fixture_type && (
            <p className="text-lg font-semibold mb-2">Fixture Type: {product.fixture_type}</p>
          )}

          {product.assembly_required && (
            <p className="text-lg font-semibold mb-2">Assembly Required: {product.assembly_required}</p>
          )}

          {product.primary_material && (
            <p className="text-lg font-semibold mb-2">Primary Material: {product.primary_material}</p>
          )}

          {product.number_of_light_sources && (
            <p className="text-lg font-semibold mb-2">Number of Light Sources: {product.number_of_light_sources}</p>
          )}

          {product.surge_protection && (
            <p className="text-lg font-semibold mb-2">Surge Protection: {product.surge_protection}</p>
          )}

          {product.shade_color && (
            <p className="text-lg font-semibold mb-2">Shade Color: {product.shade_color}</p>
          )}

          {product.key_features && (
            <p className="text-lg font-semibold mb-2">Key Features: {product.key_features}</p>
          )}

          {product.batteries && (
            <p className="text-lg font-semibold mb-2">Batteries: {product.batteries}</p>
          )}

          {product.embellishment && (
            <p className="text-lg font-semibold mb-2">Embellishment: {product.embellishment}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutPreview;
