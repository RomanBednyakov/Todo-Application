function NewTask() {}
NewTask.prototype = {
    addTask: function () {
        const newObjTask = {
            isCompleted: todoList.isActive,
            textTasks: elementInDom.textNewTask.value,
            id: Date.now(),
            delete: false,
        };
        todoList.selectArrayList().unshift(newObjTask);
        if(todoList.stateFilter) {
            todoList.list.unshift(newObjTask);
        }
        controllerToAddPagination.conditionsTask();
        updateStorage.storage(todoList.list);
        elementInDom.textNewTask.value = '';
    },
};
const addNewTask = new NewTask();

