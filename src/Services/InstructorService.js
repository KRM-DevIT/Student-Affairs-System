import { ApiService } from "./ApiService.js";

export class InstructorService extends ApiService { 
    // This Class To determine the needed EndPoints + Uses Api-Service As Middle-Layer that talks to Server Directly
    constructor() {
        super();
        this.endpoint = "instructors";
    }

    // GET all instructors
    async getAllInstructors() {
        return await this.get(this.endpoint);
    }
    
    // POST new instructor
    async postInstructor(data) {
        return await this.post(this.endpoint, data);
    }

    // PUT update existing instructor
    async putInstructor(id, data) {
        return await this.put(this.endpoint, id, data);
    }

    // DELETE a instructor
    async deleteInstructor(id) {
        return await this.delete(this.endpoint, id);
    }

    async searchInstructors(keyword) {
        return await this.searchbykeyword(this.endpoint, keyword);
    }

    async sortInstructors(key, order){
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