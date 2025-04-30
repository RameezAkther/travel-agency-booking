import React, { useState } from 'react';

const AddPackages = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    priceINR: '',
    priceUSD: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddPackage = (e) => {
    e.preventDefault();

    const { name, location, description, image, priceINR, priceUSD } = formData;

    if (!name || !location || !description || !image || !priceINR || !priceUSD) {
      setMessage('All fields are required.');
      return;
    }

    const storedPackages = JSON.parse(localStorage.getItem('packages')) || [];

    const newPackage = {
      id: storedPackages.length ? storedPackages[storedPackages.length - 1].id + 1 : 1,
      name,
      location,
      description,
      image,
      priceINR: parseFloat(priceINR),
      priceUSD: parseFloat(priceUSD),
    };

    const updatedPackages = [...storedPackages, newPackage];
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    setMessage('Package added successfully.');

    setFormData({
      name: '',
      location: '',
      description: '',
      image: '',
      priceINR: '',
      priceUSD: ''
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add New Travel Package</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleAddPackage}>
        <div className="mb-3">
          <label className="form-label">Package Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (INR)</label>
          <input type="number" className="form-control" name="priceINR" value={formData.priceINR} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (USD)</label>
          <input type="number" className="form-control" name="priceUSD" value={formData.priceUSD} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackages;
