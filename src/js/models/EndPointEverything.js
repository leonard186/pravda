import {renderArticle} from '../views/Article';
import {renderHeadlines} from "../views/Headline";
import {newsApiK} from '../models/keys';

const baseURL = 'https://newsapi.org/v2/';
const key = newsApiK[0].concat(newsApiK[1], newsApiK[2], newsApiK[3]);


export default class GetNews {
    constructor(query) {
        query = Object.assign({}, GetNews.default, query);
        this.query = query;
        this.searchInHeadlines = [];
        this.searchInEverything = [];
        this.complementary = [];
    }

    //search any content in Everything
    async searchQuery() {
            const responseE = await fetch(`${baseURL}everything?q=${encodeURI(this.query.searchQuery)}&apiKey=${key}`);
            const responseH = await fetch(`${baseURL}top-headlines?q=${encodeURI(this.query.searchQuery)}&apiKey=${key}`);
            const jsonH = await responseH.json();
            const jsonE = await responseE.json();
            this.searchInHeadlines = this.filter(jsonH.articles);
            this.searchInEverything = this.filter(jsonE.articles);
            this.complementary = this.searchInHeadlines.concat(this.searchInEverything);
            renderHeadlines(this.complementary);
            renderArticle(this.searchInEverything);
    }

    //query by country or by category
    async getHeadlinesByCountry() {
        const responseH = await fetch(`${baseURL}top-headlines?country=${this.query.country}&category=${this.query.category}&apiKey=${key}`);
        const responseE = await fetch(`${baseURL}everything?q=${this.query.category}&apiKey=${key}`);
        const jsonH = await responseH.json();
        const jsonE = await responseE.json();
        this.searchInHeadlines = this.filter(jsonH.articles);
        this.searchInEverything = this.filter(jsonE.articles);
        this.complementary = this.searchInHeadlines.concat(this.searchInEverything);
        renderHeadlines(this.complementary);
        renderArticle(this.searchInEverything);
    }

    filter(result) {
        let final = [];
        result.map(e => {
            if(e.urlToImage !==null && e.urlToImage.startsWith('https://')  && e.content !==null && e.title !==null &&  e.description !==null && e.source.name !==null) {
                final.push(e);
            }
        });
        return final
    };
}

GetNews.default = {
    searchQuery: 'brexit',
    country: 'gb',
    category: 'general',
    language: 'en',
    //sources: 'google-news-uk'
};