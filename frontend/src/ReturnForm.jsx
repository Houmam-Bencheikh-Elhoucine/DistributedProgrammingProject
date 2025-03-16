import React, { useState } from 'react';
import './CarRegistrationForm.css';

function RentalRegistrationForm() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    fuelType: '',
    transmission: '',
    seats: '',
    doors: '',
    price: '',
    status: '',
    image: null,  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newFormData = new FormData();
  
    newFormData.append('make', formData.make);
    newFormData.append('model', formData.model);
    newFormData.append('year', formData.year);
    newFormData.append('color', formData.color);
    newFormData.append('fuelType', formData.fuelType);
    newFormData.append('transmission', formData.transmission);
    newFormData.append('seats', formData.seats);
    newFormData.append('doors', formData.doors);
    newFormData.append('price', formData.price);
    newFormData.append('status', formData.status);
  
    if (formData.image) {
      newFormData.append('image', formData.image);
    }
  
    try {
      const response = await fetch('http://rental.local/admin/cars', {
        method: 'POST',
        body: newFormData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Car registred successfully');
        console.log('Car registered:', result);
      } else {
        console.log('Error:', result.error);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  

  return (
    <div className="form-container">
      <h1>Rent a car</h1>
      <form onSubmit={handleSubmit} className="car-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Birth date:</label>
          <input
            type="date"
            name="bdate"
            value={formData.bdate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>


        <button type="submit" className="submit-btn">Register Car</button>
      </form>
    </div>
  );
}

export default RentalRegistrationForm;
