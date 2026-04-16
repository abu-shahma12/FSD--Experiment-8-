import React, { useState } from 'react';
import api from '../api';

function ProductForm() {
  const [form, setForm] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await api.post('/api/products', {
        name: form.name,
        price: Number(form.price)
      });
      if (response.status === 201) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setIsError(true);
      if (error.response?.status === 401) {
        setMessage('Unauthorized. Redirecting to login...');
      } else if (error.response?.status === 400) {
        setMessage('Validation failed while creating product');
      } else {
        setMessage('Product creation failed');
      }
    }
  };

  return (
    <div className="card">
      <h2>Create Product (Protected API)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <br /><br />
        <button className="submit-btn" type="submit">Create Product</button>
      </form>
      {message && (
        <p className={isError ? 'message-error' : 'message-success'}>{message}</p>
      )}
    </div>
  );
}

export default ProductForm;
