import {renderBreakingNews} from '../views/BreakingNews';

let Parser = require('rss-parser');
let parser = new Parser();


export default class GetRSS {
    constructor(rssSource) {
    this.rssSource = rssSource;
    }

    async getResponse() {
            let feed = await parser.parseURL(this.rssSource);
            //console.log(feed);
        renderBreakingNews(feed)

          /*  feed.items.forEach(item => {
                console.log(item);
                renderBreakingNews();
            });*/

    }
}
