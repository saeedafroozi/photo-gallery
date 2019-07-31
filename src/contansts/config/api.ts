export const categoryApi = "https://api.thecatapi.com/v1/categories";
export const imageApi = "https://api.thecatapi.com/v1/images/search";
export const fecthConfig = {
    method: 'GET', headers: {
        'X-API-KEY': process.env.REACT_APP_AUTH_TOKEN,
        'Content-Type': 'application/json'
    }
};