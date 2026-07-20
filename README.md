# TaskFMaster - Task Management Web Application

TaskFlow is a basic web application designed to help users create, view, organize, and manage their daily tasks efficiently. The project is split into a **Node.js/Express backend** connected to a MongoDB database, and a responsive **React/Vite frontend** styled with Tailwind CSS v4.

---

## Features

- **Create Tasks**: Add tasks with a title, description, priority (Low, Medium, High), and due date.
- **View Tasks**: Display all tasks in a structured data table format.
- **Form Validation**: Strict client-side validation rules for all required fields, including preventing selection of past due dates, with real-time error indicators and autofocus highlights.
- **Interactive Metrics**: Global real-time dashboard tracking the count of *Total Tasks*, *Pending*, *In Progress*, and *Completed* tasks.
- **Status Toggling**: Toggle task status directly via table row checkboxes or move tasks between states (*Pending*, *In Progress*, *Completed*) using quick selectors.
- **Search & Filters**: Filter tasks dynamically by status and priority, alongside instantaneous text searches matching title and description.
- **Pagination**: Client-side data paging displaying 6 tasks per page.
- **Delete Confirmation Dialog**: Custom modal confirming deletion of tasks securely.
- **Success & Error Feedback**: Clean success toast alert banners for updates, creation, and deletions.

---

## Tech Stack

- **Frontend**: React (19), Vite (8), Tailwind CSS (v4), Axios, React Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Dotenv, CORS, Nodemon.

---

## Folder Structure

```
TaskManagement/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB database connection
│   ├── controllers/
│   │   └── taskController.js # CRUD handlers and query parameters logic
│   ├── models/
│   │   └── Task.js          # Mongoose Schema definition for Task
│   ├── routes/
│   │   └── taskRoutes.js    # API routing pathways
│   ├── .env                 # Environment variables (port, db connection string)
│   ├── server.js            # Express application setup and server entry point
│   └── package.json         # Backend dependancies
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (Navbar/Sidebar, Form, Card, List, Filters)
│   │   ├── pages/           # Pages container (Home dashboard)
│   │   ├── services/        # Axios API callers (taskService.js)
│   │   ├── App.jsx          # Component integration
│   │   ├── index.css        # Base styles and animations
│   │   └── main.jsx         # React application entry point
│   ├── vite.config.js       # Vite configuration (registers Tailwind compiler)
│   └── package.json         # Frontend dependencies
│
└── README.md                # Project documentation & setup instructions
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (either running locally or a remote MongoDB Atlas database cluster)

---

### Backend Installation & Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the backend dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables. Create a `.env` file inside the `backend` folder and add your configuration details:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager
   # Alternatively, use your MongoDB Atlas connection string:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
   ```

4. Start the backend server in development mode using Nodemon:
   ```bash
   npm run dev
   ```
   *The console should output: `Server running on port 5000` and `MongoDB Connected: <host>`.*

---

### Frontend Installation & Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
   *By default, the frontend app will run on: `http://localhost:5173`.*

4. Open `http://localhost:5173` in your web browser to start using TaskFlow.

---

## API Reference

All requests must be made to the following base URL:
```
http://localhost:5000/api/tasks
```

### Endpoints

| Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/` | Create a new task | `{ title, description, priority, dueDate, status }` |
| **GET** | `/` | Retrieve all tasks | *(Optional status/priority queries: `?status=Pending`)* |
| **GET** | `/:id` | Fetch details of a single task | None |
| **PUT** | `/:id` | Update details of an existing task | `{ title, description, priority, dueDate, status }` |
| **DELETE** | `/:id` | Delete a task from the database | None |
