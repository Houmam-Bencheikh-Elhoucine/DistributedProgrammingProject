const mongoose = require("mongoose")
require('dotenv').config();
const express = require('express');
const Rental = require('./models/Rent');
const Car = require('./models/Car');
const Client = require('./models/Client');  // Import the Client model
const cors = require('cors');

const router = express.Router();

const app = express()
// Middleware
// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true }
).then(() => console.log('Connected to MongoDB')
).catch(err => console.log('MongoDB connection error:', err))

// Create a new rental (checks if client exists or create a new one)
app.post('/rentals/', async (req, res) => {
  const { fname, lname, bdate, national_id, telephone, id_car, sdate, edate } = req.body;
  console.log({ fname, lname, bdate, national_id, telephone, id_car, sdate, edate })
  try {
    // Check if the car exists and is available
    const car = await Car.findById(id_car);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (car.status === "rented") {
      return res.status(400).json({ message: 'Car is not available' });
    }

    // Check if the client already exists
    let client = await Client.findOne({ national_id: national_id});

    // If client does not exist, create a new one
    if (!client) {
      client = new Client({
        lname:lname, 
        fname: fname, 
        bdate: bdate, 
        telephone: telephone, 
        national_id: national_id
      });
      await client.save();  // Save the new client to the database
      // Check if the client already exists
      client = await Client.findOne({ national_id: national_id });
    }
    console.log(client)
    // Create the rental record
    const rental = new Rental({
      id_car: id_car, 
      id_client: client._id,
      sdate: sdate, 
      edate: edate
    });

    // Update car availability
    car.status = "Rented";
    await car.save();

    // Save rental
    await rental.save();

    res.status(201).json({ message: 'Rental created successfully', rental });
  } catch (err) {
    res.status(500).json({ message: 'Error creating rental', error: err });
  }
});

// Return a car (mark as available again)
app.put('/return/:id_car', async (req, res) => {
  const { id_car } = req.params;

  try {
    const car = await Car.findById(id_car);
    if (!car) {
      return res.status(404).json({ message: 'car not found' });
    }

    // Update car availability
    car.status = "Available";
    await car.save();

    res.status(200).json({ message: 'Car returned successfully', car });
  } catch (err) {
    res.status(500).json({ message: 'Error returning car', error: err });
  }
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
