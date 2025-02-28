import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';

dotenv.config();

// Create an Express server
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Set up __dirname for relative pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for JSON and form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the client's static files
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Use the API routes
app.use(routes);

// Catch-all route to serve the client's index.html file
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Sync the database and start the server
sequelize.sync({ force: forceDatabaseRefresh })
  .then(async () => {
    // Start the server after database sync and seeding
    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });