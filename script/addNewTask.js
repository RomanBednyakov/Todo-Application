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

let MyFunction = function () { this.lastResult };
MyFunction.prototype = {
  then: arg => this.lastResult = arg(this.lastResult),
  resolve: () => console.log(this.lastResult),
};
let cloneMyFunction = new MyFunction;
