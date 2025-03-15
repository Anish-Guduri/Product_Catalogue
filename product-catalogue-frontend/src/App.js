import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddItemPopup from "./components/AddItemPopup";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showPopup, setShowPopup] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to add a product
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]); // Add new product to state
      setShowPopup(false); // Close popup after adding
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const filteredProducts = filter === "All" ? products : products.filter((product) => product.type === filter);

  return (
    <div>
      <Navbar onAddItem={() => setShowPopup(true)} onFilter={setFilter} />
      {showPopup && <AddItemPopup onClose={() => setShowPopup(false)} onAdd={handleAddProduct} />}
      <div className="container mt-4">
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}






// import React from 'react';

// import { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import AddItemPopup from './components/AddItemPopup';
// import ProductCard from './components/ProductCard';

// export default function App() {
//   const [products, setProducts] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [showPopup, setShowPopup] = useState(false);

// //   useEffect(() => {
// //   //   fetch('my-product-catalogue-app2.azurewebsites.net/api/products')
// //   //     .then(res => res.json())
// //   //     .then(data => setProducts(data));
// //   fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products", {
// //     method: "POST",
// //     headers: {
// //         "Content-Type": "application/json"
// //     },
// //     body: JSON.stringify(data)
// // })

// //   }, []);

// useEffect(() => {
//   fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products")
//     .then(res => res.json())
//     .then(data => setProducts(data))
//     .catch(error => console.error("Error fetching products:", error));
// }, []);

//   const handleAddProduct = (newProduct) => {
//     setProducts([...products, newProduct]);
//   };

//   const filteredProducts = filter === 'All'
//     ? products
//     : products.filter(product => product.type === filter);

//   return (
//     <div>
//       <Navbar onAddItem={() => setShowPopup(true)} onFilter={setFilter} />
//       {showPopup && (
//         <AddItemPopup 
//           onClose={() => setShowPopup(false)} 
//           onAdd={handleAddProduct} 
//         />
//       )}
//       <div className="container mt-4">
//         <div className="row">
//           {filteredProducts.map(product => (
//             <div key={product.id} className="col-md-4 mb-3">
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


