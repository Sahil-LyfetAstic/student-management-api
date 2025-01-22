import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import studentRoutes from './routes/student';
import taskRoutes from './routes/task';
import seedAdmin from './seeder/AdminSeeder';
import './utils/overdueTaskCron';

dotenv.config();

const app = express();
app.use(express.json());


// Connect to MongoDB
connectDB().then(() => {
     seedAdmin();
  });

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', studentRoutes);
app.use('/api/v1', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});