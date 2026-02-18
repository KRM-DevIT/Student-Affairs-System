export class InstructorView {
    constructor() {
        this.app = document.getElementById("app");
    }

//===============Render Table===============================
    renderTable(config) 
    {

        const instructors = config.instructors;
        
        this.currentOnEdit = config.onEdit;     // Here All vars are seen for all class functions 
        this.currentOnDelete = config.onDelete; 
        this.currentOnSearch = config.onSearch;  
        this.currentOnSort = config.onSort;

        this.currentOnPageChange = config.onPageChange;
        //  console.log("Current Page:", config.currentPage , "this = " , this);
         this.currentPage = config.currentPage;
         this.totalPages = config.totalPages;
        
        //======================HTML-Generation========================
        this.app.innerHTML = "";

        //% Adding Title
        const title = this.createTitle();
        //% End Title
        
        //& Add Controls
            const controls = this.createControls();
        //& Controls END

        //* Creating Table 
           const table = this.createTable();
        //* End Creating Table

        //@ Adding The pagination 
        const pagination = this.createPaginationButtons();
        //@ End of pagination
//========================================================================================
        this.tbody = document.createElement("tbody"); // View Property where we set the body of the table
        this.PopulateRows(instructors, this.currentOnEdit, this.currentOnDelete); // view function to add the rows 
        table.append(this.tbody); // rows to table
        this.app.append(title, controls, table , pagination); // we add all to the div
}

//-----------Creating Title---------------
createTitle() {
  const title = document.createElement("h2");
  title.textContent = "Instructor List";
  return title;
}

//-----  Creating Controls==========
createControls(){
    
            const controls = document.createElement("div");
            controls.style.display = "flex";
            controls.style.marginBottom = "15px";
            
            const addBtn = document.createElement("button");
            addBtn.textContent = "Add New Instructor";
            addBtn.className = "btn-add";
            addBtn.style.float = "left";

            addBtn.onclick = () => this.currentOnEdit(null);

            const searchbox = document.createElement("input");
            searchbox.placeholder = "Search by name, email, or dept...";
            searchbox.className = "search-box";
            searchbox.style.float = "right";
            searchbox.style.marginLeft = "auto";

            searchbox.oninput = (e) => this.currentOnSearch(e.target.value);
            
            controls.append(addBtn, searchbox);
    
            return controls;
}

//--------------Creating Table==============
createTable(){
    const table = document.createElement("table");
    table.style.border = "2px solid green";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = [
        {name:"ID" , key:"id"}, 
        {name:"Name" , key:"name"}, 
        {name:"Email" , key:"email"}, 
        {name:"Department" , key:"department"}, 
        {name:"Title" , key:"title"}, 
        {name:"Office",key:"office"},
        {name:"Phone",key:"phone"},
        {name:"Actions",key:"none"}
    ];
    
    this.defaultSort = "asc";
    this.currentSortKey = "id";
    this.sortArrows = {};

    headers.forEach(obj => {
        
        const th = document.createElement("th");            
        th.textContent = obj.name;
        
        if(obj.key !== "none") 
        {
            th.style.cursor = "pointer";
            
            const arrowUp = document.createElement("span");
            arrowUp.textContent = " ▲";
            arrowUp.style.color = "#666";
            arrowUp.style.fontSize = "12px";
            
            const arrowDown = document.createElement("span");
            arrowDown.textContent = " ▼";
            arrowDown.style.color = "#666";
            arrowDown.style.fontSize = "12px";
            
            th.appendChild(arrowUp);
            th.appendChild(arrowDown);
            
            this.sortArrows[obj.key] = { up: arrowUp, down: arrowDown };
            
            if(obj.key === "id") {
                arrowUp.style.color = "#fff";
                arrowUp.style.fontWeight = "bold";
            }
            
            th.onclick = () => 
            {
                if(this.defaultSort === "asc") {
                    this.defaultSort = "desc";
                } else {
                    this.defaultSort = "asc";
                }
                this.currentSortKey = obj.key;
                this.updateSortArrows();
                this.currentOnSort(obj.key, this.defaultSort);
            }
        }
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);
    return table;
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@ Pagination Adding @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

createPaginationButtons() 
{
    const paginationDiv = document.createElement("div");
    paginationDiv.className = "pagination-container";
    paginationDiv.style.marginTop = "20px";
    paginationDiv.style.textAlign = "center";
    
    // Previous Button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.className = "btn";
    prevBtn.id = "prev-btn";
    prevBtn.style.backgroundColor = "lightgray"
    prevBtn.onclick = () => {
            this.currentPage = Math.max(this.currentPage - 1, 1);
            this.currentOnPageChange(this.currentPage);
            document.getElementById("page-info").textContent = ` Page ${this.currentPage} `;
            this.updateButtons(); 
    };
    

    // Next Button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.className = "btn";
    nextBtn.style.backgroundColor = "red"
    nextBtn.id = "next-btn";
    nextBtn.onclick = () => {
        this.currentPage = Math.min(this.currentPage + 1, this.totalPages); 
        this.currentOnPageChange(this.currentPage);
        document.getElementById("page-info").textContent = ` Page ${this.currentPage} `;
        this.updateButtons();
    };
    // Page Info (Optional)
    const pageInfo = document.createElement("span");
    pageInfo.id = "page-info";
    pageInfo.textContent = ` Page ${this.currentPage} `;
    pageInfo.style.margin = "0 15px";

    paginationDiv.append(prevBtn, pageInfo, nextBtn);
    
    return paginationDiv;
}
//$ UPDATING BUTTON Status according to Page Number
updateButtons() {
    document.getElementById("prev-btn").disabled = this.currentPage <= 1;
    document.getElementById("next-btn").disabled = this.currentPage >= this.totalPages;
}

updateSortArrows() {
    for(const key in this.sortArrows) {
        const arrows = this.sortArrows[key];
        if(key === this.currentSortKey) {
            if(this.defaultSort === "asc") {
                arrows.up.style.color = "#fff";
                arrows.up.style.fontWeight = "bold";
                arrows.down.style.color = "#666";
                arrows.down.style.fontWeight = "normal";
            } else {
                arrows.up.style.color = "#666";
                arrows.up.style.fontWeight = "normal";
                arrows.down.style.color = "#fff";
                arrows.down.style.fontWeight = "bold";
            }
        } else {
            arrows.up.style.color = "#666";
            arrows.up.style.fontWeight = "normal";
            arrows.down.style.color = "#666";
            arrows.down.style.fontWeight = "normal";
        }
    }
}

//**************************************PoPulating the Rows******************************** */

PopulateRows(instructors, currentOnEdit, currentOnDelete) 
{
        this.tbody.innerHTML = "";
        instructors.forEach(s => {
            const row = document.createElement("tr");

            [
                s.id,
                s.name,
                s.email,
                s.department,
                s.title,
                s.office,
                s.phone
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

//! -----------------------------Refreshing the Table ==============================
    updateTable(filteredInstructors, currentPage, totalPages) 
    {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        
        this.PopulateRows(filteredInstructors, this.currentOnEdit, this.currentOnDelete);
        
        // Update pagination UI
        const pageInfo = document.getElementById("page-info");
        if (pageInfo) {
            pageInfo.textContent = ` Page ${this.currentPage} `;
        }
        this.updateButtons();
    }
//----------------------------------------------------Render Form----------------------------------------------------

                             // ================= PURE DOM RENDER FORM =================

    renderForm(instructor, onSave, onCancel) {

        this.app.innerHTML = ""; // Clear existing content

        // 1. Create Container
        const container = document.createElement("div");
        container.className = "form-container";

        // 2. Create Title
        const h2 = document.createElement("h2");
        if(instructor){
            h2.textContent = "Edit Instructor";
        } else {
            h2.textContent = "Add New Instructor"; 
        }
        container.appendChild(h2);

        // 3. Create Form
        const form = document.createElement("form");
        form.id = "instructorForm";

        // 4. Create Inputs using a DOM Helper
        // Note: We are appending ELEMENTS
        //(label , type , id , value )
        form.appendChild(this.createInputDOM("ID", "number", "id", instructor?.id));   
        form.appendChild(this.createInputDOM("Name", "text", "name", instructor?.name));
        form.appendChild(this.createInputDOM("Email", "email", "email", instructor?.email));
        form.appendChild(this.createInputDOM("Department", "text", "department", instructor?.department));
        form.appendChild(this.createInputDOM("Title", "text", "title", instructor?.title));
        form.appendChild(this.createInputDOM("Office", "text", "office", instructor?.office));
        form.appendChild(this.createInputDOM("Phone", "text", "phone", instructor?.phone));

        // 5. Create Buttons
        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.className = "btn-add";
        submitBtn.textContent = instructor ? "Update" : "Save";
        
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
                email: document.getElementById("email").value.toLowerCase(),
                department: document.getElementById("department").value.toLowerCase(),
                title: document.getElementById("title").value.toLowerCase(),
                office: document.getElementById("office").value.toLowerCase(),
                phone: document.getElementById("phone").value.toLowerCase(),
                id: parseInt(document.getElementById("id").value) || null //- note :- NaN || null => null 
            };
            onSave(formData);
        };

        // 7. Assemble
        container.appendChild(form);
        this.app.appendChild(container);
    }

// ------------------------------- Helper: Creates DOM Elements instead of Strings ------------------

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

// -===================================-- Helper: Creates a Checkbox with Label ---

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