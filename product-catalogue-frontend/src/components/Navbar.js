import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap';

export default function NavBar({ onAddItem, onFilter }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Navbar.Brand>My Clothing Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {['All', 'Shirt', 'Pant', 'T-Shirt'].map(category => (
            <Nav.Link key={category} onClick={() => onFilter(category)}>
              {category}
            </Nav.Link>
          ))}
        </Nav>
        <Button variant="primary" onClick={onAddItem}>Add Item</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
