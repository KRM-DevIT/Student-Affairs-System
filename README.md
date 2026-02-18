# 📚 Student Affairs System

A comprehensive vanilla JavaScript project demonstrating CRUD operations and Object-Oriented Programming (OOP) principles. This system manages multiple entities (Students, Courses, Instructors, Employees) using a clean, scalable MVC architecture.

## 🎯 Project Overview

The Student Affairs System is an educational project designed to showcase best practices in vanilla JavaScript development. It implements a modular, reusable architecture that makes it easy to extend functionality by adding new entities without modifying existing code.

**Perfect for:** Learning CRUD operations, OOP principles, MVC pattern, and RESTful API integration with vanilla JavaScript.

---

## ✨ Key Features

- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete functionality for multiple entities
- ✅ **Object-Oriented Architecture** - Classes-based models with clean separation of concerns
- ✅ **Reusable Components** - Add new entities by simply changing entity names and table headers
- ✅ **MVC Pattern** - Models, Views, Controllers, and Services for maintainable code
- ✅ **Pagination & Search** - Built-in pagination and advanced search/sort capabilities
- ✅ **Mock Database** - JSON Server integration for realistic API simulation

---

## 🏗️ Architecture Overview

This project follows a **MVC-inspired architecture** adapted for Vanilla JavaScript using ES6 Modules.

Although it does not use a framework, the application enforces clear separation of concerns to keep the codebase clean, scalable, and maintainable.

```
├── /students-affairs-system
├── │
├── ├── /css
├── │   └── style.css            # Styles for Grid (Table), pagination, and forms [cite: 13, 119]
├── │
├── ├── /src
├── │   ├── /models              # OOP Classes defining the data structure 
├── │   │   ├── Student.js
├── │   │   ├── Course.js
├── │   │   ├── Instructor.js
├── │   │   └── Employee.js
├── │   │
├── │   ├── /services            # Logic for API calls, search, sort, and pagination [cite: 110]
├── │   │   ├── ApiService.js    # Base class for Fetch API logic [cite: 12, 110]
├── │   │   ├── StudentService.js
├── │   │   ├── CourseService.js
├── │   │   ├── InstructorService.js
├── │   │   └── EmployeeService.js
├── │   │
├── │   ├── /views               # DOM manipulation and rendering logic [cite: 106]
├── │   │   ├── StudentView.js
├── │   │   ├── CourseView.js
├── │   │   ├── InstructorView.js
├── │   │   └── EmployeeView.js
├── |   |
├── │   ├── /controllers         # Bridges views and services [cite: 111, 120]
├── │   │   ├── StudentController.js
├── │   │   ├── CourseController.js
├── │   │   ├── InstructorController.js
├── │   │   └── EmployeeController.js
├── │   │
├── │   └── main.js              # Entry point to initialize the application [cite: 111]
├── │
├── ├── db.json                  # Mock database for json-server [cite: 11, 123]
├── ├── index.html               # Main layout and navigation [cite: 119]
├── └── package.json             # Scripts to run json-server [cite: 11]
```

## 🔄 Application Flow

1. User interacts with the UI (View)
2. Controller captures the event
3. Controller calls the appropriate Service method
4. Service communicates with the API (`json-server`)
5. Data is returned to the Controller
6. View is updated with the new data

---

## 🧪 Backend (Mock API)

- The project uses **json-server** as a mock REST API.
- Data is stored in `db.json`.
- Each entity is exposed as a RESTful endpoint.

Example endpoints:
- `/students`
- `/courses`
- `/instructors`
- `/employees`

---

## ▶️ How to Run the Project

Follow the steps below to run the project locally.

### 1️⃣ Prerequisites
Make sure you have the following installed:
- **Node.js** (includes npm)

You can verify installation by running:

node -v
npm -v


2️⃣ Install Project Dependencies

From the project root directory, run:

npm install


3️⃣ Install json-server (If Not Installed)

json-server is required to run the mock backend.

Install it globally:

npm install -g json-server


Or install it locally (recommended):

npm install json-server --save-dev

4️⃣ Run the Backend Server

Start the mock API using the predefined script:

npm run backend


The server will run on:

http://localhost:3000

5️⃣ Run the Frontend

Open index.html using:

Live Server (recommended), or

Directly in the browser

The application will now be fully functional.


---------------------------------------
💥 Created By a Human 💚
---------------------------------------
