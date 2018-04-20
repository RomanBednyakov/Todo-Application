function PaginationList() {
    this.numberPerPage = 7;
}
PaginationList.prototype = {
    controllerLink: function(e) {
        this.removeClassLinkPaginate(e.target);
        if (todoList.stateFilter) {
            render.renderTask(todoList.filterList, e.target.dataset.id);
        } else {
            render.renderTask(todoList.list, e.target.dataset.id);
        }
    },

    countPaginate : function (arrayTask) {
        let number = Math.ceil(arrayTask.length / this.numberPerPage);
        let arrLink = [];
        if (number > 1) {
            for (let page = 0; page < number; page++) {
                arrLink.push(page)
            }
        }
        paginate.renderPaginate(arrLink);
    },

    renderPaginate: function (arrLink) {
        paginate.deleteAllLink();
        let filteredList = arrLink.map(function (item) {
            return paginate.addedLinkPaginate(item);
        });
        paginate.showLinkPaginate(filteredList);
    },

    addedLinkPaginate: function (idLink) {
        const link = document.createElement('a');
        link.setAttribute('class', 'link_paginate_js');
        const textLink = document.createTextNode(idLink + 1);
        link.appendChild(textLink);
        link.dataset.id = idLink;
        return link;
    },

    showLinkPaginate : function (listLink) {
        let fragment = document.createDocumentFragment();
        listLink.forEach(function (item) {
            fragment.appendChild(item);
        });
        elementInDom.paginate.appendChild(fragment);
    },

    deleteAllLink : function () {
        let arrLink = document.querySelectorAll('.paginate_js > a');
        if (arrLink.length > 0) {
            arrLink.forEach(function (item) {
                elementInDom.paginate.removeChild(item);
            });
        }
    },

    fistPage: function () {
        let elemLink = document.querySelectorAll('.paginate_js > a');
      if (elemLink.length > 0) {
        let fistElem = elemLink[0];
          fistElem.setAttribute('id', 'activeTarget');
      }
    },
    removeClassLinkPaginate : function (target) {
        let arr = document.querySelectorAll('.paginate_js > a');
        arr.forEach(function (item) {
            item.setAttribute('id', '');
        });
        target.setAttribute('id', 'activeTarget');
    },
};
let paginate = new PaginationList();