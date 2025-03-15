import React, { useState } from 'react';
import './Form.css';
import { useLocation, useNavigate } from 'react-router-dom';

function RentalRegistrationForm() {

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state)
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    bdate: Date.now,
    telephone: "",
    national_id: "",
    id_car: location.state._id || "",
    sdate: Date.now,
    edate: Date.now
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
  
    // Create a new FormData object (renamed to avoid conflict)
    const newFormData = new FormData();
  
    // Append car details to FormData
    newFormData.append('fname', formData.fname)
    newFormData.append('lname', formData.lname)
    newFormData.append('bdate', formData.bdate)
    newFormData.append('id_car', formData.id_car)
    newFormData.append("sdate", formData.sdate)
    newFormData.append("edate", formData.edate)
    newFormData.append("national_id", formData.national_id)
    console.log(newFormData)
    // Send the FormData to the backend (POST request)
    try {
      const response = await fetch(`http://localhost:3000/rentals/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Rented successfully');
        console.log('Rent registered:', result);
        // You can reset the form or show a success message here
      } else {
        alert(result)
        console.log('Error:', result);
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
          <label>National Identification Number:</label>
          <input
            type="text"
            name="national_id"
            value={formData.national_id}
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
        
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="sdate"
            value={formData.sdate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Return Date:</label>
          <input
            type="date"
            name="edate"
            value={formData.edate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">Save new rent</button>
      </form>
    </div>
  );
}

export default RentalRegistrationForm;
