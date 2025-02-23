import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';

dotenv.config();

// Create an instance of the Express application
const app = express();

// Set the port number from environment variables or default to 3001
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Resolve the __dirname variable for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Use routes
app.use(routes);

// Serve the main HTML file for the root URL
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Ensure database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to the database successfully.');
    return sequelize.sync({ force: forceDatabaseRefresh });
  })
  .then(() => {
    console.log('🚀 Database synced!');
    // Start the server after database sync
    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });
