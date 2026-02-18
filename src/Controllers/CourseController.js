import { CourseService } from "../Services/CourseService.js";
import { CourseView } from "../Views/CourseView.js";

export class CourseController {
    constructor() {
        this.service = new CourseService();
        this.view = new CourseView();
        
        // Central State
        this.currentPage = 1;        
        this.pageSize = 6;          
        this.currentsortKey = "id";  
        this.currentsortOrder = "asc";
        this.currentKeyword = ""; // Added to track searches
    }

    async init() {
       
        const coursesData = await this.service.paginate(
            this.currentPage, 
            this.pageSize, 
            this.currentsortKey, 
            this.currentsortOrder
        );
        const totalcourses = await this.service.getAllCourses();
        this.totalPages = Math.ceil(totalcourses.length / this.pageSize);
        console.log(this.totalPages);

        const tableConfig = {
            courses: coursesData,
            onEdit: this.onEdit.bind(this),
            onDelete: this.onDelete.bind(this),
            onSearch: this.onSearch.bind(this),
            onSort: this.onSort.bind(this),
            onPageChange: this.paginateTable.bind(this), // Added page change listener
            currentPage: this.currentPage,
            totalPages:this.totalPages
        };

        this.view.renderTable(tableConfig);
    }

    async loadData() {
         
        const result = await this.service.getCombinedData(
            this.currentKeyword,
            this.currentPage,
            this.pageSize,
            this.currentsortKey,
            this.currentsortOrder
        );
        
        // Recalculate total pages based on filtered results
        this.totalPages = Math.ceil(result.totalCount / this.pageSize) || 1;
        
        this.view.updateTable(result.data, this.currentPage, this.totalPages);
    }

    async onSearch(keyword) {
        this.currentKeyword = keyword;
        this.currentPage = 1; // Reset to page 1 on new search
        await this.loadData();
    }

    async onSort(key, order) {
        this.currentsortKey = key;
        this.currentsortOrder = order;
        await this.loadData();
    }

    async paginateTable(newPage) {
        this.currentPage = newPage;
        await this.loadData();
    }

    async onSave(data) {
         if (data.id)
        {
            await this.service.putCourse(data.id, data);
        }  
       
        else {
            const courses = await this.service.getAllCourses();

            if(courses.length > 0 )
            {
                data.id = Math.max(...courses.map(s => s.id)) + 1; // ... spread operator to turn array into individual numbers
            }
            else
            {
                data.id = 1;
            }
 }
        await this.service.postCourse(data); 
        await this.init(); 
   
}
    async onDelete(id)
    {
        const confirmed = confirm("Are you sure you want to delete this course?");

        if (!confirmed) return;

        await this.service.deleteCourse(id);

        await this.init();

    }

    async onEdit(course) {

        const onSaveCallback = this.onSave.bind(this);

        const init = this.init.bind(this);

        this.view.renderForm(course, onSaveCallback, init);

    }
}