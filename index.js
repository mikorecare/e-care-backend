const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors()); // Allow all origins

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
const corsOptions = {
  origin: ['http://192.168.1.132:64535', 'http://localhost:54122', 'capacitor://localhost'], // Replace with your client origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  });


// // Passport and session setup for Google OAuth
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport'); // Google OAuth configuration

// Import routes
const userRoutes = require('./routes/user'); // User routes (for role-based CRUD)
const departmentRoutes = require('./routes/department'); // Department routes
const doctorRoutes = require('./routes/doctor'); // Doctor routes
const appointmentRoutes = require('./routes/appointment'); // Appointments routes
const feedbackRoutes = require('./routes/feedback'); // Feedbacks routes

// Define API routes
app.use('/api/users', userRoutes); // User CRUD
app.use('/api/departments', departmentRoutes); // Departments CRUD
app.use('/api/doctors', doctorRoutes); // Doctors CRUD
app.use('/api/appointments', appointmentRoutes); // Appointments CRUD
app.use('/api/feedbacks', feedbackRoutes); // Feedbacks CRUD

// Root route
app.get('/', (req, res) => {
  res.send('RESTful API Connected');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


