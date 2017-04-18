var user = {
    name: "User"
};

var articleModel = (function () {
    var ARTICLE_LIST = [{
        "id": "news/2017/01/01/title-1",
        "title": "Title1",
        "summary": "Summary",
        "content": "Content",
        "author": "me",
        "created": new Date(2017, 1, 1, 1, 1, 1, 1)

    },
        {
            "id": "news/2017/02/02/title-2",
            "title": "Title2",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 2, 2, 2, 2, 2, 2)

        },
        {
            "id": "news/2017/03/03/title-3",
            "title": "Title3",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 3, 3, 3, 3, 3, 3)

        },
        {
            "id": "news/2017/04/04/title-4",
            "title": "Title4",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 4, 4, 4, 4, 4, 4)

        },
        {
            "id": "news/2017/05/05/title-5",
            "title": "Title5",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 5, 5, 5, 5, 5, 5)

        },
        {
            "id": "news/2017/06/06/title-6",
            "title": "Title6",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 6, 6, 6, 6, 6, 6)

        },
        {
            "id": "news/2017/07/07/title-7",
            "title": "Title7",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 7, 7, 7, 7, 7, 7)

        }, {
            "id": "news/2017/08/08/title-8",
            "title": "Title8",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 8, 8, 8, 8, 8, 8)

        }, {
            "id": "news/2017/09/09/title-9",
            "title": "Title9",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 9, 9, 9, 9, 9, 9)

        }, {
            "id": "news/2017/10/10/title-10",
            "title": "Title10",
            "summary": "Summary",
            "content": "Content",
            "author": "me",
            "created": new Date(2017, 10, 10, 10, 10, 10, 10)

        }];

    function getArticles(skip, top) {
        skip = skip || 0;
        top = top || 10;
        return ARTICLE_LIST.slice(skip, skip + top);
    }

    return {
        getArticles: getArticles
    }
}());

var articleRenderer = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        /* DOM Загрузился. Можно найти в нем нужные элементы и сохранить в переменные */

        ARTICLE_TEMPLATE = document.querySelector('#temp-article-list');
        ARTICLE_LIST_NODE = document.querySelector('.article-list');
    }

    function insertArticlesInDOM(articles) {
        /* для массива объектов статей получим соотвествующие HTML элементы */
        var articlesNodes = renderArticles(articles);
        /* вставим HTML элементы в '.article-list' элемент в DOM. */
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {
        /* каждый объект article из массива преобразуем в HTML элемент */
        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        /* Используем template из DOM, заполним его данными конкретной статьи - article. Этот код можно сделать лучше ...*/

        var template = ARTICLE_TEMPLATE.content;
        template.querySelector('article').id = article.id;
        template.querySelector('.article-title').textContent = article.title;
        template.querySelector('.article-summary').textContent = article.summary;
        template.querySelector('.item-author').textContent = article.author;
        template.querySelector('.item-date').textContent = formatDate(article.created);

        /* Склонируем полученный контент из template и вернем как результат */

        return template.querySelector('article').cloneNode(true);
    }

    //Date -> 16/05/2015 09:50
    function formatDate(d) {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes();
    }

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom
    };
}());
/*
 Функция startApp вызовется, когда браузер полностью загрузит и распарсит исходный HTML (index.html)
 DOMContentLoaded – означает, что все DOM-элементы разметки уже созданы,
 можно их искать, вешать обработчики, создавать интерфейс, но при этом, возможно,
 ещё не догрузились какие-то картинки или стили.
 */
document.addEventListener('DOMContentLoaded', startApp);
function startApp() {
    /* DOM Загрузился. Можно найти в нем нужные элементы и сохранить в переменные */
    articleRenderer.init();
    /* Нарисуем статьи из массива GLOBAL_ARTICLES в DOM */
    renderArticles();
}

document.getElementById('log-button').addEventListener('click', loginButtonPressed);

function loginButtonPressed() {
    var form = document.getElementById('login-form');
    form.style.display = 'none';
    document.querySelector('#user-panel h1').textContent = form.login.value;
    document.getElementById('user-panel').style.display = 'block';
    alert('Hello ' + form.login.value);
}

document.getElementById('log-out-button').addEventListener('click', logoutButtonPressed);

function logoutButtonPressed() {
    document.getElementById('login-form').style.display = 'block';
    document.querySelector('#user-panel h1').textContent = '';
    document.getElementById('user-panel').style.display = 'none';
}

function renderArticles(skip, top) {
    // 1. Удалим статьи из HTML
//    articleRenderer.removeArticlesFromDom();

    // 2. Достанем статьи из модели
    var articles = articleModel.getArticles(skip, top);
    var articles = articleModel.getArticles(skip, top);
    // 3. Отобразим статьи
    articleRenderer.insertArticlesInDOM(articles);
}


/*
 var articleModel = (function () {
 var GLOBAL_ARTICLES = [{
 "id": "news/2017/02/28/rossiya-snimet-zapret-na-import-moldavskih-vin",
 "title": "Россия снимет запрет на импорт молдавских вин",
 "author": "Meduza",
 "createdAt": new Date("2017-02-28T05:24:23.856Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/28/tramp-obvinil-obamu-v-organizatsii-protestov-po-vsey-strane-i-utechek-v-smi",
 "title": "Трамп обвинил Обаму в организации протестов по всей стране и утечек в СМИ",
 "author": "Meduza",
 "createdAt": new Date("2017-02-27T05:24:23.316Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/28/rosneft-zainteresovalas-dobychey-v-meksikanskom-zalive",
 "title": "«Роснефть» заинтересовалась добычей в Мексиканском заливе",
 "author": "Meduza",
 "createdAt": new Date("2017-02-26T05:24:22.818Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/28/amerikanskiy-senator-predlozhil-nazvat-imenem-nemtsova-ulitsu-pered-posolstvom-rossii",
 "title": "Американский сенатор предложил назвать именем Немцова улицу перед посольством России",
 "author": "Meduza",
 "createdAt": new Date("2017-02-25T05:24:21.043Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/28/rossiya-otkazalas-zaderzhat-podozrevaemyh-v-ubiystve-kim-chen-nama",
 "title": "Россия отказалась задержать подозреваемых в убийстве Ким Чен Нама",
 "author": "Meduza",
 "createdAt": new Date("2017-02-24T05:24:19.591Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/28/spacex-anonsiroval-polet-kosmicheskih-turistov-k-lune-v-2018-godu",
 "title": "SpaceX пообещала отправить космических туристов к Луне в 2018 году",
 "author": "Meduza",
 "createdAt": new Date("2017-02-22T05:23:51.252Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/27/v-avstrii-vyhodtsa-iz-chechni-prigovorili-k-2-5-godam-tyurmy-za-uchastie-v-boyah-na-storone-ig",
 "title": "В Австрии выходца из Чечни приговорили к 2,5 годам тюрьмы за участие в боях на стороне ИГ",
 "author": "Meduza",
 "createdAt": new Date("2017-02-21T05:23:47.871Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/27/v-peterburge-zaderzhali-uchastnika-aktsii-lgbt-spetsnaza-proshedshey-23-fevralya",
 "title": "В Петербурге задержали участника акции «ЛГБТ-спецназа», прошедшей 23 февраля",
 "author": "Meduza",
 "createdAt": new Date("2017-01-18T05:23:45.059Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/27/nikolay-karachentsov-gospitalizirovan-posle-dtp-v-podmoskovie",
 "title": "Николай Караченцов госпитализирован после ДТП в Подмосковье",
 "author": "Meduza",
 "createdAt": new Date("2017-01-16T05:23:41.378Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }, {
 "id": "news/2017/02/27/id-kommersant-nachnet-vypuskat-pod-nazvaniem-dengi-reklamnoe-prilozhenie",
 "title": "ИД «Коммерсант» начнет выпускать под названием «Деньги» рекламное приложение",
 "author": "Meduza",
 "createdAt": new Date("2017-01-15T05:23:36.803Z"),
 "content": "Content of post",
 "summary": "Summary of post"
 }];

 function getArticles(skip, top) {
 skip = skip || 0;
 top = top || 10;
 return GLOBAL_ARTICLES.slice(skip, skip + top);
 }

 return {
 getArticles: getArticles
 };
 }())


 var articleRenderer = (function () {
 var ARTICLE_TEMPLATE;
 var ARTICLE_LIST_NODE;

 function init() {
 /* DOM Загрузился.
 Можно найти в нем нужные элементы и сохранить в переменные */
/*
 ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
 ARTICLE_LIST_NODE = document.querySelector('.article-list');
 }

 function insertArticlesInDOM(articles) {
 /* для массива объектов статей получим соотвествующие HTML элементы */
/*
 var articlesNodes = renderArticles(articles);
 /* вставим HTML элементы в '.article-list' элемент в DOM. *//*
 articlesNodes.forEach(function (node) {
 ARTICLE_LIST_NODE.appendChild(node);
 });
 }

 function removeArticlesFromDom () {
 ARTICLE_LIST_NODE.innerHTML = '';
 }

 function renderArticles(articles) {
 /* каждый объект article из массива преобразуем в HTML элемент *//*
 return articles.map(function (article) {
 return renderArticle(article);
 });
 }

 function renderArticle(article) {
 /*
 Используем template из DOM, заполним его данными конкретной статьи - article.
 Этот код можно сделать лучше ...
 *//*
 var template = ARTICLE_TEMPLATE;
 template.content.querySelector('.article-list-item').dataset.id = article.id;
 template.content.querySelector('.article-list-item-title').textContent = article.title;
 template.content.querySelector('.article-list-item-summary').textContent = article.summary;
 template.content.querySelector('.article-list-item-author').textContent = article.author;
 template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);

 /*
 Склонируем полученный контент из template и вернем как результат
 *//*
 return template.content.querySelector('.article-list-item').cloneNode(true);
 }

 Date -> 16/05/2015 09:50
 function formatDate(d) {
 return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
 d.getHours() + ':' + d.getMinutes();
 }

 return {
 init: init,
 insertArticlesInDOM: insertArticlesInDOM,
 removeArticlesFromDom: removeArticlesFromDom
 };
 }());

 /*
 Функция startApp вызовется, когда браузер полностью загрузит и распарсит исходный HTML (index.html)
 DOMContentLoaded – означает, что все DOM-элементы разметки уже созданы,
 можно их искать, вешать обработчики, создавать интерфейс, но при этом, возможно,
 ещё не догрузились какие-то картинки или стили.
 *//*
 document.addEventListener('DOMContentLoaded', startApp);


 function startApp() {
 /* DOM Загрузился.
 Можно найти в нем нужные элементы и сохранить в переменные *//*
 articleRenderer.init();
 /* Нарисуем статьи из массива GLOBAL_ARTICLES в DOM *//*
 renderArticles();
 }

 /* Глобальная Функция для проверки. Свяжет модель и отображения *//*

 function renderArticles(skip, top) {
 // 1. Удалим статьи из HTML
 articleRenderer.removeArticlesFromDom();

 // 2. Достанем статьи из модели
 var articles = articleModel.getArticles(skip, top);

 // 3. Отобразим статьи
 articleRenderer.insertArticlesInDOM(articles);
 }
 */