let Parser = require('rss-parser');//import rss-parser library
let parser = new Parser();

export default class GetRSS {
    constructor(rssSource) {
    this.rssSource = rssSource;
    }

    async getResponse() {
        let feed = await parser.parseURL(this.rssSource);
        let dataToDisplay = [];
        console.log(dataToDisplay);
        feed.items.forEach(e=> {
            e.title.length < 80 ? dataToDisplay.push(e) :  null;
        });
        return dataToDisplay;
    }
}
