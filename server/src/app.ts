import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import countryRoutes from './routes/countryRoutes';
import connect from './lib/db/mongodb';
import path from 'path';
import cors from 'cors'; 

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../src/config/.env') });

// Initialize the Express app
const app = express();
// Middleware for CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin (Frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);
const startServer = async () => {
  try {
    await connect();
    
    // Middleware for parsing JSON bodies
    app.use(express.json());

    // Use country routes
    app.use('/api', countryRoutes);

    // Default route
    // app.get('/', (req: Request, res: Response) => {
    //   res.send('Hello, World!');
    // });

    // Global error handling middleware
    // app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //   console.error(err.stack);
    //   res.status(500).send('Something broke!');
    // });

    // Set up server port
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
