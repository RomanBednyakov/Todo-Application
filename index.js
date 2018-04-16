let todoList = [];
    // button_added_js = document.querySelector('.button_added_js'),
    // newTask = document.querySelector('.task_text_js'),
    // listTasks = document.querySelector('.list_tasks_js'),
    // deleteAllTasks = document.querySelector('.delete_all_tasks_js'),
    // checkAllTasks = document.querySelector('.check_all_tasks_js'),
    // countTasks = document.querySelector('.count_tasks_js'),
    // activeTasks = document.querySelector('.active_tasks_js'),
    // completeTasks = document.querySelector('.complete_tasks_js'),
    // allTasks = document.querySelector('.all_tasks_js');

function UpdateLocalStorage() {
    this.storage = function (todoList) {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
}
let updateStorage = new UpdateLocalStorage();

function SearchElemInDom() {
    this.button_added_js = document.querySelector('.button_added_js');
    this.newTask = document.querySelector('.task_text_js');
    this.listTasks = document.querySelector('.list_tasks_js');
    this.deleteAllTasks = document.querySelector('.delete_all_tasks_js');
    this.checkAllTasks = document.querySelector('.check_all_tasks_js');
    this.countTasks = document.querySelector('.count_tasks_js');
    this.activeTasks = document.querySelector('.active_tasks_js');
    this.completeTasks = document.querySelector('.complete_tasks_js');
    this.allTasks = document.querySelector('.all_tasks_js');
}
let searchElem = new SearchElemInDom();

function TodoApplicationConstructor() {

    this.stateCheckbox = true;

    this.addedListTasks = function (list, flag, state) {
        if (state) {
            this.deleteAllTasks(true);
            let filteredList = [];
            list.forEach(function (item) {
                if ( item.isCompleted === flag ){
                    filteredList.push(todoView.addedTasks(item, true));
                }
            });
            todoView.renderAllTasks(filteredList);
            this.count(filteredList.length);
        } else {
            flag ? this.deleteAllTasks(true) : '';
            let filteredList = list.map(function (item) {
                return todoView.addedTasks(item, true);
            });
            todoView.renderAllTasks(filteredList);
            this.count(list.length);
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
        searchElem.countTasks.textContent = 'Count :' + lenghList;
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
                searchElem.listTasks.removeChild(item);
            });
        } else {
        todoList.splice(0);
        todoModel.count(todoList.length);
        let arr = document.querySelectorAll('ul > li');
        arr.forEach(function (item) {
            searchElem.listTasks.removeChild(item);
        });
        updateStorage.storage(todoList)
        }
    };

    this.checkAllTasks = function () {
        let allTasks = document.querySelectorAll('ul > li');
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
        searchElem.listTasks.removeChild(e.target.parentNode);
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

    this.renderAllTasks = function (list) {
        let fragment = document.createDocumentFragment();
        list.forEach(function (item) {
            fragment.appendChild(item);
        });
        searchElem.listTasks.appendChild(fragment);
    };

    this.addedTasks = function (newObjTask, flag) {
       let newLi = document.createElement('li');
       let newText = document.createElement('p');
       let newButton = document.createElement('button');
       let newCheckbox = document.createElement('INPUT');

       let textLi = document.createTextNode(newObjTask.textTasks);
       let textButton = document.createTextNode('delete');

       if (newObjTask.isCompleted) {
           this.changeStateCheckbox(newLi, newObjTask.isCompleted);
           newLi.setAttribute('class','active');
       }

       newCheckbox.setAttribute('type', 'checkbox');
       newCheckbox.setAttribute('class', newObjTask.id);
       newCheckbox.checked = newObjTask.isCompleted;
       newText.setAttribute('class', newObjTask.id);
       newButton.setAttribute('class', newObjTask.id);

       newText.appendChild(textLi);
       newButton.appendChild(textButton);

       newLi.appendChild(newCheckbox);
       newLi.appendChild(newText);
       newLi.appendChild(newButton);
       if (flag) {
          return newLi
       } else {
           searchElem.listTasks.insertBefore(newLi, searchElem.listTasks.children[0]);
       }
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

searchElem.button_added_js.addEventListener('click', function  () {
    if (searchElem.newTask.value !== '') {
        let newObjTask = todoModel.newTask(searchElem.newTask.value);
        todoList.push(newObjTask);
        todoView.addedTasks(newObjTask);
        todoModel.count(todoList.length);
        updateStorage.storage(todoList);
        searchElem.newTask.value = '';
    }
});

searchElem.listTasks.addEventListener('click', function  (e) {
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

searchElem.checkAllTasks.addEventListener('click', function  () {
    todoModel.checkAllTasks();
});

searchElem.deleteAllTasks.addEventListener('click', function  () {
    todoModel.deleteAllTasks();
});

searchElem.allTasks.addEventListener('click', function  () {
    todoModel.addedListTasks(todoList, true, false)
});

searchElem.completeTasks.addEventListener('click', function  () {
    todoModel.addedListTasks(todoList, true, true)
});

searchElem.activeTasks.addEventListener('click', function  () {
    todoModel.addedListTasks(todoList, false, true)
});
