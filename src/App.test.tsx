import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock/es5/client'
import configureMockStore from 'redux-mock-store'
import App from './App';
import { ACTION_TYPES, setIsLoading, setCategory, loadMore, initCategory, initImages } from '../src/actions/index'
import  thunk from  'redux-thunk';
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

// describe('actions', () => {

// })

describe('async action category click', () => {
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