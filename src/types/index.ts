export interface IUser  {
  _id: string;
  email: string;
  password: string;
  name?: string;
  department?: string;
  role: 'admin' | 'student';
  comparePassword(password: string): Promise<boolean>;
}

export interface IStudent {
  email: string;
  password: string;
  name: string;
  department: string;
  role: 'student' | 'admin';
}

export interface ITask {
  title: string;
  description: string;
  user_id: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
}
