const numOfEmployee = 12; // how many employee in a page 
let employees; // Array of objects of employee 

//get data from url 
function getEmployees(){
    const url = `https://randomuser.me/api?results=${numOfEmployee}`;
    return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

//generate employees card on a page 
async function generateCards(){
    const gallery = document.querySelector("#gallery");
 
    const data = await getEmployees();
    //console.log(data.results); 
    
    //save the employees' details in employees array
    employees = data.results;
    let markup = '';
    let ind = -1; // to start from 0 

    markup += employees
        .map((employee) => {
            ind++;
            //console.log(employee);
            return `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture" onclick="displayModal(${ind})">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap" onclick="displayModal(${ind})">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`
        })
        .join("");
    
    gallery.innerHTML = markup;
   //console.log(employees);
}

//when click an employee's picture or name, display a modal of their detailed information
function displayModal(i) {

    //console.log(employees[element]);
    let eachEmployee = employees[i];

    document.querySelector("body").insertAdjacentHTML(
        `beforeend`, 
        `<div id="modal${i}" class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeModal(${i})"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${eachEmployee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${eachEmployee.name.first} ${eachEmployee.name.last}</h3>
                <p class="modal-text">${eachEmployee.email}</p>
                <p class="modal-text cap">${eachEmployee.location.city}</p>
                <hr>
                <p class="modal-text">${eachEmployee.cell}</p>
                <p class="modal-text">${eachEmployee.location.street.number} ${eachEmployee.location.street.name}, ${eachEmployee.location.city}, ${eachEmployee.location.state} ${eachEmployee.location.postcode}</p>
                <p class="modal-text">Birthday: ${eachEmployee.dob.date.substr(0, 10)}</p>
            </div>
        </div>`
    );
}

//when click the close button on a modal, it closes a modal
function closeModal(i){
    let modal = document.getElementById(`modal${i}`);
    modal.style.display='none';
}

generateCards();