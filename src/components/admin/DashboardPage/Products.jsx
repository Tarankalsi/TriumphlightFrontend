import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableRow from "../ProductPage.jsx/TableRow";

const apiUrl = import.meta.env.VITE_URL;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/product/all`);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Products</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Product List</h3>
          <Link
            to={'./create-product'}
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300"
          >
            Add New Product
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-6 py-3 text-left font-medium">Product Name</th>
                <th className="px-6 py-3 text-left font-medium">Category</th>
                <th className="px-6 py-3 text-left font-medium">Stock</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((product) => (
                <TableRow key={product.product_id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
