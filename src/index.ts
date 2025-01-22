import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import studentRoutes from './routes/student';
import seedAdmin from './seeder/AdminSeeder';

dotenv.config();

const app = express();
app.use(express.json());


// Connect to MongoDB
connectDB().then(() => {
     seedAdmin();
  });



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});