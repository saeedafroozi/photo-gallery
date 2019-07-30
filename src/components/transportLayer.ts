import { FetchType } from './config/enum'
export default class TransportLayer implements ITransportLayer {
    getServerData(url: string, type: FetchType): Promise<ResponseResult> {
        return new Promise((resolve, reject) => {
            fetch(url,{
                method: 'GET',
                headers: {
                    'X-API-KEY': process.env.REACT_APP_AUTH_TOKEN, 
                    'Content-Type': 'application/json'
                }})
                .then(response => {
                    response.json()
                        .then((data) => {
                            resolve({
                                images: type !== FetchType.Category  ? data : [],
                                categories: type !== FetchType.Category  ? [] : data,
                                total: type !== FetchType.Category  ? Number(response.headers.get('Pagination-Count')) : 0
                            })
                        })
                })
        });
    }
}