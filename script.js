const taskForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTask(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = "";
});

function addTask(text, isCompleted = false) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>
  `;

  li.addEventListener("click", (e) => {
    if (!e.target.closest(".edit-btn") && !e.target.closest(".delete-btn")) {
      li.classList.toggle("completed");
      updateCompletionStatus(text);
    }
  });

  li.querySelector(".edit-btn").addEventListener("click", () => {
    const newText = prompt("Edite sua tarefa:", text);
    if (newText) {
      li.querySelector("span").textContent = newText;
      editTaskInLocalStorage(text, newText);
    }
  });


  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    removeTaskFromLocalStorage(text);
  });

  taskList.appendChild(li);
}
//____________ Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, isCompleted }) => addTask(text, isCompleted));
}


function saveTaskToLocalStorage(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, isCompleted: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function editTaskInLocalStorage(oldText, newText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.text === oldText);
  if (task) task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCompletionStatus(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.text === text);
  if (task) task.isCompleted = !task.isCompleted;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTaskFromLocalStorage(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((t) => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}
