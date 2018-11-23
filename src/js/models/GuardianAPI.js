import {guardianK} from "./keys";

let key = guardianK[0].concat(guardianK[1], guardianK[2], guardianK[3]);

export default class Guardian {
    constructor(query) {
        this.query = query;
    }

    async getResponse() {
        const response = await fetch()
    }
}