
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Categories from "../../components/admin/DashboardPage/Categories";
import Products from "../../components/admin/DashboardPage/Products";
import Orders from "../../components/admin/DashboardPage/orders";
import CreateProduct from "../../components/admin/ProductPage.jsx/CreateProduct";
import CreateGallery from "../../components/admin/ProductPage.jsx/CreateGallery";
import ProdutPreview from "../../components/admin/ProductPage.jsx/ProductPreview";
import EditGallery from "../../components/admin/ProductPage.jsx/EditGallery";
import EditPage from "../../components/admin/ProductPage.jsx/EditPage";
import { checkLogin } from "../../utils/checkLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = checkLogin()
    if (!isLogin) {
      navigate('/admin/login', { replace: true })
    }
  }, [])

  const onLogout = () => {
    Cookies.remove("adminToken");
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-800 text-white flex flex-col justify-between">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-center md:text-left">Admin Panel</h1>
        </div>

        <nav className="flex-1">
          <ul>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-blue-700"
                    : "block py-3 px-4 hover:bg-blue-700 transition duration-300"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-blue-700"
                    : "block py-3 px-4 hover:bg-blue-700 transition duration-300"
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button Container */}
        <div className="flex justify-end p-4 md:mb-10">
          <button onClick={onLogout} className="text-sm font-bold text-blue-500 hover:text-blue-700 bg-white px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </aside>


      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard Overview</h1>
        </header>



        {/* Routes for Orders, Products, Categories */}
        <Routes>

          <Route path="" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="create-product" element={<CreateProduct />} />

          <Route path="create-product/images" element={<CreateGallery />} />
          <Route path="edit-product/:product_id" element={<EditPage />} />
          <Route path="product/:productId" element={<ProdutPreview />} />

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

