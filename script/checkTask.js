function ChangeCheckboxState() {}
ChangeCheckboxState.prototype = {
    changeState: function (e, id) {
        let index = filterAndSearchList.searchIdInTodoList(todoList.selectArrayList(), id);
        let indexGlobalList = filterAndSearchList.searchIdInTodoList(todoList.list, id);
        if(todoList.filterList.length > 0) {
            elementInDom.listTasks.removeChild(e.target.parentNode);
            todoList.filterList.splice(index, 1);
            controllerToAddPagination.conditionsFilter();
            todoList.list[indexGlobalList].isCompleted = !todoList.list[indexGlobalList].isCompleted;
            updateStorage.storage(todoList.list);
        } else {
            todoList.list[index].isCompleted = !todoList.list[index].isCompleted;
            this.changeStateCheckbox(e.target.parentNode, todoList.list[index].isCompleted);
            updateStorage.storage(todoList.list);
        }
        if (todoList.selectArrayList().length <= paginate.numberPerPage) {
            paginate.deleteAllLink()
        }
    },
    changeStateCheckbox: function (taskText, state) {
        if (state) {
            taskText.classList.add('active');
        } else {
            taskText.classList.remove('active');
        }
    }
};
let checkboxState = new ChangeCheckboxState();

function ChangeAllCheckboxState() {}
ChangeAllCheckboxState.prototype = {
    changeAllState: function () {
        let allTasks = document.querySelectorAll('ul > li');
        let allCheckbox = document.querySelectorAll('ul > li > input');
        let listTodo = todoList.selectArrayList();
        function isCompletedFlag(element) {
            return element.isCompleted !== true;
        }
        let state = todoList.stateCheckbox;
        state = listTodo.every(isCompletedFlag);
        listTodo.forEach(function (item) {
            item.isCompleted = state;
        });

        allTasks.forEach(function (item) {
            checkboxState.changeStateCheckbox(item, state);
        });

        allCheckbox.forEach(function (item) {
            item.checked = state;
        });
        updateStorage.choiceArrayIsCompleted(state);
        if (todoList.stateFilter) {
            deleteAllTask.removeAllTask(true);
            deleteAllTask.removePaginateLink();
            todoList.countList(0);
            todoList.filterList = [];
        }
        todoList.stateCheckbox = !todoList.stateCheckbox
    }
};
let changeCheckboxState = new ChangeAllCheckboxState();