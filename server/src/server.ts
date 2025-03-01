import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './config/connection.js';
import routes from './routes/index.js';

dotenv.config(); // ✅ Load environment variables

// ✅ Fix: Get __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an instance of the Express application
const app = express();

// Set the port number from environment variables or default to 3001
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false; 

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, '../../client/dist')));

// ✅ Use API routes
app.use(routes);

// ✅ Serve React frontend for unknown routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// ✅ Sync database and start server
sequelize.sync({ force: forceDatabaseRefresh })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });
