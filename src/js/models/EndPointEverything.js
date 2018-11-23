import {renderArticle} from '../views/Article';
import handleErrors from './ErrorHandler';
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

    //search any content in Top-Headlines
    async searchHeadlines() {
        const response = await fetch(`${baseURL}top-headlines?q=${encodeURI(this.query.searchQuery)}&apiKey=${key}`);
        const json = await response.json();
        let result = json.articles;
        this.searchInHeadlines = this.filter(result);
        setTimeout(()=> {
            this.complementary = this.searchInHeadlines.concat(this.searchInEverything);
            renderHeadlines(this.complementary);
        }, 200);
    }

    //search any content in Everything
    async searchQuery() {
        const response = await fetch(`${baseURL}everything?q=${encodeURI(this.query.searchQuery)}&apiKey=${key}`);
        const json = await response.json();
        let result = json.articles;
        this.searchInEverything = this.filter(result);
        console.log('this.searchInEverything 1:');
        console.log(this.searchInEverything);
        renderArticle(this.searchInEverything);
    }

    //query by country or by category
    async getHeadlinesByCountry() {
        const response = await fetch(`${baseURL}top-headlines?country=${this.query.country}&category=${this.query.category}&apiKey=${key}`);
        const json = await response.json();
        let result = json.articles;
        renderHeadlines(this.filter(result));
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