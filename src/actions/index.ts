
import { FetchType } from '../../src/contansts/config/enum'
import { imageApi, fecthConfig } from '../contansts/config/api'

export const ACTION_TYPES = {
    INIT_CATEGORY: 'INIT_CATEGORY',
    INIT_IMAGES: 'INIT_IMAGES',
    SELECT_CATEGORY: 'SELECT_CATEGORY',
    SET_ISLOADING: 'SET_ISLOADING',
    LOAD_MORE: 'LOAD_MORE'
}
const mapToResponseResult = (type: FetchType, response, data) => {
    const responseData: ResponseResult = {
        images: type !== FetchType.Category ? data : [],
        categories: type !== FetchType.Category ? [] : data,
        total: type !== FetchType.Category ? Number(response.headers.get('Pagination-Count')) : 0
    }
    return responseData;
}
export const initCategory = (url: string, pageIndex: number, limitSize: number) => dispatch => {
    dispatch(setIsLoading(true));
    return fetch(url, fecthConfig)
        .then(response => {
            response.json()
                .then((data: Category[]) => {
                    const responseData = mapToResponseResult(FetchType.Category, response, data)
                    dispatch({
                        type: ACTION_TYPES.INIT_CATEGORY,
                        payload: responseData
                    });
                    dispatch(initImages(`${imageApi}?limit=${limitSize}&page=${pageIndex}&category_ids=${responseData.categories[0].id}`))
                })
        }).catch(ex => dispatch(fetchFailure(ex)))
}
export const initImages = (url: string) => dispatch => {
    return fetch(url, fecthConfig)
        .then(response => {
            response.json()
                .then((data: Image[]) => {
                    const responseData = mapToResponseResult(FetchType.Image, response, data)
                    dispatch({
                        type: ACTION_TYPES.INIT_IMAGES,
                        payload: responseData
                    });
                })
        }).catch(ex => dispatch(fetchFailure(ex)))
}
export const setIsLoading = (isLoading: boolean) => {
    return {
        type: ACTION_TYPES.SET_ISLOADING,
        payload: isLoading
    };
}
export const setCategory = (url: string, selectedCategory: number) => dispatch => {
    dispatch(setIsLoading(true));
    return fetch(url, fecthConfig)
        .then(response => {
            response.json()
                .then((data: Image[]) => {
                    const responseData = mapToResponseResult(FetchType.Image, response, data)
                    responseData.selectedCategory = selectedCategory;

                    dispatch({
                        type: ACTION_TYPES.SELECT_CATEGORY,
                        payload: responseData
                    });
                })
        }).catch(ex => dispatch(fetchFailure(ex)))
}
export const loadMore = (url: string) => dispatch => {
    dispatch(setIsLoading(true));
    return fetch(url, fecthConfig)
        .then(response => {
            response.json()
                .then((data: Image[]) => {
                    const responseData = mapToResponseResult(FetchType.Image, response, data)
                    dispatch({
                        type: ACTION_TYPES.LOAD_MORE,
                        payload: responseData
                    });
                })
        }).catch(ex => dispatch(fetchFailure(ex)))
}
function fetchFailure(ex) {

    return {
        type: 'fetchFailure',
        ex
    }
}




