
---

# Student Management System API

This is a Student Management System API built using **Node.js**, **Express**, **MongoDB Atlas**, and **TypeScript**. The system provides features for both the admin panel and student interface, allowing tasks to be assigned, updated, and managed efficiently.

## Features

### Admin Panel
- Admin can log in using predefined credentials.
- Admin can add students with their name, email ID, department, and password.
- Admin can assign tasks to students with a due date and status.
  
### Student Interface
- Students can log in using their email ID and password.
- Students can view the tasks assigned to them.
- Students can see the status of each task (pending, overdue, completed).
- Students can update the status of the task to "completed."

### Additional Features
- **Automatic Task Status Update**: A cron job runs every midnight to update the status of overdue tasks.
- **Predefined Admin Credentials**: Admin credentials are seeded into the database using a seeder script.
- **No Session or Cookies**: Authentication uses **JWT (JSON Web Tokens)** for stateless authorization.

## Prerequisites

- Node.js
- TypeScript
- MongoDB Atlas Account

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/student-management-api.git
cd student-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following values:

```env
PORT=3000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application

```bash
npm run dev
```

This will start the server on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/login`  
  - **Request Body**:
    ```json
    {
      "email": "admin@admin.com",
      "password": "admin"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "token": "your_jwt_token"
    }
    ```

### Admin Endpoints

- **GET** `/api/v1/student` (Admin only)  
  - **Description**: Get all students
  - **Response**:
    ```json
    [
      {
        "_id": "student_id",
        "name": "John Doe",
        "email": "john@example.com",
        "department": "Computer Science"
      }
    ]
    ```

- **GET** `/api/v1/student/:id` (Admin only)  
  - **Description**: Get student details by ID
  - **Response**:
    ```json
    {
      "_id": "student_id",
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Computer Science"
    }
    ```

- **POST** `/api/v1/student` (Admin only)  
  - **Description**: Add a new student
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Computer Science",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Student added successfully"
    }
    ```

- **PUT** `/api/v1/student/:id` (Admin only)  
  - **Description**: Update student information (name, department, etc.)

### Task Endpoints

- **GET** `/api/v1/task` (Admin only)  
  - **Description**: Get all tasks
  - **Response**:
    ```json
    [
      {
        "_id": "task_id",
        "title": "Task 1",
        "description": "This is a task description",
        "assignedTo": "student_id",
        "dueDate": "2025-01-25",
        "status": "pending"
      }
    ]
    ```

- **POST** `/api/v1/task` (Admin only)  
  - **Description**: Assign a task to a student
  - **Request Body**:
    ```json
    {
      "title": "Task 1",
      "description": "This is a task description",
      "user_id": "student_id",
      "dueDate": "2025-01-25"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Task added successfully"
    }
    ```

- **GET** `/api/v1/task/mine` (Student only)  
  - **Description**: Get all tasks assigned to the logged-in student
  - **Response**:
    ```json
    [
      {
        "_id": "task_id",
        "title": "Task 1",
        "description": "This is a task description",
        "dueDate": "2025-01-25",
        "status": "pending"
      }
    ]
    ```

- **PUT** `/api/v1/task/mine` (Student only)  
  - **Description**: Update task status to "completed" by student
  - **Request Body**:
    ```json
    {
      "task_id": "task_id"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "success",
      "message": "Task status updated to completed"
    }
    ```

### Cron Job

- **Task Overdue Update**: Every midnight, a cron job checks for overdue tasks and updates their status to "overdue" if the current date is greater than the task's due date.

---

## Example API Request (Postman)

- **Login (Admin)**  
  URL: `POST http://localhost:3000/api/v1/auth/login`  
  Body (JSON):
  ```json
  {
    "email": "admin@admin.com",
    "password": "admin"
  }
  ```

- **Add Student (Admin)**  
  URL: `POST http://localhost:3000/api/v1/student`  
  Body (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Computer Science",
    "password": "password123"
  }
  ```

- **Get Tasks for Student (Student)**  
  URL: `GET http://localhost:3000/api/v1/task/mine`  
  Headers:  
  - `Authorization: Bearer <JWT_TOKEN>`

---

## Environment Variables

Add the following variables to your `.env` file:

```env
PORT=3000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## Git Ignore

Create a `.gitignore` file to ignore the following files:

```bash
/node_modules/
/dist/
/.env
```

---

## API Documentation on Postman

Once the application is up and running, you can access the full API documentation on Postman by importing the following URL:

[Postman API Documentation](https://interstellar-meteor-453510.postman.co/workspace/Cashe~4ccaa256-11e1-4a95-bac1-520dbd574f3e/collection/15968603-cfb288dc-01d9-4715-b504-9008c9a71cce?action=share&creator=15968603&active-environment=15968603-31f4fb86-5cbb-456c-84f9-5d9b6a9b40de)

---

## Conclusion

This API provides a simple but effective system for managing students, their tasks, and their status updates. Admin users have full control over student records and task assignments, while students can track and complete tasks assigned to them.

---
