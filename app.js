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
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

if( value && !editFlag ){
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
// append list
list.appendChild(element);
// display alert 
alertDisplay('item added to the list','success');
// show container
container.classList.add('show-container')
// add to local storage
addToLocalStorage(id , value);
// set back to default
setBackToDefault();

}else if( value  && editFlag){
    console.log('editing')
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
    },2500)
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
    // localStorage.removeItem('list');
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id , value){
    console.log('added to local storage')
}
// ****** SETUP ITEMS **********
