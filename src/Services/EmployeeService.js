import { ApiService } from "./ApiService.js";

export class EmployeeService extends ApiService { 
    // This Class To determine the needed EndPoints + Uses Api-Service As Middle-Layer that talks to Server Directly
    constructor() {
        super();
        this.endpoint = "employees";
    }

    // GET all employees
    async getAllEmployees() {
        return await this.get(this.endpoint);
    }
    
    // POST new employee
    async postEmployee(data) {
        return await this.post(this.endpoint, data);
    }

    // PUT update existing employee
    async putEmployee(id, data) {
        return await this.put(this.endpoint, id, data);
    }

    // DELETE a employee
    async deleteEmployee(id) {
        return await this.delete(this.endpoint, id);
    }

    async searchEmployees(keyword) {
        return await this.searchbykeyword(this.endpoint, keyword);
    }

    async sortEmployees(key, order){
        return await this.sortbyheader(this.endpoint , key , order);
    }

    async paginate(page, limit, sortKey, sortOrder) {
        return await this.fetchPage({
            endpoint: this.endpoint,
            page,
            limit,
            sortKey,
            sortOrder
        });
    }

    async getCombinedData(keyword, page, pageSize, sortKey, sortOrder) {
        return await this.getFilteredData(this.endpoint, keyword, page, pageSize, sortKey, sortOrder);
    }   
}