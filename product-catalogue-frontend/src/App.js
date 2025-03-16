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



  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(
        "https://my-product-catalogue-app2.azurewebsites.net/api/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Wait for the server to return the product with the image
      const savedProduct = await response.json();
  
      // Fetch updated products to ensure the image is included
      fetchUpdatedProducts();
  
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  // Function to fetch updated product list
  const fetchUpdatedProducts = async () => {
    try {
      const res = await fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      
      const updatedProducts = await res.json();
      setProducts(updatedProducts); // Update state with latest data
    } catch (error) {
      console.error("Error fetching updated products:", error);
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






















  // // Function to add a product
  // const handleAddProduct = async (newProduct) => {
  //   try {
  //     const response = await fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newProduct),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const savedProduct = await response.json();
  //     setProducts([...products, savedProduct]); // Add new product to state
  //     setShowPopup(false); // Close popup after adding
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };

//   const handleAddProduct = async (newProduct) => {
//     try {
//       const response = await fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       console.log("Response:", response);
// const responseData = await response.json();
// console.log("Response JSON:", responseData);

//       // The server returns the newly created product, with the correct ID/image
//       const savedProduct = await response.json();
  
//       // Use the server's product (with image) in your local state
//       setProducts((prev) => [...prev, savedProduct]);
//       // fetchProducts();
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };
  

    // Function to add a product (updates state with server response)
  //   const handleAddProduct = async (newProduct) => {
  //     try {
  //       const response = await fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(newProduct),
  //       });
    
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
    
  //       // The server returns the newly created product, complete with ID and image
  //       // const savedProduct = await response.json();
    
  //       // Update local state with the product returned by the server
  //       setProducts((prevProducts) => [...prevProducts, newProduct]);
  //       setShowPopup(false);
  //     } catch (error) {
  //       console.error("Error adding product:", error);
  //     }
  //   };




