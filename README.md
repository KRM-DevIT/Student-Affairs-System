<img width="556" height="388" alt="image" src="https://github.com/user-attachments/assets/4e680a78-096d-4d41-bedb-32595005e7b8" /># 🎓 Student Affairs System

A **Vanilla JavaScript CRUD application** built using **ES6 Classes** and a clean **MVC-inspired architecture**.  
The system manages Students, Courses, Instructors, and Employees with full CRUD operations, search, sorting, and pagination using a mock REST API.

---

## 🚀 Features

- Full **CRUD** (Create, Read, Update, Delete)
- **OOP-based design** using ES6 Classes
- **Modular architecture** using `import` / `export`
- **Search**, **Sorting**, and **Pagination**
- Clean separation of concerns (Models, Views, Services, Controllers)
- Mock backend using `json-server`

---

## 🏗️ Project Structure

/students-affairs-system
│
├── /css
│ └── style.css # Tables, pagination, and form styles
│
├── /src
│ ├── /models # Entity definitions (OOP)
│ │ ├── Student.js
│ │ ├── Course.js
│ │ ├── Instructor.js
│ │ └── Employee.js
│ │
│ ├── /services # API & data logic
│ │ ├── ApiService.js # Base Fetch logic
│ │ ├── StudentService.js
│ │ ├── CourseService.js
│ │ ├── InstructorService.js
│ │ └── EmployeeService.js
│ │
│ ├── /views # DOM rendering & UI logic
│ │ ├── BaseView.js
│ │ ├── StudentView.js
│ │ ├── CourseView.js
│ │ ├── InstructorView.js
│ │ └── EmployeeView.js
│ │
│ ├── /controllers # Application flow & event handling
│ │ ├── StudentController.js
│ │ ├── CourseController.js
│ │ ├── InstructorController.js
│ │ └── EmployeeController.js
│ │
│ └── main.js # Application entry point
│
├── db.json # Mock database (json-server)
├── index.html # Main layout
└── package.json # Scripts & dependencies

---

## 🧠 Architecture Overview

### 🔹 Models
Define the structure of each entity (Student, Course, Instructor, Employee).

### 🔹 Services
Handle all API communication using `fetch()`:
- Searching via `?q=`
- Sorting via `_sort`
- Pagination via `_page`

### 🔹 Views
Responsible for:
- Rendering tables and rows
- Showing / hiding forms
- Updating the DOM only

### 🔹 Controllers
- Listen to user interactions
- Coordinate between Views and Services
- Keep business logic out of the UI

---

## 🛠️ Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- json-server
- Fetch API
- MVC-inspired pattern

---

## ▶️ How to Run the Project

### 1️⃣ Install dependencies
```bash
npm install
npm run backend



Open index.html using Live Server or directly in the browser.
