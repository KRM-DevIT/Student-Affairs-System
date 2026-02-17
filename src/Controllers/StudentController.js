import { StudentService } from "../Services/StudentService.js";
import { StudentView } from "../Views/StudentView.js";

export class StudentController {
    constructor() {
        this.service = new StudentService();
        this.view = new StudentView();
        
        // Central State
        this.currentPage = 1;        
        this.pageSize = 6;          
        this.currentsortKey = "id";  
        this.currentsortOrder = "asc";
        this.currentKeyword = ""; // Added to track searches
    }

    async init() {
       
        const studentsData = await this.service.paginate(
            this.currentPage, 
            this.pageSize, 
            this.currentsortKey, 
            this.currentsortOrder
        );
        const totalstudents = await this.service.getAllStudents();
        this.totalPages = Math.ceil(totalstudents.length / this.pageSize);
        console.log(this.totalPages);

        const tableConfig = {
            students: studentsData,
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
        
        const data = await this.service.getCombinedData(
            this.currentKeyword,
            this.currentPage,
            this.pageSize,
            this.currentsortKey,
            this.currentsortOrder
        );
        this.view.updateTable(data);
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
            await this.service.putStudent(data.id, data);
        }  
       
        else {
            const students = await this.service.getAllStudents();

            if(students.length > 0 )
            {
                data.id = Math.max(...students.map(s => s.id)) + 1; // ... spread operator to turn array into individual numbers
            }
            else
            {
                data.id = 1;
            }
 }
        await this.service.postStudent(data); 
        await this.init(); 
   
}
    async onDelete(id)
    {
        const confirmed = confirm("Are you sure you want to delete this student?");

        if (!confirmed) return;

        await this.service.deleteStudent(id);

        await this.init();

    }

    async onEdit(student) {

        const onSaveCallback = this.onSave.bind(this);

        const init = this.init.bind(this);

        this.view.renderForm(student, onSaveCallback, init);

    }
}