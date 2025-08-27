// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const taskCount = document.getElementById("taskCount");
const emptyMsg = document.getElementById("emptyMsg");

let tasks = [];

// Load tasks from localStorage
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks = JSON.parse(saved);
  render();
};

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = "";
  saveTasks();
  render();
});

// Handle Enter key
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addBtn.click();
});

// Toggle complete & delete
function toggleComplete(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
});

// Render list
function render() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  taskCount.textContent = `${tasks.length} tasks`;
}
