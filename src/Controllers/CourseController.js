import { CourseService } from "../Services/CourseService.js";
import { CourseView } from "../Views/CourseView.js";

export class CourseController {
    constructor() {
        this.service = new CourseService();
        this.view = new CourseView();
    }
    
    // Initial table rendering
    async init() {
        const coursesData = await this.service.getAllCourses();
        const onEditCallback = this.onEdit.bind(this);
        const onDeleteCallback = this.onDelete.bind(this);
        const onSearchCallback = this.onSearch.bind(this);
        const onSortCallback = this.onSort.bind(this);
        this.view.renderTable(coursesData, onEditCallback, onDeleteCallback, onSearchCallback, onSortCallback);
    }

    // Called when Add button or Edit button clicked
    async onEdit(course) {
        const onSaveCallback = this.onSave.bind(this);
        const init = this.init.bind(this);
        this.view.renderForm(course, onSaveCallback, init); // if addCourse -> first parameter is null
    }

    // Called when form is submitted from View
    async onSave(data) 
    {
        // debugger;
        if (data.id) 
        {
            // Existing course → update
            await this.service.putCourse(data.id, data);
        }   
        // No id then no course
        else {
            // New course → create
            const courses = await this.service.getAllCourses();
            
            if(courses.length > 0 )
            {
                data.id = Math.max(...courses.map(s => s.id)) + 1; // ... spread operator to turn array into individual numbers
            }

            else 
            {
                data.id = 1;
            }
            await this.service.postCourse(data);
        }

        console.log(this);
        // Reload table after save
        await this.init();
    }

    // Called when Delete button clicked
    async onDelete(id) 
    {
        const confirmed = confirm("Are you sure you want to delete this course?");
        if (!confirmed) return;

        await this.service.deleteCourse(id);

        // Reload table after delete
        await this.init();
    }

    // Called when Search input changes
    async onSearch(keyword) 
        {
            const filteredCourses = await this.service.searchCourses(keyword);

            this.view.updateTable(filteredCourses); 
        }
    
    async onSort(key, order) {
        const sortedCourses = await this.service.sortCourses(key, order);
        this.view.updateTable(sortedCourses);
    }
}
