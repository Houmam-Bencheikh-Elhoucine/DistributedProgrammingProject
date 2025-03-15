import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarList.css'; 
import { Link } from 'react-router-dom';
const CarListAdmin = () => {
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

  const handleUpdate = (car) => {
    navigate(`/update/${car.model}`, { state: car });
  };

  const handleDelete = async (car) => {
    if (window.confirm(`Are you sure you want to delete the ${car.make} ${car.model}?`)) {
      try {
        const response = await fetch(`http://rental.local/admin/cars/${car._id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setCars(cars.filter((c) => c._id !== car._id));
          alert("Car deleted successfully");
        } else {
          const result = await response.json();
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Failed to delete the car");
      }
    }
  };
  

  useEffect(() => {
    fetchCars(); 
  }, []);
  return (
    
    <div className="car-list-container">
    <button onClick={() => handleReturn(car)} className="update-button"> <Link to="/newcar" className="nav-link">Register New Car</Link></button>
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
                  <button onClick={() => handleUpdate(car)} className="update-button">Update</button>
                  <button onClick={() => handleDelete(car)} className="delete-button">Delete</button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListAdmin;

