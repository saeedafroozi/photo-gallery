import { FetchType } from '../../src/contansts/config/enum'
class TransportLayer  {
    async getServerData(url: string, type: FetchType) {
        //  return new Promise((resolve, reject) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.REACT_APP_AUTH_TOKEN,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then((data) => {
                        return {
                            images: type !== FetchType.Category ? data : [],
                            categories: type !== FetchType.Category ? [] : data,
                            total: type !== FetchType.Category ? Number(response.headers.get('Pagination-Count')) : 0
                        }
                    })
            })
        // });
    }
}
export default () => new TransportLayer()