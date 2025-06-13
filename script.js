// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.textContent.replace('Remove', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is not provided, get it from input
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // Check if the task text is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click event to remove button
        removeButton.onclick = function() {
            taskList.removeChild(li);
            if (save) {
                saveTasks();
            }
        };

        // Append remove button to list item
        li.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(li);

        // Clear the input field if this was a new task
        if (save) {
            taskInput.value = '';
            saveTasks();
        }
    }

    // Add click event listener to the Add Task button
    addButton.addEventListener('click', () => addTask());

    // Add keypress event listener to the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when the page loads
    loadTasks();
}); 