import { InstructorService } from "../Services/InstructorService.js";
import { InstructorView } from "../Views/InstructorView.js";

export class InstructorController {
    constructor() {
        this.service = new InstructorService();
        this.view = new InstructorView();
        
        // Central State
        this.currentPage = 1;        
        this.pageSize = 6;          
        this.currentsortKey = "id";  
        this.currentsortOrder = "asc";
        this.currentKeyword = ""; // Added to track searches
    }

    async init() {
       
        const instructorsData = await this.service.paginate(
            this.currentPage, 
            this.pageSize, 
            this.currentsortKey, 
            this.currentsortOrder
        );
        const totalinstructors = await this.service.getAllInstructors();
        this.totalPages = Math.ceil(totalinstructors.length / this.pageSize);
        console.log(this.totalPages);

        const tableConfig = {
            instructors: instructorsData,
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
            await this.service.putInstructor(data.id, data);
        }  
       
        else {
            const instructors = await this.service.getAllInstructors();

            if(instructors.length > 0 )
            {
                data.id = Math.max(...instructors.map(s => s.id)) + 1; // ... spread operator to turn array into individual numbers
            }
            else
            {
                data.id = 1;
            }
 }
        await this.service.postInstructor(data); 
        await this.init(); 
   
}
    async onDelete(id)
    {
        const confirmed = confirm("Are you sure you want to delete this instructor?");

        if (!confirmed) return;

        await this.service.deleteInstructor(id);

        await this.init();

    }

    async onEdit(instructor) {

        const onSaveCallback = this.onSave.bind(this);

        const init = this.init.bind(this);

        this.view.renderForm(instructor, onSaveCallback, init);

    }
}