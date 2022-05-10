'use strict';
window.addEventListener('DOMContentLoaded', (event) => {
    function titleClickHandler(event){
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
    
        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }
    
        /* add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        clickedElement.classList.add('active');

        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post.active');
        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
    
        /* get 'href' attribute from the clicked link */
        let articleId = clickedElement.getAttribute("href");
        

        /* find the correct article using the selector (value of 'href' attribute) */
        let showArticle = document.querySelector(articleId);

        /* add class 'active' to the correct article */
        showArticle.classList.add('active')
    
    }

    const optArticleSelector    = '.post';
    const optTitleSelector      = '.post-title';
    const optTitleListSelector  = '.titles';
    function generateTitleLinks(){

        /* remove contents of titleList */
        let optTitleListSelectorQuery = document.querySelector(optTitleListSelector);
        optTitleListSelectorQuery.innerHTML = '';

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);

        for( let article of articles){
            /* get the article id */
            let articleId =  article.getAttribute('id'); 
        
            /* find the title element ||  get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            /* insert link into titleList */
            optTitleListSelectorQuery.insertAdjacentHTML('beforeend', linkHTML);
        }

    }
    generateTitleLinks();
    
    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
});