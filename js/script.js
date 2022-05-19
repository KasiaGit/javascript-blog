'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    /* remove class 'active' from all article links  */
    const activeLink = document.querySelector('.titles a.active');
    if (activeLink) activeLink.classList.remove('active');

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticle = document.querySelector('.post.active');
    if (activeArticle) activeArticle.classList.remove('active');

    /* get 'href' attribute from the clicked link */
    const articleId = clickedElement.getAttribute("href");


    /* find the correct article using the selector (value of 'href' attribute) */
    const showArticle = document.querySelector(articleId);

    /* add class 'active' to the correct article */
    showArticle.classList.add('active')

}

function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector); 
    console.log(articles);
    for (const article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element ||  get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* insert link into titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (const article of articles) {

        /* find tags wrapper */
        const tagsWrap = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.dataset.tags;

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            /* generate HTML of the link */
            html += `<li><a href="#tag-${tag}">${tag}</a></li>`;

            /* add generated code to html variable */
            /* END LOOP: for each tag */
        }

        tagsWrap.innerHTML = html;
        /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
    }
}

function tagClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault;
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href'); //#tag-cat
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', ''); //cat

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]')

    /* START LOOP: for each active tag link */
    for(const activeTag of activeTags) {
        activeTag.classList.remove('active')
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const relatedTags = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(const tag of relatedTags) {
        tag.classList.add('active');
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */
    const allLinksTags = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let tag of allLinksTags) {
        /* add tagClickHandler as event listener for that link */
        tag.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}

function generateAuthors() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (const article of articles) {

        /* find tags wrapper */
        const authorWrap = article.querySelector('.post-author');
        /* make html variable with empty string */
        /* get tags from data-tags attribute */
        const articleAuthor = article.dataset.author;

        /* insert HTML of all the links into the tags wrapper */
        const html = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;

        /* add generated code to html variable */
        authorWrap.innerHTML = html;

        /* END LOOP: for every article: */
    }
}

function authorsClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault;
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);

    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]')

    /* START LOOP: for each active tag link */
    for(const author of activeAuthors) {
        author.classList.remoce('active');
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const relatedAuthors = document.querySelectorAll('a[href="' + href + '"]');
    for(const author of relatedAuthors) {
        author.classList.add('active');
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
    /* find all links to tags */
    const allLinksAuthor = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (let author of allLinksAuthor) {
        /* add aagClickHandAuthors as event listener for that link */
        author.addEventListener('click', authorsClickHandler);
        /* END LOOP: for each link */
    }
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';


generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
