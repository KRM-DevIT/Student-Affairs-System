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

This project follows the **MVC (Model-View-Controller)** pattern combined with a **Service Layer** for clean separation of concerns:
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
├── │   │   ├── BaseView.js      # Shared logic for tables/forms
├── │   │   ├── StudentView.js
├── │   │   ├── CourseView.js
├── │   │   ├── InstructorView.js
├── │   │   └── EmployeeView.js
├── │   │
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
