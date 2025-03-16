// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// require('dotenv').config();

// const { sql, sqlConfig } = require('./dbConfig');
// const { uploadToBlob } = require('./blobHelper');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ Serve static files from React's build folder
// app.use(express.static(path.join(__dirname, 'frontend/build')));

// // ✅ API routes
// app.get('/api/products', async (req, res) => {
//   try {
//     await sql.connect(sqlConfig);
//     const result = await sql.query`
//       SELECT name, type, color, size, price, image_url FROM Products
//     `;
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Database error:', error);
//     res.status(500).send('Database error');
//   }
// });

// // ✅ POST route for adding products
// app.post('/api/products', upload.single('image'), async (req, res) => {
//   try {
//     const { name, type, color, size, price } = req.body;
//     let imageUrl = null;

//     if (req.file) {
//       const fileExt = path.extname(req.file.originalname);
//       const blobFileName = `${Date.now()}-${name}${fileExt}`;
//       imageUrl = await uploadToBlob(req.file.buffer, blobFileName, req.file.mimetype);
//     }

//     await sql.connect(sqlConfig);
//     const result = await sql.query`
//       INSERT INTO Products (name, type, color, size, price, image_url)
//       OUTPUT INSERTED.*
//       VALUES (${name}, ${type}, ${color}, ${size}, ${price}, ${imageUrl})
//     `;
//     res.json(result.recordset[0]);
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).send('Error adding product');
//   }
// });

// // ✅ Catch-all route for React app (ensures React handles frontend routing)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




































// // server.js

// // const express = require('express');
// // const path = require('path');
// // // ...other requires

// // const app = express();

// // // Serve the React app's static files
// // app.use(express.static(path.join(__dirname, '../frontend/build')));

// // // Place your API routes above the catch-all route
// // // For example, your /api/products route goes here

// // // The catch-all route: for any request that doesn't match an API route, serve the index.html
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


 /*          WORKING CODE        */
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { sql, sqlConfig } = require('./dbConfig');
const { uploadToBlob } = require('./blobHelper');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://delightful-ocean-077cef000.6.azurestaticapps.net"
}));


const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/products 
app.get('/api/products', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`
      SELECT name, type, color, size, price, image_url FROM Products
    `;
    res.json(result.recordset);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Database error');
  }
});

// POST /api/products - Add a new product with optional image upload
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    
    const { name, type, color, size, price } = req.body;
    let imageUrl = null;

   
    if (req.file) {
      const fileExt = path.extname(req.file.originalname);
      const blobFileName = `${Date.now()}-${name}${fileExt}`;
      imageUrl = await uploadToBlob(req.file.buffer, blobFileName, req.file.mimetype);
    }

    await sql.connect(sqlConfig);
   
    const result = await sql.query`
      INSERT INTO Products (name, type, color, size, price, image_url)
      OUTPUT INSERTED.*
      VALUES (${name}, ${type}, ${color}, ${size}, ${price}, ${imageUrl})
    `;
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


