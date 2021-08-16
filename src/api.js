// const url_here = "https://api.coincap.io/v2/assets?limit=20";

const getAssets = (url) => {

    const here = url ? url : url_here

    return fetch(`${here}`, {
        mode: "cors",
        method: "GET",
        headers: {
        "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then((response) => {   
        return response.data;
    })
    .catch(error => { console.log('request failed', error); }); // Syntax error: unexpected end of input
}

const getAseet = (id) => { 
    // const here = url ? url : url_here

    const ruta = "https://api.coincap.io/v2"

    return fetch(`${ruta}/assets/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
        "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then((response) => {   
        return response.data;
    })
    .catch(error => { console.log('request failed', error); }); // Syntax error: unexpected end of input

}


const getAssetHistory = (coin) => {
    const url = "https://api.coincap.io/v2";

    const now = new Date();
    const end = now.getTime();
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`, {
        mode: "cors",
        method: "GET",
        headers: {
        "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then((response) => {   
        return response.data;
    })
    .catch(error => { console.log('request failed', error); });
    
}

const getMarkets = (coin) => { 
    const url = "https://api.coincap.io/v2";
    return fetch(`${url}/assets/${coin}/markets?limit=5`, {
        mode: "cors",
        method: "GET",
        headers: {
        "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then((response) => {   
        return response.data;
    })
    .catch(error => { console.log('request failed', error); });

}

const getExchange = (id) => { 
    const url = "https://api.coincap.io/v2";

    return fetch(`${url}/exchanges/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
        "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then((response) => {   
        return response.data;
    })
    .catch(error => { console.log('request failed', error); });


}


export default { 
    getAssets,
    getAseet,
    getAssetHistory,
    getMarkets,
    getExchange
};