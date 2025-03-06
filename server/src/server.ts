const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; 
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Use cors middleware
app.use(cors({
  origin: 'https://module-14-challenge-sb45.onrender.com', 
  credentials: true, 
}));

// Serve static files from the client's dist folder
app.use(express.static('../client/dist'));

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});