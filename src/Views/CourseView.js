export class CourseView {
    constructor() {
        this.app = document.getElementById("app");
    }

//===============Render Table===============================
    renderTable(courses, onEdit, onDelete ,onSearch , onSort) {
        
        this.currentOnEdit = onEdit;     // Save it for later on view object level
        this.currentOnDelete = onDelete; 
        this.currentOnSearch = onSearch;  
        this.currentOnSort = onSort;

        this.app.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = "Course List";

        //& Add Controls
            const controls = document.createElement("div");
            controls.style.display = "flex";
            controls.style.marginBottom = "15px";

            const addBtn = document.createElement("button");
            addBtn.textContent = "Add New Course";
            addBtn.className = "btn-add";
            addBtn.style.float = "left";

            addBtn.onclick = () => onEdit(null);

            const searchbox = document.createElement("input");
            searchbox.placeholder = "Search by Course\"Name,Code, or Desc\"...";
            searchbox.className = "search-box";
            searchbox.style.float = "right";

            searchbox.oninput = (e) => onSearch(e.target.value);

        //& Controls END

        const table = document.createElement("table");
        table.style.border = "2px solid green";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            {name:"ID" , key:"id"}, 
            {name:"Name" , key:"name"}, 
            {name:"CourseCode" , key:"coursecode"}, 
            {name:"Description" , key:"description"},
            {name:"Actions",key:"none"}
        ];

        this.defaultSort = "asc";
        headers.forEach(obj => {
            const th = document.createElement("th");
            th.textContent = obj.name;
            
            if(obj.key !== "none") {

                th.onclick = () => {
                    this.defaultSort = this.defaultSort === "asc" ? "desc" : "asc"; // toggle
                    onSort(obj.key, this.defaultSort);
                }
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
//========================================================================================
        this.tbody = document.createElement("tbody"); // View Property where we set the body of the table

        this.PopulateRows(courses, this.currentOnEdit, this.currentOnDelete); // view function to add the rows 
        table.append(thead, this.tbody); // append head and body
        this.app.append(title, addBtn,searchbox,table); // we add all to the div
    }


//******************PoPulating the Rows************ */

    PopulateRows(courses, currentOnEdit, currentOnDelete) 

{
        this.tbody.innerHTML = "";
        courses.forEach(s => {
            const row = document.createElement("tr");

            [
                s.id,
                s.name,
                s.coursecode,
                s.description,
            ].forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                row.appendChild(td);
            });
            
            const actionsTd = document.createElement("td");    

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "btn edit";
            editBtn.onclick = () => {
                currentOnEdit(s);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "btn delete";
            deleteBtn.onclick = () => {
                currentOnDelete(s.id);
            }
            actionsTd.append(editBtn, deleteBtn);
            row.appendChild(actionsTd); 
            this.tbody.appendChild(row);
        });
    }

    updateTable(filteredCourses) 
    {
        
        this.PopulateRows(filteredCourses, this.currentOnEdit, this.currentOnDelete);
    }
//----------------------------------------------------Render Form----------------------------------------------------

// ================= PURE DOM RENDER FORM =================

    renderForm(course, onSave, onCancel) {

        this.app.innerHTML = ""; // Clear existing content

        // 1. Create Container
        const container = document.createElement("div");
        container.className = "form-container";

        // 2. Create Title
        const h2 = document.createElement("h2");
        if(course){
            h2.textContent = "Edit Course";
        } else {
            h2.textContent = "Add New Course"; 
        }
        container.appendChild(h2);

        // 3. Create Form
        const form = document.createElement("form");
        form.id = "courseForm";

        // 4. Create Inputs using a DOM Helper
        // Note: We are appending ELEMENTS
        //(label , type , id , value )
        form.appendChild(this.createInputDOM("ID", "number", "id", course?.id));   
        form.appendChild(this.createInputDOM("Name", "text", "name", course?.name));
        form.appendChild(this.createInputDOM("CourseCode", "text", "coursecode", course?.coursecode));
        form.appendChild(this.createInputDOM("Description", "text", "description", course?.description));
        
        // 5. Create Buttons
        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.className = "btn-add";
        submitBtn.textContent = course ? "Update" : "Save";
        
        //?? Why don't we add submitBtn.onclick = (submission event) ?? because its type = submit which by default trigger form.onsubmit

        const cancelBtn = document.createElement("button");
        cancelBtn.type = "button";
        cancelBtn.className = "btn-delete";
        cancelBtn.textContent = "Cancel";
        
        // Attach Cancel Event directly to the element (Cleaner!)
        cancelBtn.onclick = onCancel;
        // =======================
        btnGroup.append(submitBtn, cancelBtn);
        form.appendChild(btnGroup);
        
        // 6. Handle Submit Logic
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById("name").value.toLowerCase(),
                coursecode: document.getElementById("coursecode").value.toLowerCase(),
                description: document.getElementById("description").value.toLowerCase(),
                id: parseInt(document.getElementById("id").value) || null //- note :- NaN || null => null 
            };
            onSave(formData);
        };

        // 7. Assemble
        container.appendChild(form);
        this.app.appendChild(container);
    }

    // --- Helper: Creates DOM Elements instead of Strings ---

    createInputDOM(label, type, id, value = '') {
        const wrapper = document.createElement("div"); // each input with its own div
        wrapper.className = "form-group";

        const labelEl = document.createElement("label"); // inline element
        labelEl.htmlFor = id;
        labelEl.textContent = label;

        const inputEl = document.createElement("input"); // inline-block element
        inputEl.type = type;
        inputEl.id = id;
        inputEl.value = value;
        if(id=="id")
        {
            inputEl.disabled = true; // Disable editing of ID field
        }
        inputEl.required = true;

        wrapper.append(labelEl, inputEl);
        return wrapper;
    }

    // --- Helper: Creates a Checkbox with Label ---
    createCheckboxDOM(labelText, id, isChecked) {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "10px";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    if (isChecked) input.checked = true;

    label.appendChild(input);
    label.appendChild(document.createTextNode(labelText));
    wrapper.appendChild(label);

    return wrapper;
    }

}