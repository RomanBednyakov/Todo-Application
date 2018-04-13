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

function TodoApplicationConstructor() {

    this.stateCheckbox = true;

    this.addedListTasks = function (list, flag) {
        if (flag === 'All'){
            this.deleteAllTasks(true);
            list.forEach(function (item) {
                todoView.addedTasks(item);
            });
            this.count(list.length);
        } else if (flag === 'Complete') {
            this.deleteAllTasks(true);
            let filteredList = [];
            list.forEach(function (item ,i) {
                if (item.isCompleted === true) {
                    filteredList.push(item);
                    todoView.addedTasks(item)
                }
            });
            this.count(filteredList.length);
        } else if (flag === 'Active') {
            this.deleteAllTasks(true);
            let filteredList = [];
            list.forEach(function (item ,i) {
                if (item.isCompleted === false) {
                    filteredList.push(item);
                    todoView.addedTasks(item)
                }
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

    // this.changeTextTask = function (e) {
    //     console.log('##',e);
    //     e.innerText = '';
    // };

    this.count = function (lenghList) {
        countTasks.textContent = 'Count :' + lenghList;
    };

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

    this.changeCompleted = function (e) {
        let index = this.indexTask(e);
        todoList[index].isCompleted = !todoList[index].isCompleted;
        todoView.changeStateCheckbox(e.target.parentNode, todoList[index].isCompleted);
        updateStorage.storage(todoList);
    };

    this.deleteTask = function (e) {
        let index = this.indexTask(e);
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
        todoModel.count(todoList.length);
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
        let _this = this;

        todoList.forEach(function (item, i) {
            item.isCompleted = _this.stateCheckbox;
        });

        allTasks.forEach(function (item) {
            todoView.changeStateCheckbox(item, _this.stateCheckbox);
        });

        allCheckbox.forEach(function (item) {
            todoView.changeViewCheckbox(item, _this.stateCheckbox);
        });
        updateStorage.storage(todoList);

        this.stateCheckbox = !this.stateCheckbox;
    }

}
let todoModel = new TodoApplicationConstructor();

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
           newText.setAttribute('class', newObjTask.id + ' ' + 'active');
       } else {
           newText.setAttribute('class', newObjTask.id);
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
todoModel.count(todoList.length);

button_added_js.addEventListener('click', function  () {
    if (newTask.value !== '') {
        let newObjTask = todoModel.newTask(newTask.value);
        todoList.push(newObjTask);
        todoView.addedTasks(newObjTask);
        todoModel.count(todoList.length);
        updateStorage.storage(todoList);
        newTask.value = '';
    }
});

listTasks.addEventListener('click', function  (e) {
    if (e.target.nodeName === 'BUTTON') {
        todoModel.deleteTask(e);
        todoModel.count(todoList.length);

    } else if (e.target.nodeName === 'INPUT') {
        todoModel.changeCompleted(e);

    }
    // else if (e.target.nodeName === 'P') {
    //     todoModel.changeTextTask(e)
    // }
});

checkAllTasks.addEventListener('click', function  () {
    todoModel.checkAllTasks();
});

deleteAllTasks.addEventListener('click', function  () {
    todoModel.deleteAllTasks();
});

allTasks.addEventListener('click', function  () {
    todoModel.addedListTasks(todoList, 'All')
});

completeTasks.addEventListener('click', function  () {
    todoModel.addedListTasks(todoList, 'Complete')
});

activeTasks.addEventListener('click', function  () {
    todoModel.addedListTasks(todoList, 'Active')
});
