function ControllerToAddPagination() {}
ControllerToAddPagination.prototype = {
    conditionsTask: function () {
        if (todoList.selectArrayList().length < paginate.numberPerPage) {
            render.renderTask(todoList.selectArrayList(), todoList.startPage);
            deleteAllTask.removePaginateLink()
        } else {
            render.renderTask(todoList.selectArrayList(), todoList.startPage);
            paginate.countPaginate(todoList.selectArrayList());
            paginate.fistPage();
        }
    },
    conditionsList: function () {
        if (todoList.list.length <= paginate.numberPerPage) {
            render.renderTask(todoList.list, todoList.startPage);
        } else {
            render.renderTask(todoList.list, todoList.startPage);
            paginate.countPaginate(todoList.list);
            paginate.fistPage();
        }
    },
    conditionsFilter: function () {
        if (todoList.filterList.length <= paginate.numberPerPage) {
            render.renderTask(todoList.filterList, todoList.startPage);
        } else {
            render.renderTask(todoList.filterList, todoList.startPage);
            paginate.countPaginate(todoList.filterList);
            paginate.fistPage();
        }
    },
};
let controllerToAddPagination = new ControllerToAddPagination();