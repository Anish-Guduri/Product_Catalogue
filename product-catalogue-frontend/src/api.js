

const API_URL = 'http://my-product-catalogue-app2.azurewebsites.net/api/products';

export const addProduct = async (form) => {
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('type', form.type);
  formData.append('color', form.color);
  formData.append('size', form.size);
  formData.append('price', form.price);
  if (form.image) {
    formData.append('image', form.image);
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
};
