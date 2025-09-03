// References to UI elements
const input = document.querySelector('input');
const addBtn = document.querySelector('button');
const taskList = document.getElementById('task-list');

// Tasks array (persisted in localStorage)
let tasks = JSON.parse(localStorage.getItem('task array')) || [];

// Initial rendering of tasks
renderTasks();

// Add new task on button click
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) {
    alert("Please enter a task.");
    return;
  }
  const newTask = { id: Date.now(), text };
  tasks.push(newTask);
  localStorage.setItem('task array', JSON.stringify(tasks));
  renderTasks();
  input.value = '';
});

// Render tasks function
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(({ id, text }) => {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';
    todoDiv.innerHTML = `
      <span class="task" contenteditable="false">${text}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;
    function displayTaskList() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="checkbox" onchange="markTaskComplete(${i})" ${task.completed ? 'checked' : ''}>
      <div class="${task.completed ? 'task-text completed' : 'task-text'}">${task.text}</div>
      <div class="icons">
        <span class="edit-icon" onclick="editTask(${i})">✏️</span>
        <span class="delete-icon" onclick="deleteTask(${i})">🗑️</span>
      </div>
    `;
    taskList.appendChild(li);
  });
}

    const editBtn = todoDiv.querySelector('.edit');
    const deleteBtn = todoDiv.querySelector('.delete');
    const taskSpan = todoDiv.querySelector('.task');

    // Delete handler
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(task => task.id !== id);
      localStorage.setItem('task array', JSON.stringify(tasks));
      renderTasks();
    });

    // Edit/Save toggle handler
    editBtn.addEventListener('click', () => {
      if (editBtn.innerText === 'Edit') {
        taskSpan.setAttribute('contenteditable', 'true');
        taskSpan.focus();
        editBtn.innerText = 'Save';
      } else {
        taskSpan.setAttribute('contenteditable', 'false');
        const updated = taskSpan.innerText.trim();
        if (updated) {
          tasks = tasks.map(task =>
            task.id === id ? { ...task, text: updated } : task
          );
          localStorage.setItem('task array', JSON.stringify(tasks));
          renderTasks();
        }
        editBtn.innerText = 'Edit';
      }
    });

    taskList.appendChild(todoDiv);
  });
}

