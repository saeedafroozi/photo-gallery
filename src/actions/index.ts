import TransportLayer from '../components/transportLayer'
import { FetchType } from '../../src/contansts/config/enum'
import { imageApi } from '../contansts/config/api'

export const ACTION_TYPES = {
    INIT_CATEGORY: 'INIT_CATEGORY',
    INIT_IMAGES: 'INIT_IMAGES',
    SELECT_GATEGORY: 'SELECT_GATEGORY',
    SET_ISLOADING: 'SET_ISLOADING',
    LOAD_MORE: 'LOAD_MORE'
}

export const initCategory = (url: string, pageIndex: number, limitSize: number) => dispatch => {
    TransportLayer().
        getServerData(url, FetchType.Category).then((responseData: ResponseResult) => {
            dispatch({
                type: ACTION_TYPES.INIT_CATEGORY,
                payload: responseData
            });
            dispatch(initImages(`${imageApi}?limit=${limitSize}&page=${pageIndex}&category_ids=${responseData.categories[0].id}`))
        });
}
export const initImages = (url: string) => dispatch => {
    TransportLayer().getServerData(url, FetchType.Image).then((responseData: ResponseResult) => {
        dispatch({
            type: ACTION_TYPES.INIT_IMAGES,
            payload: responseData
        });
    });
}
// export const setIsLoading = (isLoading: boolean) => dispatch => {
//     dispatch({
//         type: ACTION_TYPES.SET_ISLOADING,
//         payload: isLoading
//     });
// }
export const setIsLoading = (isLoading: boolean) => {
    return {
        type: ACTION_TYPES.SET_ISLOADING,
        payload: isLoading
    };
}
export const setCategory = (url: string, selectedCategory: number) => dispatch => {
    TransportLayer().getServerData(url, FetchType.Image).then((responseData: ResponseResult) => {
        responseData.selectedCategory = selectedCategory;
        dispatch({
            type: ACTION_TYPES.SELECT_GATEGORY,
            payload: responseData
        });
    });
}
export const loadMore = (url: string) => dispatch => {
    TransportLayer().getServerData(url, FetchType.Image).
        then((responseData: ResponseResult) => {
            dispatch({
                type: ACTION_TYPES.LOAD_MORE,
                payload: responseData
            });
        });
}



