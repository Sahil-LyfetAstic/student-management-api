import mongoose from 'mongoose';
import { ITask } from '../types';

const taskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
    set: (value: string) => {
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'overdue'],
    default: 'pending',
  },
});

export default mongoose.model<ITask>('Task', taskSchema);
