// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
form.addEventListener("submit",addItem);
// clear btn
clearBtn.addEventListener('click',clearItems);

// load items
window.addEventListener('DOMContentLoaded',setupItems);
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();

if( value && !editFlag ){
creatListItem(id , value)
// display alert 
alertDisplay('item added to the list','success');
// show container
container.classList.add('show-container')
// add to local storage
addToLocalStorage(id , value);
// set back to default
setBackToDefault();

}else if( value  && editFlag){
    editElement.innerHTML = value;
    alertDisplay('value changed' , 'success');
    // edit localstorage
    editLocalStorage(editId , value);
    setBackToDefault();
}else{
    alertDisplay('please enter value','danger')
}
}
// alert display
function alertDisplay(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);


    // time out
    setTimeout(function(){
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
    },1000)
}

function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editId = "";
    submitBtn.textContent = `submit`
}
// clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container');
    alertDisplay('empty list','danger');
    setBackToDefault();
    localStorage.removeItem('list');
}
// delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    alertDisplay('item removed' , 'danger');
    setBackToDefault();
    // remove from localstorage
    removeFromLocalStorage(id);
}

// edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set from value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id , value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items))
} 

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
            return item
        }
    });
    localStorage.setItem('list',JSON.stringify(items))
}

function editLocalStorage(id , value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id ){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list',JSON.stringify(items))
}
function getLocalStorage(){
    return localStorage.getItem("list") ?
    JSON.parse(localStorage.getItem("list")) :
    [];
}
// localstorage Api
// set item
// get item
// remove item
// save as strings

// localStorage.setItem("orange",JSON.stringify(["item1","item2"]));
// const oranges = JSON.parse(localStorage.getItem("orange"));
// localStorage.removeItem("orange")

// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            creatListItem(item.id , item.value)
        })
        container.classList.add("show-container")
    }
}

function creatListItem(id , value){
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item')
    // add atrr
    const attr = document.createAttribute('data-id')
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button class="edit-btn" type="button">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete-btn" type="button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    `
    // delete btn
    const deleteBtn = element.querySelector('.delete-btn');
    // edit btn
    const editBtn = element.querySelector('.edit-btn');
    
    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);
    
    // append list
    list.appendChild(element);
}