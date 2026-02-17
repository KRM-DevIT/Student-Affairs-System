import { ApiService } from "./ApiService.js";

export class CourseService extends ApiService { 
    // This Class To determine the needed EndPoints + Uses Api-Service As Middle-Layer that talks to Server Directly
    constructor() {
        super();
        this.endpoint = "courses";
    }

    // GET all courses
    async getAllCourses() {
        console.log(this);
        return await this.get(this.endpoint);
    }
    
    // POST new course
    async postCourse(data) {
        return await this.post(this.endpoint, data);
    }

    // PUT update existing course
    async putCourse(id, data) {
        return await this.put(this.endpoint, id, data);
    }

    // DELETE a course
    async deleteCourse(id) {
        return await this.delete(this.endpoint, id);
    }

    async searchCourses(keyword) {
        return await this.searchbykeyword(this.endpoint, keyword);
    }

    async sortCourses(key, order){
        return await this.sortbyheader(this.endpoint , key , order);
    }
}
