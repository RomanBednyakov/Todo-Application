if (localStorage.getItem('todo') !== null && localStorage.getItem('todo').length > 0) {
    todoList.list = JSON.parse(localStorage.getItem('todo'));
    controllerToAddPagination.conditionsList();
    todoList.filterList = [];
}
document.querySelector('.all_tasks_js').setAttribute('id', 'activeFilter');
elementInDom.blockController.addEventListener('click', function  (e) {
    switch (e.target.className) {
        case 'button_added_js':
            if (elementInDom.textNewTask.value !== '') {
                addNewTask.addTask();
            }
            break;

        case 'delete_all_tasks_js':
            deleteAllTask.removeAllTask();
            break;

        case 'delete_tasks_js':
            deleteTask.removeTask(e ,e.target.id);
            break;

        case 'checkbox_tasks_js':
            checkboxState.changeState(e, e.target.id);
            break;

        case 'link_paginate_js':
            paginate.controllerLink(e);
            break;

        case 'check_all_tasks_js':
            changeCheckboxState.changeAllState();
            break;

        case 'all_tasks_js':
            filterAllTask.filterAll();
            break;

        case 'active_tasks_js':
            filterActiveCompletedTask.filterActiveAndCompleted(false);
            break;

        case 'complete_tasks_js':
            filterActiveCompletedTask.filterActiveAndCompleted(true);
            break;
    }
});