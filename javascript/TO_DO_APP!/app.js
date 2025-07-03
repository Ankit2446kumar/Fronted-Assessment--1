var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// DOM Elements
var todoForm = document.getElementById("todo-form");
var newTaskInput = document.getElementById("new-task");
var todoList = document.getElementById("todo-list");
// State
var todos = loadTodos();
var dragSrcIndex = null;
// Load from localStorage
function loadTodos() {
    var data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}
// Save to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Render all tasks
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(function (todo, index) {
        var li = document.createElement("li");
        li.setAttribute("draggable", "true");
        li.dataset.index = index.toString();
        var span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.completed) {
            span.classList.add("completed");
        }
        span.addEventListener("click", function () { return toggleTodo(todo.id); });
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", function () { return deleteTodo(todo.id); });
        li.appendChild(span);
        li.appendChild(deleteBtn);
        addDragEvents(li);
        todoList.appendChild(li);
    });
}
// Add new task
function addTodo(text) {
    var newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
}
// Toggle completion
function toggleTodo(id) {
    todos = todos.map(function (todo) {
        return todo.id === id ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo;
    });
    saveTodos();
    renderTodos();
}
// Delete task
function deleteTodo(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    saveTodos();
    renderTodos();
}
// Form submission
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        addTodo(taskText);
        newTaskInput.value = "";
    }
});
// === DRAG & DROP ===
function addDragEvents(li) {
    li.addEventListener("dragstart", function () {
        var _a;
        dragSrcIndex = parseInt((_a = li.dataset.index) !== null && _a !== void 0 ? _a : "", 10);
        li.classList.add("dragging");
    });
    li.addEventListener("dragover", function (e) {
        e.preventDefault();
        li.classList.add("drag-over");
    });
    li.addEventListener("dragleave", function () {
        li.classList.remove("drag-over");
    });
    li.addEventListener("drop", function () {
        var _a;
        li.classList.remove("drag-over");
        if (dragSrcIndex === null)
            return;
        var dropIndex = parseInt((_a = li.dataset.index) !== null && _a !== void 0 ? _a : "", 10);
        if (dropIndex === dragSrcIndex)
            return;
        var draggedItem = todos[dragSrcIndex];
        todos.splice(dragSrcIndex, 1);
        todos.splice(dropIndex, 0, draggedItem);
        dragSrcIndex = null;
        saveTodos();
        renderTodos();
    });
    li.addEventListener("dragend", function () {
        li.classList.remove("dragging");
    });
}
// Initial Render
renderTodos();
