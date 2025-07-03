interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// DOM Elements
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const newTaskInput = document.getElementById("new-task") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

// State
let todos: Todo[] = loadTodos();
let dragSrcIndex: number | null = null;

// Load from localStorage
function loadTodos(): Todo[] {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
}

// Save to localStorage
function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render all tasks
function renderTodos(): void {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.dataset.index = index.toString();

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", () => toggleTodo(todo.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);

    addDragEvents(li);

    todoList.appendChild(li);
  });
}

// Add new task
function addTodo(text: string): void {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

// Toggle completion
function toggleTodo(id: number): void {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

// Delete task
function deleteTodo(id: number): void {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

// Form submission
todoForm.addEventListener("submit", (e: SubmitEvent): void => {
  e.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    addTodo(taskText);
    newTaskInput.value = "";
  }
});

// === DRAG & DROP ===

function addDragEvents(li: HTMLLIElement): void {
  li.addEventListener("dragstart", (): void => {
    dragSrcIndex = parseInt(li.dataset.index ?? "", 10);
    li.classList.add("dragging");
  });

  li.addEventListener("dragover", (e: DragEvent): void => {
    e.preventDefault();
    li.classList.add("drag-over");
  });

  li.addEventListener("dragleave", (): void => {
    li.classList.remove("drag-over");
  });

  li.addEventListener("drop", (): void => {
    li.classList.remove("drag-over");

    if (dragSrcIndex === null) return;
    const dropIndex = parseInt(li.dataset.index ?? "", 10);

    if (dropIndex === dragSrcIndex) return;

    const draggedItem = todos[dragSrcIndex];
    todos.splice(dragSrcIndex, 1);
    todos.splice(dropIndex, 0, draggedItem);

    dragSrcIndex = null;
    saveTodos();
    renderTodos();
  });

  li.addEventListener("dragend", (): void => {
    li.classList.remove("dragging");
  });
}

// Initial Render
renderTodos();
