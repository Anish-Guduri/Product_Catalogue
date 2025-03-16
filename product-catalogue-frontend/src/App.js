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
    fetchProducts();
  }, []);

  // Function to fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://my-product-catalogue-app2.azurewebsites.net/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const updatedProducts = await res.json();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (newProduct) => {
    try {

      await fetchProducts();
      setShowPopup(false);

    } catch (error) {

      console.error("Error adding product:", error);

    }
  };

  const filteredProducts = filter === "All"
    ? products
    : products.filter((product) => product.type === filter);

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
