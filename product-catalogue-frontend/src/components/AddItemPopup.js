import React from 'react';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addProduct } from '../api';

export default function AddItemPopup({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    type: 'Shirt',
    color: '#ffffff',
    size: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async () => {
    if (form.price < 1 || form.price > 10000) {
      alert('Price should be between ₹1 and ₹10,000');
      return;
    }

    const newProduct = await addProduct(form);
    if (newProduct) {
      onAdd(newProduct);
      onClose();
      alert('Item added successfully!');
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handleChange}>
              <option>Shirt</option>
              <option>Pant</option>
              <option>T-Shirt</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Size (in inches)</Form.Label>
            <Form.Control
              type="text"
              name="size"
              value={form.size}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={form.price}
              min="1"
              max="10000"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button className="ms-2" variant="primary" onClick={handleSubmit}>
              Add Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
