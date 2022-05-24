'use strict';
const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
  }
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
    for (const article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element ||  get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; -zmieniona na:
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);

        /* insert link into titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
function calculateTagsParams (tags) {
    const params = {
        min: 999999,
        max: 0
    }
    for(let tag in tags) {
        if(tags[tag] > params.max) {
            params.max = tags[tag];
        }
        if(tags[tag] < params.min) {
            params.min = tags[tag];
        }
    }
    return params;
}

// function calculateTagClass(count, params) {

// }

function generateTags() {
    
     /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
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

            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)) {
            /* [NEW] add tag to allTags obejct */
                allTags[tag] = 1;
              }
              else {
                  allTags[tag]++;
              }

            /* END LOOP: for each tag */

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(optTagsListSelector);
        
        // const tagsParams = calculateTagsParams(allTags);
        
        // [NEW] create variable for all links HTML code
        let allTagsHTML = '';
        //  [NEW] START LOOP: for each tag in allTags:
        // let tagLinkHtml = calculateTagClass(allTags[tag], tagsParams);
        // console.log(tagLinkHtml);
        
        for(let tag in allTags) {
        // [NEW] generate code of a link and add it to allTagsHTML
            allTagsHTML += `<li><a href="#tag-${tag}">${tag}(${allTags[tag]})</a></li>`;

        }
        // [NEW] END LOOP: for each tag in allTags:

        // [NEW] add html from allTagsHTML to tagList
        tagList.innerHTML = allTagsHTML;

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
    
    /* [NEW] create a new variable allTags with an empty object */
   let allAuthor = {};
   /* find all articles */
   const articles = document.querySelectorAll(optArticleSelector);
   /* START LOOP: for every article: */
   for (const article of articles) {
       /* get tags from data-tags attribute */
       const articleAuthor = article.dataset.author;

       /* [NEW] find list of tags in right column */
       const tagAuthor = document.querySelector(optAuthorsListSelector);
       
       // [NEW] create variable for all links HTML code
       let allAuthorHTML = '';
       //  [NEW] START LOOP: for each tag in allAuthor:
       // let tagLinkHtml = calculateTagClass(allAuthor[tag], tagsParams);
       // console.log(tagLinkHtml);
       if(!allAuthor.hasOwnProperty(articleAuthor)) {
        /* [NEW] add tag to allAuthor obejct */
            allAuthor[articleAuthor] = 1;
        }
        else {
              allAuthor[articleAuthor]++;
        }

       for(let author in allAuthor) {
       // [NEW] generate code of a link and add it to allAuthorHTML
           allAuthorHTML += `<li><a href="#tag-${author}">${author}(${allAuthor[author]})</a></li>`;

       }
       // [NEW] END LOOP: for each tag in allTags:

       // [NEW] add html from allAuthorHTML to tagAuthor
       tagAuthor.innerHTML = allAuthorHTML;

       /* insert HTML of all the links into the tags wrapper */

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

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';
const optAuthorsListSelector = '.list.authors';
// let   optCloudClassCount = 5;
// let   optCloudClassPrefix = 'tag-size-';


generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
