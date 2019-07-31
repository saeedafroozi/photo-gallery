import { ACTION_TYPES } from '../actions/index'

const initState = {
    categories: [],
    images: [],
    selectedCategory: 0,
    isLoading: false,
    total: 0,
    pageIndex: 1
};


export default (state: ContentState = initState, action: Action): ContentState => {

    switch (action.type) {
        case ACTION_TYPES.INIT_CATEGORY:
            return {
                ...state,
                categories: action.payload.categories,
                selectedCategory: action.payload.categories[0].id,
                isLoading: false
            };
        case ACTION_TYPES.INIT_IMAGES:
            return {
                ...state,
                images: action.payload.images,
                isLoading: false,
                total: action.payload.total
            };
        case ACTION_TYPES.SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory,
                images: action.payload.images,
                isLoading: false,
                pageIndex: 1
            };
        case ACTION_TYPES.SET_ISLOADING:
            return {
                ...state,
                isLoading: true
            };
        case ACTION_TYPES.LOAD_MORE:
            return {
                ...state,
                images: [...state.images, ...action.payload.images],
                isLoading: false,
                pageIndex: state.pageIndex + 1,
            };
        default:
            return state ;
    }
}   