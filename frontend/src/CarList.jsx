import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarList.css'; 

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await fetch('http://rental.local/admin/cars');
      const carData = await response.json();
      setCars(carData);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  

  useEffect(() => {
    fetchCars(); 
  }, []);
  const handleRent = (car) => {
    navigate(`/rent/${car._id}`, { state: car }
    );
  }
  const handleReturn = async (car)=>{
    try {
      const response = await fetch(`http://rental.local/user/return/${car._id}`, {
        method: 'PUT',
      });
      
      const result = await response.json();
      if (response.ok) {
        alert('Returned successfully');
        await fetchCars()
      } else {
        alert("Error")
        console.log('Error:', result);
      }
    } catch (error) {
      alert(error)
      console.warn('Error during submission:', error);
    }
  }
  return (
    <div className="car-list-container">
      <h1>Available Cars</h1>
      <div className="car-cards-container">
        {cars.map((car) => (
          <div key={car._id} className={`car-card ${car.status.toLowerCase()}`}>
            <div className="car-image-container">
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="car-image" />
              <div className={`car-status-overlay ${car.status.toLowerCase()}`}>
                <span>{car.status}</span>
              </div>
            </div>
            <div className="car-info">
              <div className="left-info">
                <h3>{car.make} {car.model}</h3>
                <p className="price">${car.price}</p>
              </div>
              <div className="right-info">
                <div className="car-buttons">
                  {(car.status === "Available" && <button onClick={() => handleRent(car)} className="update-button">Rent</button>)}
                  {(car.status === "Rented" && <button onClick={() => handleReturn(car)} className="update-button">Return</button>)}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;

