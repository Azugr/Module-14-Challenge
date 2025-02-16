import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './config/connection.js';
import routes from './routes/index.js';
import userRoutes from './routes/api/userRoutes.js'; 
import authRoutes from './routes/api/authRoutes.js'; 
import ticketRoutes from './routes/api/ticketRoutes.js'; 
import seedRoutes from './routes/api/seedRoutes.js'; 

dotenv.config(); 

// Create an instance of the Express application
const app = express();

// Set the port number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors({
  origin: 'https://kanban_db.onrender.com', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resolve the __dirname variable for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Use the consolidated routes
app.use('/api', routes); 

// Use the user routes
app.use('/api/user', userRoutes);

// Use the auth routes
app.use('/api/auth', authRoutes); // Add the auth routes

// Use the seed routes
app.use('/api/seed', seedRoutes); // Add the seed routes

// Serve the main HTML file for the root URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Ensure database connection and sync models
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to the database successfully.');
        return sequelize.sync();
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
