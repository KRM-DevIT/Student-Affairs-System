export class ApiService  // This Class Talks to Json-Server
{
    constructor() 
    {
        this.baseUrl = "http://localhost:3000"; // This is the Server URL (Local)
    }

    async get(endpoint) // Fetching Students either All or By ID 
    {
        try {
                const response = await fetch(`${this.baseUrl}/${endpoint}`); // json server is called here 
                
                if (!response.ok) 
                    {
                        throw new Error(`API Error: ${response.statusText}`);
                    }
                    
                return await response.json();
            } 
        
            catch (error) 
            {
                console.error("Fetch error:", error);
            }
    }

    async post(endpoint, data)  // For Adding New Student
    {
        try
        {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                    
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                
                if (!response.ok) 
                    {
                        throw new Error(`API Error: ${response.statusText}`);
                    }

                return await response.json();
        } 
        
        catch (error) 
        {
            console.error("Fetch error:", error);
        }
    }

     async put(endpoint, id, data) 
     {  // For Editing Exisiting Students
        
        try
        {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) 
                    {
                        throw new Error(`API Error: ${response.statusText}`);
                    }

                return await response.json();
        } 
        
        catch (error) 
        {
            console.error("Fetch error:", error);
        }
    }

    async delete(endpoint, id) 
    
    {  // For Deleting Students 
        
        
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: "DELETE"
            });

        if (!response.ok) 
                {
                    throw new Error(`API Error: ${response.statusText}`);
                }

              return await response.json();
            } 
        
        catch (error) 
        {
            console.error("Fetch error:", error);
        }
    }

    async searchbykeyword(endpoint, keyword) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}?q=${keyword}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Search error:", error);
        }
    }

    async sortbyheader(endpoint, key, order) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}?_sort=${key}&_order=${order}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Search error:", error);
        }
    }

    async fetchPage({ endpoint, page = 1, limit = 10, sortKey, sortOrder }) {
    try 
    {
            const params = new URLSearchParams({
                _page: page,
                _limit: limit
            });

            if (sortKey && sortOrder) {
                params.append("_sort", sortKey);
                params.append("_order", sortOrder);
            }
            // ?_page=${page}&_limit=${limit}
            console.log(params.toString());
            const url = `${this.baseUrl}/${endpoint}?${params.toString()}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            return await response.json();

    } 
    

    catch (error) 
    {
        console.error("Fetch page error:", error);
        throw error;
    }


}

 async getFilteredData(endpoint,keyword, page, pageSize, sortKey, sortOrder) {
        // 1. Create a parameters object
        const params = new URLSearchParams();

        // 2. Map your local state to the API's expected query keys
        if (keyword) params.append("q", keyword); // Most APIs use 'q' for search
        if (page) params.append("_page", page);
        if (pageSize) params.append("_limit", pageSize);
        if (sortKey) params.append("_sort", sortKey);
        if (sortOrder) params.append("_order", sortOrder);

        try {
            
            const url = `${this.baseUrl}/${endpoint}?${params.toString()}`;
            
            const response = await fetch(url);
            
            if (!response.ok) 
                throw new Error("Network response was not ok");

            return await response.json();
        } 
        
        catch (error) {
            console.error("Fetch error:", error);
            return [];
        }
    }

}