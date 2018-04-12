let todoList = [];
let button_added_js = document.querySelector(".button_added_js");
let newTask = document.querySelector(".task_text_js");
let listTasks = document.querySelector(".list_tasks_js");

function UpdateLocalStorage() {
    this.storage = function (todoList) {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
}
let updateStorage = new UpdateLocalStorage();

function SearchIndexTask () {
    this.indexTask = function (e) {
        let id = Number(e.target.className);
        let index = 0;
        todoList.forEach(function(item, i) {
            if (item.id === id) {
                index = i
            }
        });
        return index
    }
}
let indexTask = new SearchIndexTask();

function TodoApplicationActions() {
    this.newTask = function (textTask) {
        return {
            isCompleted: false,
            textTasks: textTask,
            id: Date.now(),
            delete: false,
        }
    };
    this.changeCompleted = function (e) {
        let index = indexTask.indexTask(e);
        todoList[index].isCompleted = !todoList[index].isCompleted;
        todoView.changeStateCheckbox(e, todoList[index].isCompleted);
        updateStorage.storage(todoList);
    };
    this.deleteTask = function (e) {
        let index = indexTask.indexTask(e);
        todoView.deleteTaskView(e);
        todoList.splice(index,1);
        updateStorage.storage(todoList);
    }
}
let todoActions = new TodoApplicationActions();

function TodoApplicationView() {

    this.deleteTaskView = function (e) {
        listTasks.removeChild(e.target.parentNode);
    };

    this.changeStateCheckbox = function (e, state) {
        let taskText = e.target.nextElementSibling;
        if (state) {
            taskText.classList.add('active');
        } else {
            taskText.classList.remove("active");
        }
    };

    this.addedTasks = function (newObjTask) {

       let newLi = document.createElement('li');
       let newText = document.createElement('p');
       let newButton = document.createElement('button');
       let newCheckbox = document.createElement("INPUT");

       let textLi = document.createTextNode(newObjTask.textTasks);
       let textButton = document.createTextNode('delete');

       if (newObjTask.isCompleted) {
           newText.setAttribute('class', 'active');
       }

       newCheckbox.setAttribute('type', 'checkbox');
       newCheckbox.setAttribute('class', newObjTask.id);
       newCheckbox.checked = newObjTask.isCompleted;
       newButton.setAttribute('class', newObjTask.id);

       newText.appendChild(textLi);
       newButton.appendChild(textButton);

       listTasks.insertBefore(newLi, listTasks.children[0]);
       newLi.appendChild(newCheckbox);
       newLi.appendChild(newText);
       newLi.appendChild(newButton);
    }
}
let todoView = new TodoApplicationView();

if (localStorage.getItem('todo') !== undefined) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    todoList.forEach(function (item, i) {
        todoView.addedTasks(item);
    })
}

button_added_js.addEventListener("click", function  () {
    let newObjTask = todoActions.newTask(newTask.value);
    todoList.push(newObjTask);
    todoView.addedTasks(newObjTask);
    updateStorage.storage(todoList);
    newTask.value = '';
});

listTasks.addEventListener("click", function  (e) {
    if (e.target.nodeName === 'BUTTON') {
        todoActions.deleteTask(e)
    } else if (e.target.nodeName === 'INPUT') {
        todoActions.changeCompleted(e);
    }
});
