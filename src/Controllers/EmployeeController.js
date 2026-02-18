import { EmployeeService } from "../Services/EmployeeService.js";
import { EmployeeView } from "../Views/EmployeeView.js";

export class EmployeeController {
    constructor() {
        this.service = new EmployeeService();
        this.view = new EmployeeView();
        
        // Central State
        this.currentPage = 1;        
        this.pageSize = 6;          
        this.currentsortKey = "id";  
        this.currentsortOrder = "asc";
        this.currentKeyword = ""; // Added to track searches
    }

    async init() {
       
        const employeesData = await this.service.paginate(
            this.currentPage, 
            this.pageSize, 
            this.currentsortKey, 
            this.currentsortOrder
        );
        const totalemployees = await this.service.getAllEmployees();
        this.totalPages = Math.ceil(totalemployees.length / this.pageSize);
        console.log(this.totalPages);

        const tableConfig = {
            employees: employeesData,
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
            await this.service.putEmployee(data.id, data);
        }  
       
        else {
            const employees = await this.service.getAllEmployees();

            if(employees.length > 0 )
            {
                data.id = Math.max(...employees.map(s => s.id)) + 1; // ... spread operator to turn array into individual numbers
            }
            else
            {
                data.id = 1;
            }
 }
        await this.service.postEmployee(data); 
        await this.init(); 
   
}
    async onDelete(id)
    {
        const confirmed = confirm("Are you sure you want to delete this employee?");

        if (!confirmed) return;

        await this.service.deleteEmployee(id);

        await this.init();

    }

    async onEdit(employee) {

        const onSaveCallback = this.onSave.bind(this);

        const init = this.init.bind(this);

        this.view.renderForm(employee, onSaveCallback, init);

    }
}