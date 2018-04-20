function FilterAllTask() {}
FilterAllTask.prototype = {
    filterAll: function () {
        todoList.filterList = [];
        todoList.isActive = false;
        todoList.stateFilter = false;
        controllerToAddPagination.conditionsTask();
        elementInDom.changeIdFilterButton(document.querySelector('.all_tasks_js'));
    }
};
let filterAllTask = new FilterAllTask();

function FilterActiveCompletedTask() {}
FilterActiveCompletedTask.prototype = {
    filterActiveAndCompleted: function (state) {
        todoList.filterList = [];
        todoList.isActive = state;
        todoList.stateFilter = true;
        let arrayFilter = [];
        todoList.list.forEach(function (item) {
            if (item.isCompleted === state) {
                arrayFilter.push(item)
            }
        });
        if(arrayFilter.length > 0) {
            todoList.filterList = arrayFilter;
            controllerToAddPagination.conditionsTask();
        } else {
            deleteAllTask.removeViewTask();
            deleteAllTask.removePaginateLink();
            todoList.countList(0);
        }
        if (state) {
            elementInDom.changeIdFilterButton(document.querySelector('.complete_tasks_js'));
        } else {
            elementInDom.changeIdFilterButton(document.querySelector('.active_tasks_js'));
        }
    }
};
let filterActiveCompletedTask = new FilterActiveCompletedTask();

function FilterAndSearchList() {}
FilterAndSearchList.prototype = {
    filterTodoList: function (filterList, count) {
        let numberPage = paginate.numberPerPage;
        let stepCount = count * numberPage;
        return filterList.slice(stepCount, stepCount === 0 ? numberPage : stepCount + numberPage);
    },
    searchIdInTodoList: function (array ,idTask) {
        let id = Number(idTask);
        let index = 0;
        array.forEach(function(item, i) {
            if (item.id === id) {
                index = i
            }
        });
        return index
    },
};
let filterAndSearchList = new FilterAndSearchList()