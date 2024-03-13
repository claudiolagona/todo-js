const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

const storageKey = 'ToDos';

let activities = [];

const storage = localStorage.getItem(storageKey);

if(storage) {
    activities = JSON.parse(storage);
}

showContent();

button.addEventListener('click', () => {
    addActivity();
})

function showContent () {
    todoList.innerText = '';
    emptyListMessage.innerText = '';
    if(activities.length > 0) {
        activities.forEach((activity) => {
            const template = createActivityTemplate(activity);
            todoList.innerHTML += template;
        })
        makeChangeCliccable();
    } else {
        emptyListMessage.innerText = 'There are no activity';
    }
}

function makeChangeCliccable () {
    const checks = document.querySelectorAll('.todo-check');
        checks.forEach((check, index) => {
            check.addEventListener('click', () => {
                activities.splice(index, 1);
                localStorage.setItem(storageKey, JSON.stringify(activities));
                showContent();
            })
        })
}

function addActivity () {
    const newActivity = inputField.value.trim();
    if(newActivity.length > 0) {
        activities.push(newActivity);
        localStorage.setItem(storageKey, JSON.stringify(activities));
        showContent();
        inputField.value = '';
    }
}

function createActivityTemplate (activity) {
    return `
        <li class="todo-item">
            <div class="todo-check">
                <img src="./images/check.svg" alt="Check Icon">
            </div>
            <p class="todo-text">${activity}</p>
        </li>`;
}