const elList = document.querySelector(".list");
const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");

const elBtnAll = document.querySelector(".btn-all");
const elBtnComp = document.querySelector(".btn-comp");
const elBtnUncomp = document.querySelector(".btn-uncomp");

const elAllSpan = document.querySelector(".all-span");
const elCompSpan = document.querySelector(".comp-span");
const elUncompSpan = document.querySelector(".uncomp-span");

const todos = [];

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const elInputValue = elFormInput.value.trim();

  if (elInputValue && isNaN(+elInputValue)) {
    const todo = {
      id: todos[todos.length - 1]?.id + 1 || 1,
      title: elInputValue,
      isCompleted: false,
    };
    todos.push(todo);

    renderTodo(todos, elList);
  }

  elFormInput.value = "";
});

const renderTodo = (arr, element) => {
  element.innerHTML = "";
  element.classList.add("bg-gradient");

  arr.forEach((todo) => {
    const newItem = document.createElement("li");
    const newInput = document.createElement("input");
    const newBtn = document.createElement("button");

    newItem.textContent = `${todo.id}: ${todo.title}`;
    newItem.setAttribute("class", "list-group-item list__item");
    newInput.type = "checkbox";
    newInput.setAttribute("class", "me-2 list__checkbox");
    newInput.dataset.todoId = todo.id;
    newBtn.textContent = "Delete";
    newBtn.setAttribute("class", "btn btn-primary list__btn ");
    newBtn.dataset.todoId = todo.id;

    if (todo.isCompleted) {
      newInput.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    newItem.prepend(newInput);
    newItem.appendChild(newBtn);
    element.appendChild(newItem);
  });
  count(todos);
};

elList.addEventListener("click", (e) => {
  if (e.target.matches(".list__btn")) {
    const btnId = e.target.dataset.todoId;
    const findIndexArr = todos.findIndex((todo) => todo.id == btnId);

    todos.splice(findIndexArr, 1);
    for (let i = 0; i < todos.length; i++) {
      todos[i].id = i + 1;
    }

    renderTodo(todos, elList);
  }
  if (e.target.matches(".list__checkbox")) {
    const inputCheckedId = e.target.dataset.todoId;
    const findElement = todos.find((todo) => todo.id == inputCheckedId);

    findElement.isCompleted = !findElement.isCompleted;

    renderTodo(todos, elList);
  }
});

elBtnAll.addEventListener("click", () => {
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
  }
  renderTodo(todos, elList);
});

elBtnComp.addEventListener("click", () => {
  const completedObject = todos.filter((todo) => todo.isCompleted);
  for (let i = 0; i < completedObject.length; i++) {
    completedObject[i].id = i + 1;
  }
  renderTodo(completedObject, elList);
});

elBtnUncomp.addEventListener("click", () => {
  const uncompletedObject = todos.filter((todo) => todo.isCompleted === false);
  for (let i = 0; i < uncompletedObject.length; i++) {
    uncompletedObject[i].id = i + 1;
  }
  renderTodo(uncompletedObject, elList);
});
const count = (arr) => {
  const completedObject = arr.filter((todo) => todo.isCompleted);
  const uncompletedObject = arr.filter((todo) => todo.isCompleted === false);

  elAllSpan.textContent = arr.length || 0;
  elCompSpan.textContent = completedObject?.length || 0;
  elUncompSpan.textContent = uncompletedObject?.length || 0;
};
