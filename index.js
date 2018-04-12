let todoList = [];
let button_added_js = document.querySelector('.button_added_js');
let newTask = document.querySelector('.task_text_js');
let listTasks = document.querySelector('.list_tasks_js');
let deleteAllTasks = document.querySelector('.delete_all_tasks_js');
let checkAllTasks = document.querySelector('.check_all_tasks_js');

let countTasks = document.querySelector('.count_tasks_js');
let activeTasks = document.querySelector('.active_tasks_js');
let completeTasks = document.querySelector('.complete_tasks_js');
let allTasks = document.querySelector('.all_tasks_js');

function UpdateLocalStorage() {
    this.storage = function (todoList) {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
}
let updateStorage = new UpdateLocalStorage();

function State() {
    this.stateCheckbox = true;

}
let state = new State;

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

function TodoApplicationModel() {

    this.addedListTasks = function (list, flag) {
        if (flag === 'All'){
            this.deleteAllTasks(true);
            list.forEach(function (item) {
                todoView.addedTasks(item)
            });
            this.count(list.length);

        } else if (flag === 'Complete') {
            this.deleteAllTasks(true);
            let filteredList = list.filter(function (i) {
                return i.isCompleted === true
            });
            filteredList.forEach(function (item) {
                todoView.addedTasks(item)
            });
            this.count(filteredList.length);

        } else if (flag === 'Active') {
            this.deleteAllTasks(true);
            let filteredList = list.filter(function (i) {
                return i.isCompleted === false
            });
            filteredList.forEach(function (item) {
                todoView.addedTasks(item)
            });
            this.count(filteredList.length);

        } else {
            list.forEach(function (item) {
               todoView.addedTasks(item);
            })

        }
    };

    this.newTask = function (textTask) {
        return {
            isCompleted: false,
            textTasks: textTask,
            id: Date.now(),
            delete: false,
        }
    };

    this.count = function (lenghtList) {
        countTasks.innerText = 'Count :' + lenghtList; // >>^^^^!!!
        // countTasks.appendChild(document.createTextNode('Count :' + lenghtList));
    };

    this.changeCompleted = function (e) {
        let index = indexTask.indexTask(e);
        todoList[index].isCompleted = !todoList[index].isCompleted;
        todoView.changeStateCheckbox(e.target.parentNode, todoList[index].isCompleted);
        updateStorage.storage(todoList);
    };

    this.deleteTask = function (e) {
        let index = indexTask.indexTask(e);
        todoView.deleteTaskView(e);
        todoList.splice(index,1);
        updateStorage.storage(todoList);
    };

    this.deleteAllTasks = function (flag) {
        if (flag) {
            let arr = document.querySelectorAll('ul > li');
            arr.forEach(function (item) {
                listTasks.removeChild(item);
            });
        } else {
        todoList.splice(0);
        todoActions.count(todoList.length);
        let arr = document.querySelectorAll('ul > li');
        arr.forEach(function (item) {
            listTasks.removeChild(item);
        });
        updateStorage.storage(todoList)
        }
    };

    this.checkAllTasks = function () {
        let allTasks = document.querySelectorAll('ul > li > p');
        let allCheckbox = document.querySelectorAll('ul > li > input');

        todoList.forEach(function (item, i) {
            item.isCompleted = state.stateCheckbox;
        });

        allTasks.forEach(function (item) {
            todoView.changeStateCheckbox(item, state.stateCheckbox);
        });

        allCheckbox.forEach(function (item) {
            todoView.changeViewCheckbox(item, state.stateCheckbox);
        });
        updateStorage.storage(todoList);

        state.stateCheckbox = !state.stateCheckbox;
    }

}
let todoActions = new TodoApplicationModel();

function TodoApplicationView() {

    this.deleteTaskView = function (e) {
        listTasks.removeChild(e.target.parentNode);
    };

    this.changeStateCheckbox = function (taskText, state) {
        if (state) {
            taskText.classList.add('active');
        } else {
            taskText.classList.remove('active');
        }
    };

    this.changeViewCheckbox = function (checkbox, state) {
         checkbox.checked = state;
    };

    this.addedTasks = function (newObjTask) {
       let newLi = document.createElement('li');
       let newText = document.createElement('p');
       let newButton = document.createElement('button');
       let newCheckbox = document.createElement('INPUT');

       let textLi = document.createTextNode(newObjTask.textTasks);
       let textButton = document.createTextNode('delete');

       if (newObjTask.isCompleted) {
           this.changeStateCheckbox(newText,newObjTask.isCompleted);
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
todoActions.count(todoList.length);

button_added_js.addEventListener('click', function  () {
    if (newTask.value !== '') {
        let newObjTask = todoActions.newTask(newTask.value);
        todoList.push(newObjTask);
        todoView.addedTasks(newObjTask);
        todoActions.count(todoList.length);
        updateStorage.storage(todoList);
        newTask.value = '';
    }
});

listTasks.addEventListener('click', function  (e) {
    if (e.target.nodeName === 'BUTTON') {
        console.log('##',e);
        todoActions.deleteTask(e);
        todoActions.count(todoList.length);
    } else if (e.target.nodeName === 'INPUT') {
        todoActions.changeCompleted(e);
    }
});

checkAllTasks.addEventListener('click', function  () {
    todoActions.checkAllTasks();
});

deleteAllTasks.addEventListener('click', function  () {
    todoActions.deleteAllTasks();
});

allTasks.addEventListener('click', function  () {
    todoActions.addedListTasks(todoList, 'All')
});

completeTasks.addEventListener('click', function  () {
    todoActions.addedListTasks(todoList, 'Complete')
});

activeTasks.addEventListener('click', function  () {
    todoActions.addedListTasks(todoList, 'Active')
});
