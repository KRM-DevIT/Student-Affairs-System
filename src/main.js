import { StudentController } from "../src/Controllers/StudentController.js";
import { CourseController } from "../src/Controllers/CourseController.js";
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