import React, { useEffect, useState } from "react";
import Heroone from "../components/Heroone";
import Herolast from "../components/Herolast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductInfo from "../components/ProductDetails/ProductInfo";

import MoreInfo from "../components/ProductDetails/MoreInfo";

import LoginModal from "../components/general/LoginModal";
import Cookies from 'js-cookie';
import { checkLogin } from "../utils/checkLogin";
import ProductInfoSkeleton from "../components/Loaders/ProductInfoSkeleton";
import MoreInfoSkeleton from "../components/Loaders/MoreInfoSkeleton";
import SkeletonLoader from "../components/Loaders/SkeletonLoader";


const apiUrl = import.meta.env.VITE_URL;

const Productdetails = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState(null);
    const { product_id } = useParams();
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const login = checkLogin();
        console.log("Login in true")
        setIsLoggedIn(login);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product/${product_id}`);
                const productData = response.data.data;
                setProduct(productData);
                setSelectedImage(productData.images[0].url);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [product_id]);

    return (
        <div className="min-h-screen">
            <div><Heroone /></div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-4 py-2 bg-gray-200 lg:h-screen">
                {showModal && (
                    <div className="fixed inset-0 z-50">
                        <LoginModal onClose={() => setShowModal(false)} />
                    </div>
                )}

                {/* Thumbnail and Main Image */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-6">
                    {/* Thumbnails */}
                    <div className="sm:col-span-1 flex sm:flex-col gap-2 items-center sm:my-2 mx-1">
                        {loading ? (
                            <SkeletonLoader className="w-20 h-14 sm:w-18 sm:h-16 md:w-18 md:h-16" />
                        ) : (
                            product.images?.map((img, index) => (
                                <div
                                    key={index}
                                    className="w-20 h-14 sm:w-18 sm:h-16 md:w-18 md:h-16 z-10 cursor-pointer md:mb-1 flex justify-center shadow-md border-2 border-gray-200 overflow-hidden"
                                    onClick={() => setSelectedImage(img.url)}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            className="w-fit h-cover transition-transform duration-300 hover:scale-110"
                                            src={img.url}
                                            alt={`Thumbnail ${index}`}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Main Image for All Screens */}
                    <div className="sm:col-span-5 justify-center my-2 mx-1">
                        {loading ? (
                            <SkeletonLoader className="h-72 w-full" />
                        ) : (
                            <img
                                className=" w-cover h-cover shadow-md"
                                src={selectedImage}
                                alt="Selected Product"
                            />
                        )}
                    </div>
                </div>

                {/* Product Information */}
                <div className="lg:col-span-5 sm:my-2 mx-1 lg:overflow-y-auto overflow-hidden">
                    <div className="bg-white mb-3 shadow-md">
                        {loading ? (
                            <ProductInfoSkeleton />
                        ) : (
                            <ProductInfo product={product} isLoggedIn={isLoggedIn} setShowModal={setShowModal} />
                        )}
                    </div>

                    <div className="bg-white mb-3">
                        {loading ? (
                            <MoreInfoSkeleton />
                        ) : (
                            <MoreInfo product={product} />
                        )}
                    </div>
                </div>
            </div>

            <Herolast />
        </div>
    );
};

export default Productdetails;
