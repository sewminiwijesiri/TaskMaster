# TaskMaster - Task Management Web Application

TaskMaster is a modern, responsive, and user-friendly Task Management Web Application that allows users to seamlessly plan, prioritize, track, and complete daily tasks.

The project is built on the **MERN** stack (MongoDB, Express, React, Node.js) using **Tailwind CSS v4** and **Vite** for the client-side experience.

---

## Features

- **Full CRUD Support**: Add, view, edit, and delete tasks.
- **Client-Side Validation**: Strict validation rules for inputs (Title, Description, Priority, and Due Date) with instant visual warning clearing.
- **Autofocus Ref Feedback**: Invalided form submissions automatically lock operations and highlight the first incorrect field.
- **Overall Statistics Dashboard**: Quick dashboard tracking counts for Total, Pending, In Progress, and Completed tasks globally.
- **Instant Client-Side Filtering**: Dynamic filtering by Priority, Status, and search terms locally for lightning-fast updates.
- **Modern UI/UX**: Custom delete confirmation modals, custom scrollbars, clean table structures, and subtle animations.
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens.

---

## Directory Structure

```text
TaskMaster
├── backend
│   ├── config          # MongoDB Connection config
│   ├── controllers     # Task CRUD endpoint logic
│   ├── models          # Mongoose Task Schema model
│   ├── routes          # Task Express Router routes
│   ├── .env            # Environment configuration
│   └── server.js       # Express server entry point
│
└── frontend
    ├── src
    │   ├── components  # Navbar/Sidebar, FilterBar, TaskList, TaskCard, TaskForm
    │   ├── pages       # Home dashboard container page
    │   └── services    # Axios API communication configuration
    │   ├── App.jsx     # Main React entry shell
    │   └── main.jsx    # React bootstrapping entry point
    │
    ├── index.html      # Vite client page entry
    └── vite.config.js  # Vite configurations
```

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **MongoDB** (Local instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas account)

---

### 1. Backend Setup

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the backend dependencies:
   ```bash
   npm install
   ```

3. Create and configure the environment variables file (`.env`):
   Create a file named `.env` in the `backend` folder and insert:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_uri
   ```
   *Note: If using **MongoDB Atlas**, ensure that your network IP address is added to the IP whitelist in the Atlas Console (Network Access -> Whitelist) to avoid connection timeout crashes.*

4. Run the backend server in development mode:
   ```bash
   npm run dev
   ```
   The backend API will start running at `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a new terminal tab and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the client-side dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure custom API urls:
   By default, the React frontend is configured to target `http://localhost:5000/api/tasks`. If your backend runs on a different host/port, create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://your_custom_api_address/api/tasks
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The dev server will spin up, typically at `http://localhost:5173`. Open this URL in your web browser.

5. Build the assets for production deployment:
   ```bash
   npm run build
   ```

---

## API Endpoints Reference

The backend exposes the following endpoints under `/api/tasks`:

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **POST** | `/` | Create a new task | `{ "title": "Buy groceries", "description": "Milk, eggs, fruit", "priority": "Medium", "dueDate": "2026-07-20" }` |
| **GET** | `/` | Retrieve all tasks | *(Optional status/priority query filters can be appended)* |
| **GET** | `/:id` | Fetch task by database ID | *None* |
| **PUT** | `/:id` | Update task details / status | `{ "status": "In Progress" }` |
| **DELETE** | `/:id` | Delete a task | *None* |