import React from 'react'
import { useEffect, useReducer } from 'react'
import Menu from '../menu/index'
import { Card } from '../card/index'
import { FetchType } from '../config/enum'
import TransportLayer from '../transportLayer';
import uuid from 'uuid'

interface Action {
    type: string;
    payload: ContentState;
}
interface ContentState {
    categories?: Category[];
    selectedCategory?: number;
    images?: Image[];
    isLoading?: boolean;
    total?: number;
    pageIndex?: number;
}
let transportLayer: ITransportLayer = new TransportLayer();

function reducer(state: ContentState, action: Action): ContentState {
    switch (action.type) {
        case 'INITCATEGORY':
            return {
                ...state,
                categories: action.payload.categories,
                selectedCategory: action.payload.selectedCategory,
                isLoading: false
            };
        case 'INITIMAGES':
            return {
                ...state,
                images: action.payload.images,
                isLoading: false,
                total: action.payload.total
            };
        case 'SELECTGATEGORY':
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory,
                images: action.payload.images,
                isLoading: false,
                pageIndex: 1
            };
        case 'SETISLOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'LOADMORE':
            return {
                ...state,
                images: [...state.images, ...action.payload.images],
                isLoading: false,
                pageIndex: action.payload.pageIndex,
            };
        default:
            return { ...state };
    }
}
const Content = () => {
    const [state, dispatch] = useReducer(reducer, {
        categories: [],
        images: [],
        selectedCategory: 0,
        isLoading: false,
        total: 0,
        pageIndex: 1
    });

    const { categories, selectedCategory, images, isLoading, pageIndex, total } = state;

    React.useEffect(() => {
        transportLayer.getServerData("https://api.thecatapi.com/v1/categories", FetchType.Category).then((responseData: ResponseResult) => {
            dispatch({
                type: 'INITCATEGORY',
                payload: {
                    categories: responseData.categories,
                    selectedCategory: responseData.categories[0].id
                }
            });
            const categoryId = responseData.categories ? responseData.categories[0].id : 0;
            transportLayer.getServerData(`https://api.thecatapi.com/v1/images/search?limit=${10}&page=${pageIndex}&category_ids=${categoryId}`, FetchType.Image).then((responseData: ResponseResult) => {
                dispatch({
                    type: 'INITIMAGES',
                    payload: {
                        images: responseData.images,
                        total: responseData.total
                    }
                });
            });
        });

    }, [])

    function handleClick(id: number) {
        if (!isLoading) {
            dispatch({
                type: 'SETISLOADING',
                payload: {
                    isLoading: true
                }
            });
            if (id !== state.selectedCategory) {
                transportLayer.getServerData(`https://api.thecatapi.com/v1/images/search?limit=${10}&page=${pageIndex}&category_ids=${id}`, FetchType.Image).then((responseData: ResponseResult) => {
                    dispatch({
                        type: 'SELECTGATEGORY',
                        payload: {
                            images: responseData.images,
                            selectedCategory: id
                        }
                    });
                });
            }
        }
    }


    function handleLoadMore() {
        if (!isLoading) {
            dispatch({
                type: 'SETISLOADING',
                payload: {
                    isLoading: true
                }
            });
            fetch(`https://api.thecatapi.com/v1/images/search?limit=${10}&page=${pageIndex + 1}&category_ids=${selectedCategory}`)
                .then(response => response.json())
                .then((responseData: Image[]) => {
                    dispatch({
                        type: 'LOADMORE',
                        payload: {
                            images: responseData,
                            pageIndex: pageIndex + 1
                        }
                    });
                })
        }
    }

    return (<React.Fragment>
        <Menu category={categories} selectedCategory={selectedCategory} onClick={handleClick} />
        <div className="cardContainer">
            {images.map((item: Image, index) => {
                return <Card
                    key={uuid()}
                    image={item}
                />
            })}
        </div>
        <div className="loadMore">
            {pageIndex * 10 < total && <button className="button" onClick={handleLoadMore} >LoadMore</button>}
        </div>
    </React.Fragment>
    )
}

export default Content;