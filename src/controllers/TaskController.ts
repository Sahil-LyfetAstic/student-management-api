import { Request, Response } from 'express';
import Task from '../models/Task';
import { ITask } from '../types';
import exp from 'constants';

export interface CustomRequest extends Request {

  user?: any;

}

export const getTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasks: ITask[] = await Task.find();
    return res.status(200).json({ tasks });
  } catch (error: any) {
    console.error('Get tasks error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const addTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, user_id, dueDate } = req.body;
    const existingTask = await Task.findOne({ user_id, title });

    if (existingTask) {
      return res.status(400).json({ message: 'Task already exists' });
    }

    const newTask = new Task({
      title,
      description,
      user_id,
      dueDate,
      status: 'pending',
    });

    await newTask.save();
    return res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error: any) {
    console.error('Add task error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Task already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getMyTasks = async (req: CustomRequest, res: Response): Promise<any> => {
  const user_id = req.user.id;
  try {

    const tasks: ITask[] = await Task.find({ user_id });
    return res.status(200).json({ tasks });
  } catch (error: any) {
    console.error('Get tasks error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


export const updateTaskStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const taskId = req.query.id;
    const { status } = req.body;
    console.log('status', status);
    console.log('taskId', taskId);
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();
    return res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error: any) {
    console.error('Update task error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
