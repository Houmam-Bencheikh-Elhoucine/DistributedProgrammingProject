
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './CarList';
import UpdateCar from './UpdateCar';
import CarRegistrationForm from './CarRegistrationForm.jsx'
import Navbar from './Navbar';
import RentalRegistrationForm from './RentalRegistrationForm.jsx';
import CarListAdmin from './CarListAdmin.jsx';


function App() {
  return (
    <Router>
       <Navbar />
        <div className="content">
          <Routes>
              <Route path="/" element={<CarList />} />
              <Route path="/admn" element={<CarListAdmin />} />
              <Route path="/update/:model" element={<UpdateCar />} />
              <Route path="/newcar" element={<CarRegistrationForm />} />
              <Route path="/rent/:model" element={<RentalRegistrationForm />} />
          </Routes>
        </div>
    
    </Router>
  );
}

export default App;
