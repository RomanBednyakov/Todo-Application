// 1. Создаём новый объект XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'test.json'
xhr.open('GET', 'test.json');

// 3. Отсылаем запрос
xhr.send();

xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState !== 4) return;

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        let response = JSON.parse(xhr.response);
        let testDiv = document.querySelector('#test');
        response.response.forEach(function (item) {
            testDiv.appendChild(document.createTextNode(item))
        })
    }

};
// python -m SimpleHTTPServer 8080
let pageList = new Array();
let currentPage = 1;
let numberPerPage = 4;
let events = Array.prototype.slice.call(document.querySelectorAll('ul > li'));

function getNumberOfPages() {
    console.log('##',events.length);
    return Math.ceil(events.length / numberPerPage);
}
function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}
function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;
    for (i = 0; i < pageList.length; i++) {
        pageList[i].classList.add("not-visible"); // make the old list invisible
    }
    pageList = events.slice(begin, end);
    drawList();
    check();
}

function drawList() {
    for (i = 0; i < pageList.length; i++) {
        pageList[i].classList.remove("not-visible");
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

function load() {
    loadList();
}

let numberOfPages = getNumberOfPages();
window.onload = load;