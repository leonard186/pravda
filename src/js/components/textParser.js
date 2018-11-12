
export default class Parser {
    constructor(query) {
        this.query = query;
    }

    parseTwitter() {
        let newArray = [];
        let rules = {
            link: /(http|https)....\w+.\w+.\w+/gim, //find links
            reTweet: /(RT\s)|@(\w+)./gm,
            //user: /\w*(?<!RT\s)(@)\w+/gim, //find users - used negative lookbehind to avoid finding re-tweets
            hashTags: /(#)(\w+)/gim, //finds all hash tags
            horEllipsis: /…/gim, //find Unicode Character 'HORIZONTAL ELLIPSIS' (U+2026);
        };

        this.query.map(elem => {
                elem.text = elem.text.replace(rules.link, (matched) => `<a href="${matched}" class="link">${matched}</a>`);
                elem.text = elem.text.replace(rules.reTweet, (matched, part1, part2) => {
                   return  `<a href="https://twitter.com/${part2}" class="retweet">${matched}</a>`});
                elem.text = elem.text.replace(rules.hashTags, (matched, part1, part2)=> {
                    return  `<a href="https://twitter.com/search?q=${encodeURI(part2)}&src=tyah" class="hashtag">${matched}</a>`});
                elem.text = elem.text.replace(rules.horEllipsis, `<a href="https://twitter.com/${elem.user.screen_name}" class="horizontalEllipsis">…</a>`);
                newArray.push(elem);
        });
        while(newArray.length > 11) {newArray.pop();}
        return newArray
    }
}