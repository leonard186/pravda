import {article, elements, headlines} from './Base';
import {setContainerSize} from "../components/helperFunctions";

export const renderArticle = (array) => {
    console.log(array);
    setTimeout(()=> {//delay rendering content until fade out effect finishes
        article.parent.innerHTML = '';
        if(array.length !== 0) {
            array.forEach(data => {
                article.parent.innerHTML +=
                    `<div class="articles-display__wrap">
                        <picture class="articles-display__wrap__img-container">
                            <img src="${data.urlToImage}" class="articles-display__wrap__img-container-img" alt="article image">
                        </picture>
                        <article class="articles-display__wrap__text">
                            <h3 class="articles-display__wrap__text-title">${data.source.name}</h3>
                            <p class="articles-display__wrap__text-description">${data.content}</p>
                            <a href="${data.url}" class="articles-display__wrap-button">Read More</a>
                        </article>
                    </div>`;
            });
        } else {
            console.log(article.articles);
            article.parent.innerHTML =
                `<div class="articles-display__wrap">
                    <picture class="articles-display__wrap__img-container" style="width: 60%">
                       <img src="../img/error.png" class="articles-display__wrap__img-container-img" style="width: auto" alt="Error">
                    </picture>
                    <article class="articles-display__wrap__text">
                        <h3 class="articles-display__wrap__text-title">Sorry, no such query exists in our database, please try another word</h3>
                    </article>
                </div>
                `
        }


        article.parent.style.opacity = '1';
        elements.searchButton.innerHTML = '<i class="fas fa-search"></i>'; //render search button
    }, 250);
};

