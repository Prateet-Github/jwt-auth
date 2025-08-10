const express = require('express'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db'); 
const cors = require('cors');  
const authRoutes = require('./routes/auth');  

dotenv.config(); 
connectDB();  

const app = express();   

// More explicit CORS configuration to handle preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5176');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Backup CORS middleware
app.use(cors({   
  origin: 'http://localhost:5176',  // Match your React dev server URL exactly    
  credentials: true
}));  

// app.options('*', cors()); // Preflight handler - REMOVED: This was causing path-to-regexp error

app.use(express.json());  

app.get('/', (req, res) => {   
  res.send('API is running...'); 
});

// Test route to verify CORS is working
app.get('/test', (req, res) => {
  res.json({ message: 'CORS test successful' });
});   

app.use('/api/auth', authRoutes);  

const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001 
app.listen(PORT, () => {   
  console.log(`Server is running on port ${PORT}`); 
});  

module.exports = app;