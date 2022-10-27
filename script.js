const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", editDeleteCheck);
filterOption.addEventListener("input", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(event){
       event.preventDefault();
       const todoDiv = document.createElement("div");
       todoDiv.classList.add("todo");

       const newTodo = document.createElement("li");
       newTodo.innerText = todoInput.value;
       newTodo.classList.add("todo-item");
       todoDiv.appendChild(newTodo);

       saveLocalTodos(todoInput.value);

       const editButton = document.createElement("button");
       editButton.innerHTML = '<i class="fas fa-thin fa-pencil"></i>';
       editButton.classList.add("edit-btn");
       todoDiv.appendChild(editButton);

       const completeButton = document.createElement("button");
       completeButton.innerHTML = '<i class ="fas fa-check"></i>';
       completeButton.classList.add("complete-btn");
       todoDiv.appendChild(completeButton);

       const trashButton = document.createElement("button");
       trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
       trashButton.classList.add("trash-btn");
       todoDiv.appendChild(trashButton);

       todoList.appendChild(todoDiv);
       todoInput.value = "";
};

function editDeleteCheck(e){
       const item = e.target;
       if (item.classList[0] === "trash-btn"){
              const todo = item.parentElement;
              todo.classList.add("fall")
              removeLocalTodos(todo);
              todo.addEventListener("transitionend",function(){
                     todo.remove();
              });
       }
       if (item.classList[0] === "complete-btn"){
              const todo = item.parentElement;
              todo.classList.toggle("completed");
       }
}

function filterTodo(e){
       const todos = todoList.childNodes;
       todos.forEach(function (todo) {
              switch (e.target.value){
                     case "all":
                            todo.style.display = "flex"
                            break;
                     case "completed":
                            if(todo.classList.contains("completed")){
                                   todo.style.display = "flex";
                            } else {
                                   todo.style.display = "none";
                            }
                            break;
                     case "uncompleted":
                            if (!todo.classList.contains("completed")){
                                   todo.style.display = "flex";
                            } else {
                                   todo.style.display = "none";
                            }
                            break;
              }
       });
}
 function saveLocalTodos(todo){
       let todos;
       if(localStorage.getItem("todos") === null){
              todos = [];
       } else {
              todos = JSON.parse(localStorage.getItem("todos"))
       }
       todos.push(todo);
       localStorage.setItem("todos", JSON.stringify(todos));
 }

 function getTodos (){
       let todos;
       if(localStorage.getItem("todos") === null){
              todos = [];
       } else {
              todos = JSON.parse(localStorage.getItem("todos"))
       }
       todos.forEach(function (todo){
              const todoDiv = document.createElement("div");
              todoDiv.classList.add("todo");
       
              const newTodo = document.createElement("li");
              newTodo.innerText = todo;
              newTodo.classList.add("todo-item");
              todoDiv.appendChild(newTodo);
       
              const editButton = document.createElement("button");
              editButton.innerHTML = '<i class="fas fa-thin fa-pencil"></i>';
              editButton.classList.add("edit-btn");
              todoDiv.appendChild(editButton);
       
              const completeButton = document.createElement("button");
              completeButton.innerHTML = '<i class ="fas fa-check"></i>';
              completeButton.classList.add("complete-btn");
              todoDiv.appendChild(completeButton);
       
              const trashButton = document.createElement("button");
              trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
              trashButton.classList.add("trash-btn");
              todoDiv.appendChild(trashButton);
       
              todoList.appendChild(todoDiv);
       })
 }
 
 function removeLocalTodos(todo){
       let todos;
       if(localStorage.getItem("todos") === null){
              todos = [];
       } else {
              todos = JSON.parse(localStorage.getItem("todos"));
       }
       const todoIndex = todo.children[0].innerText;
       todos.splice(todos.indexOf(todoIndex), 1);
       localStorage.setItem("todos", JSON.stringify(todos));
 }