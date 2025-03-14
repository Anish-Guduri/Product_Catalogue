import React from 'react';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddItemPopup from './components/AddItemPopup';
import ProductCard from './components/ProductCard';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(product => product.type === filter);

  return (
    <div>
      <Navbar onAddItem={() => setShowPopup(true)} onFilter={setFilter} />
      {showPopup && (
        <AddItemPopup 
          onClose={() => setShowPopup(false)} 
          onAdd={handleAddProduct} 
        />
      )}
      <div className="container mt-4">
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


