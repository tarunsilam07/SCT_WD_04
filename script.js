const taskInput = document.getElementById('task-name');
const taskDate = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    const content = item.querySelector('div').textContent.split(' - ');
    const completed = item.classList.contains('completed');
    tasks.push({ name: content[0], time: content[1], completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = createTaskItem(task.name, task.time, task.completed);
    taskList.appendChild(taskItem);
  });
}

function createTaskItem(taskName, taskTime, isCompleted = false) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  if (isCompleted) taskItem.classList.add('completed');

  const taskContent = document.createElement('div');
  taskContent.textContent = `${taskName} - ${taskTime}`;

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const completeButton = document.createElement('button');
  completeButton.textContent = '✔';
  completeButton.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    saveTasksToLocalStorage();
  });

  const editButton = document.createElement('button');
  editButton.textContent = '✏';
  editButton.addEventListener('click', () => {
    taskInput.value = taskName;
    taskDate.value = new Date(taskTime).toISOString().slice(0, 16);
    taskItem.remove();
    saveTasksToLocalStorage();
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑';
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
    saveTasksToLocalStorage();
  });

  taskActions.appendChild(completeButton);
  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);

  taskItem.appendChild(taskContent);
  taskItem.appendChild(taskActions);

  return taskItem;
}

addTaskButton.addEventListener('click', () => {
  const taskName = taskInput.value.trim();
  const taskTime = taskDate.value;
  if (taskName && taskTime) {
    const taskItem = createTaskItem(taskName, new Date(taskTime).toLocaleString());
    taskList.appendChild(taskItem);
    saveTasksToLocalStorage();
    taskInput.value = '';
    taskDate.value = '';
  }
});

window.addEventListener('load', loadTasksFromLocalStorage);
