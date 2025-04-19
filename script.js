let todos = [];
let isLatestFirst = true;

// Load todos from localStorage on page load
window.onload = function() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
};

function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();

    if (todoText === '') {
        alert('Please enter a task.');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(newTodo);

    input.value = '';

    saveTodosToLocalStorage();
    renderTodos();
}

function renderTodos() {
    const uncompletedList = document.getElementById('uncompletedList');
    const completedList = document.getElementById('completedList');
    const uncompletedCount = document.getElementById('uncompleted-count');
    const completedCount = document.getElementById('completed-count');

    uncompletedList.innerHTML = '';
    completedList.innerHTML = '';

    let sortedTodos = [...todos];
    if (isLatestFirst) {
        sortedTodos.sort((a, b) => b.id - a.id);
    } else {
        sortedTodos.sort((a, b) => a.id - b.id);
    }

    let uncompletedTasks = 0;
    let completedTasks = 0;

    sortedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            saveTodosToLocalStorage();
            renderTodos();
        });

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = "<i class='bx bx-trash'></i>";
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodosToLocalStorage();
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        if (todo.completed) {
            completedList.appendChild(li);
            completedTasks++;
        } else {
            uncompletedList.appendChild(li);
            uncompletedTasks++;
        }
    });

    uncompletedCount.textContent = uncompletedTasks;
    completedCount.textContent = completedTasks;
}

function toggleSort() {
    isLatestFirst = !isLatestFirst;
    const sortButton = document.querySelector('.sort-button');
    sortButton.innerHTML = isLatestFirst ? 'Sort by Oldest <i class="bx bx-sort"></i>' : 'Sort by Latest <i class="bx bx-sort"></i>';
    renderTodos();
}

function toggleSection(section) {
    const sectionContent = document.getElementById(section + '-section');
    if (sectionContent.classList.contains('expanded')) {
        sectionContent.classList.remove('expanded');
    } else {
        sectionContent.classList.add('expanded');
    }
}
