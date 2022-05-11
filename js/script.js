'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLink = document.querySelector('.titles a.active');
    if(activeLink) activeLink.classList.remove('active');

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticle = document.querySelector('.post.active');
    if(activeArticle) activeArticle.classList.remove('active');

    /* get 'href' attribute from the clicked link */
    const articleId = clickedElement.getAttribute("href");
    

    /* find the correct article using the selector (value of 'href' attribute) */
    const showArticle = document.querySelector(articleId);

    /* add class 'active' to the correct article */
    showArticle.classList.add('active')

}

const optArticleSelector    = '.post';
const optTitleSelector      = '.post-title';
const optTitleListSelector  = '.titles';

function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    for(const article of articles){
        /* get the article id */
        const articleId = article.getAttribute('id'); 
    
        /* find the title element ||  get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* insert link into titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links) {
    link.addEventListener('click', titleClickHandler);
}
