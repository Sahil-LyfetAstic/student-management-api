export interface IUser {
  email: string;
  password: string;
  name?: string;
  department?: string;
  role: 'admin' | 'student';
}

export interface ITask {
  title: string;
  description: string;
  assignedTo: string; // student email
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
}
