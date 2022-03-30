const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");
const elList = document.querySelector(".todo-list");

const todos = [];

elList.addEventListener("click" , evt => {

  if(evt.target.matches(".todo-list__btn")){

    const btnId = evt.target.dataset.todoId;

    const findIndexArr = todos.findIndex(todo => todo.id == btnId);

    todos.splice(findIndexArr, 1);

    renderTodo(todos , elList);
    
  }else if(evt.target.matches(".todo-list__checkbox")){

    const inputCheckedId = evt.target.dataset.todoId;

    const findElement = todos.find(todo => todo.id == inputCheckedId);

    findElement.isComplated = !findElement.isComplated;

    renderTodo(todos , elList);
  }
})


function renderTodo(arr, element) {

  element.innerHTML = "";

  arr.forEach(todo => {
    const newItem = document.createElement("li");
    const newInput = document.createElement("input");
    const newBtn = document.createElement("button");



    newItem.textContent = todo.title;
    newInput.type = "checkbox";
    newBtn.textContent = "Delete";
    newBtn.classList.add("todo-list__btn");
    newBtn.dataset.todoId = todo.id;
    newInput.dataset.todoId = todo.id;
    newInput.classList.add("todo-list__checkbox");

    if(todo.isComplated){
      newInput.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    newItem.appendChild(newInput);
    newItem.appendChild(newBtn);

    element.appendChild(newItem);
  });

}



elForm.addEventListener("submit", evt =>{

  evt.preventDefault();

  const elInputValue = elFormInput.value.trim();


  const todo = {
    id: todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
    title: elInputValue,
    isComplated: false,
  };

  todos.push(todo);

  renderTodo(todos , elList);

  elFormInput.value = "";

})