import {headlines} from './Base';

//render mobile version
 export const renderHeadlinesMobile = (array)=> {
     //if there are results returned, render content
     if(array.length !== 0) {
         headlines.container.innerHTML = '';

         array.forEach((element, index) => {
             console.log(index);
            if(index <= 12) {
                console.log(index + 'inside');
                headlines.container.innerHTML +=
                    `<div class="headlines-display__container">
                    <article class="headlines-display__primary">
                        <img src="${element.urlToImage}" alt="${element.title}" class="headlines-display__image">
                        <div class="headlines-display__text-container">
                            <h3 class="headlines-display__title">${element.source.name}</h3>
                            <p class="headlines-display__content">${element.title}</p>
                            <a href="${element.url}"><p class="headlines-display__content-full">${element.content}</p></a>
                        </div>
                    </article>
                </div>`;
            }
         });

         //if there are no results returned, render error message
     } else {
         headlines.container.innerHTML = '';
         for(let i = 0; i <= 12; i++) {
             headlines.container.innerHTML +=
                 `<div class="headlines-display__container">
                <article class="headlines-display__primary">
                    <img src="../img/error.png" class="headlines-display__error-image" alt="Error">
                    <h3 class="headlines-display__title headlines-display__error-title">Sorry, no such query exists in our database, please try another word</h3>
                </article>
            </div>`;
         }
         headlines.container.style.transform = 'translateX(0)';
     }
};


 //render desktop version
export const renderHeadlines = (array) => {
    //if there are results returned, render content
    if(array.length !== 0) {
        headlines.article.forEach((element, index)=> {
            element.innerHTML =
                `<img src="${array[index].urlToImage}" alt="${array[index].title}" class="headlines-display__image">
                <div class="headlines-display__text-container">
                    <h3 class="headlines-display__title">${array[index].source.name}</h3>
                    <p class="headlines-display__content">${array[index].title}</p>
                    <a href="${array[index].url}"><p class="headlines-display__content-full">${array[index].content}</p></a>
                </div>`
        });

    //if there are no results returned, render error message
    } else {
        headlines.article.forEach((element)=> {
            element.innerHTML =
                `<img src="../img/error.png" class="headlines-display__error-image" alt="Error">
            <h3 class="headlines-display__title headlines-display__error-title" id="">Sorry, no such query exists in our database, please try another word</h3>`
        });
    }
};


