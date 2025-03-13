

import React from 'react';
import { Card } from 'react-bootstrap';

export default function ProductCard({ product }) {
  return (
    <Card className="h-100">
      {product.image_url && (
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={product.image_url}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>Size:</strong> {product.size}"
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₹{product.price}
        </Card.Text>
        <Card.Text className="d-flex align-items-center">
          <strong>Color:</strong> {product.color}
          <span
            style={{
              backgroundColor: product.color,
              width: '20px',
              height: '20px',
              display: 'inline-block',
              marginLeft: '10px',
              border: '1px solid #ccc'
            }}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

