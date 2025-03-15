// This Azure Function handles HTTP POST requests to add a new product.
module.exports = async function (context, req) {
    // Log the incoming request for debugging
    context.log("HTTP trigger function processed a request.");
  
    // Only allow POST requests
    if (req.method !== "POST") {
      context.res = {
        status: 405,
        body: { error: "Method Not Allowed. Use POST." },
      };
      return;
    }
  
    // Retrieve product data from the request body
    const newProduct = req.body;
  
    // Validate input (basic example)
    if (!newProduct || !newProduct.name || !newProduct.price) {
      context.res = {
        status: 400,
        body: { error: "Product data is missing required fields." },
      };
      return;
    }
  
    // (Optional) Save product to your database or storage here.
    // For demonstration, we simulate saving by generating an ID and using a default image.
    const savedProduct = {
      id: Date.now(), // Simulated unique ID
      name: newProduct.name,
      price: newProduct.price,
      type: newProduct.type || "General",
      image: newProduct.image || "https://via.placeholder.com/150", // Default image if none provided
    };
  
    // Respond with the saved product data
    context.res = {
      status: 201,
      headers: { "Content-Type": "application/json" },
      body: savedProduct,
    };
  };
  