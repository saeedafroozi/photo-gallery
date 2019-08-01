import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock/es5/client'
import configureMockStore from 'redux-mock-store'
import App from './App'
import { ACTION_TYPES, setIsLoading, setCategory, loadMore, initCategory, initImages } from '../src/actions/index'
import thunk from 'redux-thunk'
import { gallery } from '../src/reducers/index'
import { Action } from 'redux';
const mockStore = configureMockStore([thunk])


interface Category {
    id: number;
    name: string;
}
interface Image {
    breeds: any;
    categories: Category[];
    height: number;
    id: string;
    url: string;
    width: number;
}

//------------------------Test Actions----------------------------
describe('Test Async Action', () => {
    afterEach(() => {
        fetchMock.restore()
    })
    it('mocking set Is Loading', () => {

        const expectedAction = {
            type: ACTION_TYPES.SET_ISLOADING,
            payload: true
        }
        expect(setIsLoading(true)).toEqual(expectedAction)
    })

    it('mocking SELECT_CATEGORY action', () => {
        fetchMock.getOnce('*', [{
            breeds: [],
            categories: [{ id: 5, name: "boxes" }],
            height: 2992,
            id: "ct",
            url: "https://cdn2.thecatapi.com/images/ct.jpg",
            width: 2992
        }],
        )

        const expectedActions = [
            {
                type: ACTION_TYPES.SELECT_CATEGORY,
                payload: {
                    categories: [],
                    images: [{
                        breeds: [],
                        categories: [{ id: 5, name: "boxes" }],
                        height: 2992,
                        id: "ct",
                        url: "https://cdn2.thecatapi.com/images/ct.jpg",
                        width: 2992
                    }],
                    selectedCategory: 2,
                    total: 0
                }
            }
        ]
        const store = mockStore({});
        return store.dispatch(setCategory('*', 2)).then((x) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('mocking LOAD_MORE action', () => {
        fetchMock.getOnce('*', [{
            breeds: [],
            categories: [{ id: 5, name: "boxes" }],
            height: 2992,
            id: "ct",
            url: "https://cdn2.thecatapi.com/images/ct.jpg",
            width: 2992
        }],
        )

        const expectedActions = [
            {
                type: ACTION_TYPES.LOAD_MORE,
                payload: {
                    categories: [],
                    images: [{
                        breeds: [],
                        categories: [{ id: 5, name: "boxes" }],
                        height: 2992,
                        id: "ct",
                        url: "https://cdn2.thecatapi.com/images/ct.jpg",
                        width: 2992
                    }],
                    total: 0
                }
            }
        ]
        const store = mockStore({});
        return store.dispatch(loadMore('*')).then((x) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('mocking InitCategory action', () => {
        fetchMock.getOnce('*', [{ id: 5, name: "boxes" }])
        const expectedActions = [
            {
                type: ACTION_TYPES.INIT_CATEGORY,
                payload: {
                    categories: [{ id: 5, name: "boxes" }],
                    images: [],
                    total: 0
                }
            }
        ]
        const store = mockStore({});
        return store.dispatch(initCategory('*', 1, 10)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('mocking InitImages action', () => {
        fetchMock.getOnce('*', [{
            breeds: [],
            categories: [{ id: 5, name: "boxes" }],
            height: 2992,
            id: "ct",
            url: "https://cdn2.thecatapi.com/images/ct.jpg",
            width: 2992
        }])
        const expectedActions = [
            {
                type: ACTION_TYPES.INIT_IMAGES,
                payload: {
                    categories: [],
                    images: [{
                        breeds: [],
                        categories: [{ id: 5, name: "boxes" }],
                        height: 2992,
                        id: "ct",
                        url: "https://cdn2.thecatapi.com/images/ct.jpg",
                        width: 2992
                    }],
                    total: 0
                }
            }
        ]
        const store = mockStore({});
        return store.dispatch(initImages('*')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

interface Action {
    type: string;
    payload: ContentState;
}
describe('Test Reducer', () => {
    it('should return the initial state', () => {
        expect(gallery(undefined, {} as Action)).toEqual(
            {
                categories: [],
                images: [],
                selectedCategory: 0,
                isLoading: false,
                total: 0,
                pageIndex: 1
            }
        )
    })

    it('should handle INIT_CATEGORY', () => {
        expect(
            gallery({}, {
                type: ACTION_TYPES.INIT_CATEGORY,
                payload: {
                    categories: [{ id: 5, name: "boxes" }],
                }
            })
        ).toEqual({
            categories: [{ id: 5, name: "boxes" }],
            selectedCategory: 5,
            isLoading: false
        })
    })
    it('should handle INIT_IMAGES', () => {
        expect(
            gallery({}, {
                type: ACTION_TYPES.INIT_IMAGES,
                payload: {
                    images: [{
                        breeds: [],
                        categories: [{ id: 5, name: "boxes" }],
                        height: 2992,
                        id: "ct",
                        url: "https://cdn2.thecatapi.com/images/ct.jpg",
                        width: 2992
                    }],
                    total: 100
                }
            })
        ).toEqual({
            images: [{
                breeds: [],
                categories: [{ id: 5, name: "boxes" }],
                height: 2992,
                id: "ct",
                url: "https://cdn2.thecatapi.com/images/ct.jpg",
                width: 2992
            }],
            isLoading: false,
            total: 100
        })
    })
    it('should handle SELECT_CATEGORY', () => {
        expect(
            gallery({}, {
                type: ACTION_TYPES.SELECT_CATEGORY,
                payload: {
                    selectedCategory: 1,
                    images: [{
                        breeds: [],
                        categories: [{ id: 5, name: "boxes" }],
                        height: 2992,
                        id: "ct",
                        url: "https://cdn2.thecatapi.com/images/ct.jpg",
                        width: 2992
                    }],
                    isLoading: false,
                    pageIndex: 1
                }
            })
        ).toEqual({
            selectedCategory: 1,
            images: [{
                breeds: [],
                categories: [{ id: 5, name: "boxes" }],
                height: 2992,
                id: "ct",
                url: "https://cdn2.thecatapi.com/images/ct.jpg",
                width: 2992
            }],
            isLoading: false,
            pageIndex: 1
        })
    })
    it('should handle SET_ISLOADING', () => {
        expect(
            gallery({}, {
                type: ACTION_TYPES.SET_ISLOADING,
                payload: {
                    isLoading: true,
                }
            })
        ).toEqual({
            isLoading: true,
        })
    })
    it('should handle LOAD_MORE', () => {
        expect(
            gallery({
                images: [{
                    breeds: [],
                    categories: [{ id: 5, name: "boxes" }],
                    height: 29,
                    id: "ct",
                    url: "https://cdn2.thecatapi.com/images/ct.jpg",
                    width: 2992
                }],
                pageIndex: 1,
            }, {
                    type: ACTION_TYPES.LOAD_MORE,
                    payload: {
                        images: [{
                            breeds: [],
                            categories: [{ id: 6, name: "boxes" }],
                            height: 2992,
                            id: "br",
                            url: "https://cdn2.thecatapi.com/images/br.jpg",
                            width: 2992
                        }],
                        pageIndex: 1,
                    }
                })
        ).toEqual({
            images: [{
                breeds: [],
                categories: [{ id: 5, name: "boxes" }],
                height: 29,
                id: "ct",
                url: "https://cdn2.thecatapi.com/images/ct.jpg",
                width: 2992
            }, {
                breeds: [],
                categories: [{ id: 6, name: "boxes" }],
                height: 2992,
                id: "br",
                url: "https://cdn2.thecatapi.com/images/br.jpg",
                width: 2992
            }],
            isLoading: false,
            pageIndex: 2,
        })
    })
})