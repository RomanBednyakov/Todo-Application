function Render() {}
Render.prototype = {
    createTask: function (newObjTask) {
        const createElement = document.createElement.bind(document);
        const newLi = createElement('li');
        const newText = createElement('p');
        const newButtonDelete = createElement('button');
        const newCheckbox = createElement('INPUT');

        const textLi = document.createTextNode(newObjTask.textTasks);
        const textButton = document.createTextNode('delete');

        if (newObjTask.isCompleted) {
            checkboxState.changeStateCheckbox(newLi, newObjTask.isCompleted);
            newLi.setAttribute('class','active');
        }

        newCheckbox.setAttribute('type', 'checkbox');
        newCheckbox.setAttribute('class', 'checkbox_tasks_js');
        newCheckbox.setAttribute('id', newObjTask.id);
        newCheckbox.checked = newObjTask.isCompleted;
        newText.setAttribute('class', newObjTask.id);
        newButtonDelete.setAttribute('class', 'delete_tasks_js');
        newButtonDelete.setAttribute('id' , newObjTask.id);

        newText.appendChild(textLi);
        newButtonDelete.appendChild(textButton);

        newLi.appendChild(newCheckbox);
        newLi.appendChild(newText);
        newLi.appendChild(newButtonDelete);
        return newLi
    },
    renderTask: function (listTasks, count) {
        deleteAllTask.removeAllTask(true);
        let arrLiTasks = listTasks.map(function (item) {
            return render.createTask(item)
        });
        let filterArray = filterAndSearchList.filterTodoList(arrLiTasks, count);
        let fragment = document.createDocumentFragment();
        filterArray.forEach(function (item) {
            fragment.appendChild(item);
        });
        elementInDom.listTasks.appendChild(fragment);
        todoList.countList(filterArray.length)
    },
};
let render = new Render();