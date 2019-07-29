import React from 'react'
import { useEffect, useReducer } from 'react'
import Menu from '../menu/index'
import { Card } from '../card/index'

interface Action {
    type: string;
    payload: any;
}
interface ContentState {
    category: Category[];
    selectedCategory: number;
    images: Image[];
    isLoading: boolean;
}

function reducer(state: ContentState, action: Action): ContentState {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                category: action.payload.category,
                selectedCategory: action.payload.selectedCategory,
                isLoading: false
            };
        case 'SelectCategory':
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory,
                images: action.payload.images,
                isLoading: false
            };
        case 'SetIsLoading':
            return {
                ...state,
                isLoading: true
            };
        case 'LoadMore':
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory,
                images: action.payload.images,
                isLoading: false
            };
        default:
            return { ...state };
    }
}
const Content = () => {
    const [state, dispatch] = useReducer(reducer, {
        category: [],
        images: [],
        selectedCategory: 0,
        isLoading: false
    });

    const { category, selectedCategory, images, isLoading } = state;

    React.useEffect(() => {
        fetch("https://api.thecatapi.com/v1/categories")
            .then(response => response.json())
            .then(responseData => {
                dispatch({
                    type: 'INIT',
                    payload: {
                        category: responseData,
                        selectedCategory: responseData[0].id
                    }
                });
            })
    }, [])
    function handleClick(id: number) {
        if (!isLoading) {
            dispatch({
                type: 'SetIsLoading',
                payload: {
                    isLoading: true
                }
            });
            if (id !== state.selectedCategory) {
                fetch(`https://api.thecatapi.com/v1/images/search?limit=${10}&category_ids=${id}`)
                    .then(response => response.json())
                    .then((responseData: Image[]) => {
                        dispatch({
                            type: 'SelectCategory',
                            payload: {
                                selectedCategory: id,
                                images: responseData
                            }
                        });
                    })
            }
        }
    }


    function handleLoadMore() {
        if (!isLoading) {
            dispatch({
                type: 'setIsLoading',
                payload: {
                    isLoading: true
                }
            });
            fetch(`https://api.thecatapi.com/v1/images/search?limit=${10}&category_ids=${selectedCategory}`)
                .then(response => response.json())
                .then((responseData: Image[]) => {
                    dispatch({
                        type: 'LoadMore',
                        payload: {
                            selectedCategory: selectedCategory,
                            images: responseData
                        }
                    });
                })
        }


        return (<React.Fragment>
            <Menu category={category} selectedCategory={selectedCategory} onClick={handleClick} />
            <div className="cardContainer">
                {images.map((item: Image, index) => {
                    return <Card
                        key={item.id}
                        image={item}
                    />
                })}
            </div>
            <div>
                <input onClick={handleLoadMore} type="button">Show More</input>
            </div>
        </React.Fragment>
        )
    }
}
export default Content;