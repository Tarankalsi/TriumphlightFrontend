import React, { useEffect, useState, useCallback } from 'react';
import { Select, Input } from 'antd';
import { debounce } from 'lodash';
import axios from 'axios';
import Heroone from './Heroone';
import Herolast from './Herolast';
import ProductCard from './general/ProductCard';
import { ClipLoader } from 'react-spinners';
import Herocounter from './Herocounter';

const apiUrl = import.meta.env.VITE_URL;

const Search = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state for data fetching

    // Fetch products when query changes
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);  // Start loading
            try {
                const response = await axios.get(`${apiUrl}/product/search?searchQuery=${query}`);
                setProducts(response.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);  // Stop loading
            }
        };

        fetchProducts();
    }, [query]);

    // Fetch categories and colors once on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product/categories`);
                const formattedCategories = response.data.categories.map(category => ({
                    value: category.name,
                    label: category.name,
                }));
                setCategories(formattedCategories);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchColors = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product/all/colors`);
                const formattedColors = response.data.colors.map(color => ({
                    value: color.color_name,
                    label: color.color_name,
                }));
                setColors(formattedColors);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
        fetchColors();
    }, []);

    // Debounced function to handle search input changes
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            setQuery(searchValue);
        }, 600), // Adjust the delay as needed
        []
    );

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const handleSelectChange = (value) => {
        setQuery(value);
    };

    return (
        <div>
            <Heroone />
            <div className='2xl:justify-center 2xl:flex'>

           
            <div className="px-[10px] py-[5px] sm:px-[25px] sm:py-[5px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:w-[1200px] flex 2xl:justify-center 2xl:gap-[100px]">
                <div className="responsivesearch w-[700px] md:w-[1000px] lg:w-[1200px] h-[auto]  bg-slate-100">
                    <div className="filtersres w-[100%] h-[40px] flex justify-around">
                        <Select
                            defaultValue="Colors"
                            style={{ width: 80 }}
                            options={colors}
                            onSelect={handleSelectChange}
                        />
                        <Select
                            defaultValue="Category"
                            style={{ width: 80 }}
                            options={categories}
                            onSelect={handleSelectChange}
                        />
                        <Input
                            placeholder="Search here"
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="search-card-back  w-[100%]  flex justify-center gap-[15px] flex-wrap p-3">
                        {loading ? (
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        ) : products.length ? (
                            products.map((product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>

                <div className="desktopsearch w-[700px] md:w-[1000px] lg:w-[1200px] h-[auto] flex">
                    <div className="filterpanel w-[30%] sm:w-[20%] md:w-[20%] px-[8px] py-[5px] flex flex-col gap-[10px]">
                        <Select
                            defaultValue="Color"
                            style={{ width: 120 }}
                            options={colors}
                            onSelect={handleSelectChange}
                        />
                        <Select
                            defaultValue="Category"
                            style={{ width: 120 }}
                            options={categories}
                            onSelect={handleSelectChange}
                        />
                    </div>

                    <div className="w-[100%] h-[auto]">
                        <div className='flex justify-center'>
                            <Input
                                placeholder="Search For Lights"
                                variant="filled"
                                onChange={handleSearchChange}
                                className='my-2 w-[80%] border-2 border-gray-200 '
                            />
                        </div>

                        <div className="justify-center w-[100%] flex flex-wrap gap-[25px] px-[20px] py-[5px]">
                            {loading ? (
                                <ClipLoader size={40} color={"#123abc"} loading={loading} />
                            ) : products.length ? (
                                products.map((product) => (
                                    <ProductCard key={product.product_id} product={product} />
                                ))
                            ) : (
                                <p>No products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            </div>
            <Herocounter/>

            <Herolast />
        </div>
    );
};

export default Search;
