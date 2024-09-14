import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createdProductIdAtom } from '../../../store/atoms/adminAtoms';
import Cookies from 'js-cookie';
import axios from 'axios';
import { uploadImageInS3 } from '../../../utils/uploadImageInS3';
import { useLocation, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_URL;

export default function CreateGallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const formData = location.state?.formData;

  const { category_id, ...productData } = formData


  useEffect(() => {

    if (!productData.name || !productData.description  || !productData.availability || !productData.SKU || !productData.colors.length || !productData.watts.length) {

      navigate('../create-product')
      console.error("Missing required fields in create");
      return;
    }

  }, [])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = images[index];
    URL.revokeObjectURL(imageToRemove.preview); // Clean up object URL
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setIsLoading(true); // Start loading



    try {
      const response = await axios.post(`${apiUrl}/product/create/product/${category_id}`, productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('adminToken')}`
        }
      });

      await Promise.all(images.map(async (image) => {
        const { data } = await axios.post(`${apiUrl}/product/create/gallery/presigned/${response.data.product.product_id}`, {
          imageName: image.file.name,
          contentType: image.file.type,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('adminToken')}`,
          },
        });


        const uploadImage = await uploadImageInS3(image.file, data.url);
        if (uploadImage.status === 200) {
          const metadata = await axios.post(`${apiUrl}/product/create/gallery/${response.data.product.product_id}`, {
            key: data.key,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get('adminToken')}`,
            },
          });
  
        }
      }));

      alert('Images uploaded successfully!');
      navigate('../products');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2 className='text-center text-2xl font-bold'>Create Gallery</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm py-2 text-center text-gray-500 file:mr-4 file:py-3 file:px-8 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading} // Disable file input when loading
      />

      <div className="gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-preview relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={image.preview}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              disabled={isLoading} // Disable remove button when loading
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className='flex justify-center'>
        <button
          onClick={handleUpload}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          disabled={isLoading} // Disable upload button when loading
        >
          {isLoading ? 'Uploading...' : 'Upload Images'}
        </button>
      </div>
    </div>
  );
}

