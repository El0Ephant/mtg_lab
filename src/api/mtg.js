class Mtg {

    constructor(baseUrl = "https://api.scryfall.com") {
        this.baseUrl = baseUrl;
        
    }

    loadCards(searchMap){
        const searchQuery = this.searchQueryFromMap(searchMap);
        const params = {
            'q': searchQuery,
            'Accept': '*/*'
        };
        const URLParams = (new URLSearchParams(params).toString()).replaceAll('%2B', '+');
        return fetch(`${this.baseUrl}/cards/search?` + URLParams)
            .then(response=>response.json())
            .then(json=>json.data);
    }

    searchQueryFromMap(searchMap) {
        const res = [];
        if (searchMap['name'] !== undefined && searchMap['name'] !== "") {
            res.push(searchMap['name']);
        }

        for (const [key, value] of Object.entries(searchMap)) {
            if (value !== '' && key !== 'name')
                res.push(`${key}:${value}`);
        }
        return res.join('+');
    }
}


export {Mtg}
