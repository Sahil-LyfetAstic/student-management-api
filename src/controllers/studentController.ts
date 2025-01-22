import { Request, Response } from 'express';
import User from '../models/User';
import { IStudent } from '../types';


export const getStudents = async (req: Request, res: Response): Promise<any> => {
    try {
        const students: IStudent[] = await User.find({ role: 'student' });
        return res.status(200).json({ students });
    } catch (error) {
        console.error('Get students error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const addStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, department, password } = req.body;
        const newStudent = new User({
            name,
            email,
            department,
            password,
            role: 'student',
        });

        await newStudent.save();
        return res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error: any) {
        console.error('Add student error:', error);
        // Handle duplicate key error
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({
                message: 'Email already exists. Please use a different email.',
            });
        }
        // Handle other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getStudentById = async (req: Request, res: Response): Promise<any> => {
    console.log('Get student by id request:', req.params.id);
    try {
        const student: IStudent | null = await User.findOne({ _id: req.params.id, role: 'student' });
        console.log('Get student by id:', student);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json({ student });
    } catch (error) {
        console.error('Get student by id error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}