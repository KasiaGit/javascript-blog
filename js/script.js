'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
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

const optArticleSelector        = '.post';
const optTitleSelector          = '.post-title';
const optTitleListSelector      = '.titles';
const optArticleTagsSelector    = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
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

function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(const article of articles) {

        /* find tags wrapper */
        const tagsWrap = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.dataset.tags;
        
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        /* START LOOP: for each tag */
        for(let tag of articleTagsArray) {
            /* generate HTML of the link */
            html = `<li><a href="#tag-${tag}">${tag}</a></li>`;
            
            /* add generated code to html variable */
            tagsWrap.insertAdjacentHTML('beforeend', html);
            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
  
        /* END LOOP: for every article: */
        }
  }
  
  generateTags();

  function tagClickHandler(event){
    
    /* prevent default action for this event */
    event.preventDefault;
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
  
    /* START LOOP: for each active tag link */
  
      /* remove class active */
  
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    /* START LOOP: for each found tag link */
  
      /* add class active */
  
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
function addClickListenersToTags(){
    /* find all links to tags */
    const allLinksTags = document.querySelectorAll('a[href^="#tag-"]');    
    /* START LOOP: for each link */
    for(let tag of allLinksTags) {
        /* add tagClickHandler as event listener for that link */
        tag.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}
  
addClickListenersToTags();

function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(const article of articles) {

        /* find tags wrapper */
        const authorWrap = article.querySelector('.post-author');
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleAuthor = article.dataset.author;
        
        /* insert HTML of all the links into the tags wrapper */
        html = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
        /* add generated code to html variable */
        authorWrap.insertAdjacentHTML('beforeend', html);
  
        /* END LOOP: for every article: */
        }
}
generateAuthors();

function authorsClickHandler(event){
    
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
  
    /* START LOOP: for each active tag link */
  
      /* remove class active */
  
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    /* START LOOP: for each found tag link */
  
      /* add class active */
  
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
    /* find all links to tags */
    const allLinksAuthor = document.querySelectorAll('a[href^="#author-"]');    
    /* START LOOP: for each link */
    for(let author of allLinksAuthor) {
        /* add aagClickHandAuthors as event listener for that link */
        author.addEventListener('click', authorsClickHandler);
        /* END LOOP: for each link */
    }
}
  
addClickListenersToAuthors();