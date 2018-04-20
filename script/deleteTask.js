function DeleteAllTask() {}
DeleteAllTask.prototype = {
    removeAllTask: function (removeLi) {
        if (removeLi) {
            this.removeViewTask();
        } else {
            todoList.list.splice(0);
            todoList.countList(todoList.list.length);
            this.removeViewTask();
            this.removePaginateLink();
            updateStorage.storage(todoList.list)
        }
    },
    removeViewTask : function () {
        let arr = document.querySelectorAll('ul > li');
        arr.forEach(function (item) {
            elementInDom.listTasks.removeChild(item);
        });
    },
    removePaginateLink: function () {
        let arrPaginate = document.querySelectorAll('.paginate_js > a');
        arrPaginate.forEach(function (item) {
            elementInDom.paginate.removeChild(item);
        });
    }
};
let deleteAllTask = new DeleteAllTask();

function DeleteTask() {}
DeleteTask.prototype = {
    removeTask: function (e ,id) {
        let index = filterAndSearchList.searchIdInTodoList(todoList.selectArrayList(), id);
        let indexGlobalList = filterAndSearchList.searchIdInTodoList(todoList.list, id);
        elementInDom.listTasks.removeChild(e.target.parentNode);
        todoList.selectArrayList().splice(index, 1);
        if(todoList.stateFilter) {
            todoList.list.splice(indexGlobalList, 1);
        }
        updateStorage.storage(todoList.list);
        controllerToAddPagination.conditionsTask();
        if (todoList.selectArrayList().length <= paginate.numberPerPage) {
            paginate.deleteAllLink()
        }
    }
};
let deleteTask = new DeleteTask();