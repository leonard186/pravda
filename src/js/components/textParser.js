
export default class Parser {
    constructor(query) {
        this.query = query;
    }

    parseTwitter() {
        let newArray = [];
        let rules = {
            link: /(http|https)....\w+.\w+.\w+/gim, //find links
            reTweet: /(RT\s@)(\w+).\s/gim, //find all re-tweets
            user: /\w*(?<!RT\s)(@)\w+/gim, //find users - used negative lookbehind to avoid finding re-tweets
            hashTags: /(#)\w+/gim, //finds all hash tags
            horEllipsis: /…/gim, //find Unicode Character 'HORIZONTAL ELLIPSIS' (U+2026);
        };


        this.query.map(elem => {

            //let match = elem.text.match();


            //if(match) {
                elem.text = elem.text.replace(rules.link, (matched) => `<a href="${matched}" class="link">${matched}</a>`);
                elem.text = elem.text.replace(rules.reTweet, (matched, part1, part2) => {
                    console.log(matched, part2);
                   return  `<a href="https://twitter.com/${part2}" class="retweet">${matched}</a>`;
                });
                newArray.push(elem);
            //}  else {
                //newArray.push(elem);
            //}


        });
        while(newArray.length > 10) {newArray.pop();}
        return newArray
    }
}