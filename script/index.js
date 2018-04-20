function TodoList() {
    this.list = [];
    this.filterList = [];
    this.startPage = 0;
    this.stateCheckbox = true;
    this.isActive = false;
    this.stateFilter = false;
}
TodoList.prototype = {
    countList : function (lenghList) {
        elementInDom.countList.textContent = 'Count : ' + lenghList;
    },
    selectArrayList: function () {
        if (todoList.stateFilter) {
            return this.filterList;
        } else {
            return this.list;
        }
    }
};
let todoList = new TodoList();

function UpdateLocalStorage() {
    this.storage = function (todoList) {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
}
UpdateLocalStorage.prototype = {
    choiceArrayIsCompleted: function (state) {
        if(todoList.stateFilter) {
            todoList.list.forEach(function (item) {
                todoList.filterList.forEach(function (task) {
                    if (item.id === task.id) {
                        item.isCompleted = task.isCompleted;
                    }
                })
            });
            this.storage(todoList.list)
        } else {
            todoList.list.forEach(function (item) {
                item.isCompleted = state;
            });
            this.storage(todoList.list)
        }
    },
};
const updateStorage = new UpdateLocalStorage();

function ElementsInDom() {
    const searchElement = document.querySelector.bind(document);
    this.blockController = searchElement('.blockController_js');
    this.textNewTask = searchElement('.task_text_js');
    this.listTasks = searchElement('.list_tasks_js');
    this.countList = searchElement('.count_tasks_js');
    this.paginate = searchElement('.paginate_js');
}
ElementsInDom.prototype = {
    changeIdFilterButton: function (elem) {
       document.querySelector('#activeFilter').setAttribute('id', '');
       elem.setAttribute('id', 'activeFilter');
    }
};
const elementInDom = new ElementsInDom();