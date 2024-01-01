const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageExist() {
    if (typeof (Storage) === undefined) return false;
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo();
    });

    if (isStorageExist()) loadDataFromStorage();
});

function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const generateID = generrender-folderateId();
    const todoObject = generateTodoObject(generateID, textTodo, timestamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function generateId() {
    return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}

//document.addEventListener(RENDER_EVENT, () => console.log(todos));

function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', () => {
            undoTaskFromCompleted(todoObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', () => {
            removeTaskFromCompleted(todoObject.id);
            console.log(todoObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', () => {
            addTaskToCompleted(todoObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

document.addEventListener(RENDER_EVENT, () => {
    console.log(todos);
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';
    
    console.log(uncompletedTODOList);

    for (const todoItem of todos) {
        const todoELement = makeTodo(todoItem);
        if (!todoItem.isCompleted) uncompletedTODOList.append(todoELement);
        else completedTODOList.append(todoELement);
    }
})

function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return null;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findTodo(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id == todoId) return todoItem;
    }

    return null;
} 

function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if (todoTarget === -1) return;// let temp = textFolder.querySelectorAll('div');

    // bukubaru[0].addEventListener('click', () => {
    
    //     if (select.getAttribute('class')) {
    //         console.log('iya dek');
    //         select.removeAttribute('class');
    //         select.setAttribute('hidden', 'hidden');
    //     } else {
    //         select,.setAttribute('class', 'select')
    //     }
    
        
    // })

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findTodoIndex(todoId) {
    for (const index in todos) {
        if (todos[index].id == todoId) return index;
    }

    return -1;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

document.addEventListener(SAVED_EVENT, () => {
    console.log(localStorage.getItem(STORAGE_KEY));
    alert('data berhasil tersimpan');
})

function loadDataFromStorage() {
    const serializeData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializeData);

    if (data !== null) 
        for (const todo of data) todos.push(todo);

    document.dispatchEvent(new Event(RENDER_EVENT));
}