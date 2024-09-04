import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heroflex from '../components/Heroflex';
import Herocounter from '../components/Herocounter';
import Herocards from '../components/HomPage/Herocards';
import Heroone from '../components/Heroone';
import Herolast from '../components/Herolast';
import ClipLoader from 'react-spinners/ClipLoader';  // Import spinner from react-spinners
import Bulbglow from '../components/HomPage/Bulbglow';


const apiUrl = import.meta.env.VITE_URL;

const Home = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);  // State to handle loading

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);  // Stop loading when data fetching is complete
      }
    };
    fetchCategories();

    // Clean up the request when the component unmounts
    return () => {
      //...
    };
  }, []);

  const filteredCategories = (string) => {
    return categories?.filter(item =>
      item.name.toLowerCase().includes(string.toLowerCase())
    );
  };

  const indoor = filteredCategories("Indoor")?.[0];
  const outdoor = filteredCategories("Outdoor")?.[0];

  return (
    <div>
      <Heroone />
      {/* <Herothree /> */}

      {/* Display loading spinner while loading */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          <Bulbglow />
          
          {indoor && <Herocards key={indoor.category_id} category={indoor} />}
         
          {outdoor && <Herocards key={outdoor.category_id} category={outdoor} />}
          <Heroflex />
          
          <Herocounter />
          <Herolast />
        </>
      )}
    </div>
  );
};

export default Home;
