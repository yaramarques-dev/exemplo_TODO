document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks');

// Carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Adicionar tarefa ao DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.addEventListener('click', function() {
        removeTask(task);
        taskItem.remove();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Adicionar tarefa e salvar no localStorage
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value;
    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = '';
});

// Salvar tarefa no localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remover tarefa do localStorage
function removeTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Limpar todas as tarefas
clearTasksBtn.addEventListener('click', function() {
    localStorage.removeItem('tasks');
    taskList.innerHTML = '';
});
