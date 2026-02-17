import { ApiService } from "./ApiService.js";

export class StudentService extends ApiService { 
    // This Class To determine the needed EndPoints + Uses Api-Service As Middle-Layer that talks to Server Directly
    constructor() {
        super();
        this.endpoint = "students";
    }

    // GET all students
    async getAllStudents() {
        return await this.get(this.endpoint);
    }
    
    // POST new student
    async postStudent(data) {
        return await this.post(this.endpoint, data);
    }

    // PUT update existing student
    async putStudent(id, data) {
        return await this.put(this.endpoint, id, data);
    }

    // DELETE a student
    async deleteStudent(id) {
        return await this.delete(this.endpoint, id);
    }

    async searchStudents(keyword) {
        return await this.searchbykeyword(this.endpoint, keyword);
    }

    async sortStudents(key, order){
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