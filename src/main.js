import { StudentController } from "../src/Controllers/StudentController.js";
import { CourseController } from "../src/Controllers/CourseController.js";
import { EmployeeController } from "../src/Controllers/EmployeeController.js";
import { InstructorController } from "../src/Controllers/InstructorController.js";



window.addEventListener("load", () => {
    const app = new StudentController();
    app.init();
    
});

const studentController = new StudentController();

const studentsLink = document.getElementById('studentsLink');

studentsLink.addEventListener('click', async (e) => {
    e.preventDefault();
    await studentController.init();
});

const courseController = new CourseController();

const coursesLink = document.getElementById('coursesLink');

coursesLink.addEventListener('click', async (e) => {
    e.preventDefault();
    await courseController.init();
});

const employeeController = new EmployeeController();

const employeesLink = document.getElementById('employeesLink');

employeesLink.addEventListener('click', async (e) => {
    e.preventDefault();
    await employeeController.init();
});


const instructorController = new InstructorController();

const instructorsLink = document.getElementById('instructorsLink');

instructorsLink.addEventListener('click', async (e) => {
    e.preventDefault();
    await instructorController.init();
});