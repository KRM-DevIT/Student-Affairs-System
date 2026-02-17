# 🎓 Student Affairs System

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
│   └── style.css            # Styles for Grid (Table), pagination, and forms [cite: 13, 119]
│
├── /src
│   ├── /models              # OOP Classes defining the data structure 
│   │   ├── Student.js
│   │   ├── Course.js
│   │   ├── Instructor.js
│   │   └── Employee.js
│   │
│   ├── /services            # Logic for API calls, search, sort, and pagination [cite: 110]
│   │   ├── ApiService.js    # Base class for Fetch API logic [cite: 12, 110]
│   │   ├── StudentService.js
│   │   ├── CourseService.js
│   │   ├── InstructorService.js
│   │   └── EmployeeService.js
│   │
│   ├── /views               # DOM manipulation and rendering logic [cite: 106]
│   │   ├── BaseView.js      # Shared logic for tables/forms
│   │   ├── StudentView.js
│   │   ├── CourseView.js
│   │   ├── InstructorView.js
│   │   └── EmployeeView.js
│   │
│   ├── /controllers         # Bridges views and services [cite: 111, 120]
│   │   ├── StudentController.js
│   │   ├── CourseController.js
│   │   ├── InstructorController.js
│   │   └── EmployeeController.js
│   │
│   └── main.js              # Entry point to initialize the application [cite: 111]
│
├── db.json                  # Mock database for json-server [cite: 11, 123]
├── index.html               # Main layout and navigation [cite: 119]
└── package.json             # Scripts to run json-server [cite: 11]
===================================================================================================================


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
