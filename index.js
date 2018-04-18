let todoList = [];
let numberPerPage = 2;
let startPage = 0;

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
    this.paginate = document.querySelector('.paginate_js');
}
let searchElem = new SearchElemInDom();

function PaginationList() {

    this.count = function (list, flag) {
        if (flag) {
            this.filterTodoList(todoList, startPage);
        }
        let number = Math.ceil(list.length / numberPerPage);
        let arrLink = [];
        if (number > 1) {
            for (let page = 0; page < number; page++) {
                arrLink.push(page)
            }
        }
        this.renderPaginate(arrLink);
    };
    this.startProject = function (list) {
        if (list.length > numberPerPage) {
           let fistElem = document.querySelectorAll('.paginate_js > a')[0];
           fistElem.classList.add('class', 'ActiveTarget');
        }
    };

    this.deleteAllLink = function () {
        let arr = document.querySelectorAll('.paginate_js > a');
        arr.forEach(function (item) {
            searchElem.paginate.removeChild(item);
        });
    };

    this.removeClassLinkPaginate = function (target) {
        let arr = document.querySelectorAll('.paginate_js > a');
        arr.forEach(function (item) {
            item.classList.remove('ActiveTarget');
        });
        target.classList.add('class', 'ActiveTarget');
    };

    this.renderPaginate = function (arrLink) {
        this.deleteAllLink(true);
        let filteredList = arrLink.map(function (item) {
            return todoView.addedLinkPaginate(item);
        });
        todoView.renderAllLinkPaginate(filteredList);
    };

    this.filterTodoList = function (list, count) {
        let stepCount = count * 2;
        let newArr = list.slice(stepCount, stepCount === 0 ? 2 : stepCount + 2);
        todoConstructor.addedListTasks(newArr, true, false);
    };
}
let paginate = new PaginationList();

function TodoApplicationConstructor() {

    this.stateCheckbox = true;

    this.addedListTasks = function (list, flag, state) {
        if (state) {
            this.deleteAllTasks(true);
            let filteredList = [];
            let filteredListPaginate = [];
            list.forEach(function (item) {
                if ( item.isCompleted === flag ){
                    filteredList.push(todoView.addedTasks(item, true));
                    filteredListPaginate.push(item)
                }
            });
            paginate.count(filteredListPaginate);
            paginate.startProject(filteredListPaginate);
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
    };

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
        todoConstructor.count(todoList.length);
        let arr = document.querySelectorAll('ul > li');
        arr.forEach(function (item) {
            searchElem.listTasks.removeChild(item);
        });
        let arrPaginate = document.querySelectorAll('.paginate_js > a');
        arrPaginate.forEach(function (item) {
            searchElem.paginate.removeChild(item);
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
let todoConstructor = new TodoApplicationConstructor();

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

    this.renderAllLinkPaginate = function (list) {
        let fragment = document.createDocumentFragment();
        list.forEach(function (item) {
            fragment.appendChild(item);
        });
        searchElem.paginate.appendChild(fragment);
    };

    this.addedLinkPaginate = function (index) {
        let link = document.createElement('a');
        let textLink = document.createTextNode(index);
        link.appendChild(textLink);
        link.dataset.id = index;
        return link;
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
if (localStorage.getItem('todo') !== null) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    paginate.count(todoList, true);
    paginate.startProject(todoList);
}


searchElem.button_added_js.addEventListener('click', function  () {
    if (searchElem.newTask.value !== '') {
        let newObjTask = todoConstructor.newTask(searchElem.newTask.value);
        todoList.push(newObjTask);
        if (todoList.length <= numberPerPage) {
            todoView.addedTasks(newObjTask);
            todoConstructor.count(todoList.length);
        } else {
            paginate.count(todoList);
            paginate.startProject(todoList);
        }
        updateStorage.storage(todoList);
        searchElem.newTask.value = '';
    }
});

searchElem.listTasks.addEventListener('click', function  (e) {
    if (e.target.nodeName === 'BUTTON') {
        todoConstructor.deleteTask(e);
        todoConstructor.count(todoList.length);

    } else if (e.target.nodeName === 'INPUT') {
        todoConstructor.changeCompleted(e);

    }
    // else if (e.target.nodeName === 'P') {
    //     todoConstructor.changeTextTask(e)
    // }
});

searchElem.checkAllTasks.addEventListener('click', function  () {
    todoConstructor.checkAllTasks();
});

searchElem.deleteAllTasks.addEventListener('click', function  () {
    todoConstructor.deleteAllTasks();
});

searchElem.allTasks.addEventListener('click', function  () {
    paginate.count(todoList, true);
    paginate.startProject(todoList);
    // todoConstructor.addedListTasks(todoList, true, false)
});

searchElem.completeTasks.addEventListener('click', function  () {
    todoConstructor.addedListTasks(todoList, true, true)
});

searchElem.activeTasks.addEventListener('click', function  () {
    todoConstructor.addedListTasks(todoList, false, true)
});

searchElem.paginate.addEventListener('click', function  (e) {

    if (e.target.dataset.id) {
        paginate.removeClassLinkPaginate(e.target);
        paginate.filterTodoList(todoList, e.target.dataset.id)
    }
});
