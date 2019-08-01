import React from 'react'
import { useEffect } from 'react'
import Menu from '../menu/index'
import { Card } from '../card/index'
import { connect } from 'react-redux'
import { Page_Index, Limit_Size } from '../../contansts/config/const'
import { initImages, initCategory, setIsLoading, setCategory, loadMore } from '../../actions/index'
import { categoryApi, imageApi } from '../../contansts/config/api'
import uuid from 'uuid'
import { ReactComponent as Spinner } from '../../resources/icons/spinner.svg'

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
interface ContentProps {
    dispatch?: (action) => void;
}

const Content = ({ dispatch, categories, selectedCategory, images, isLoading, total, pageIndex }: ContentState & ContentProps) => {

    React.useEffect(() => {
        dispatch(initCategory(categoryApi, Page_Index, Limit_Size))
    }, [])

    function handleClick(id: number) {
        if (!isLoading) {
            dispatch(setIsLoading(true))
            if (id !== selectedCategory) {
                dispatch(setCategory(`${imageApi}?limit=${10}&page=${pageIndex}&category_ids=${id}`, id));
            }
        }
    }

    function handleLoadMore() {
        if (!isLoading) {
            dispatch(setIsLoading(true))
            dispatch(loadMore(`${imageApi}?limit=${10}&page=${pageIndex + 1}&category_ids=${selectedCategory}`));
        }
    }


    return (<React.Fragment>
        <Menu
            category={categories}
            selectedCategory={selectedCategory}
            onClick={handleClick}
        />
        <div className="cardContainer">
            {(images || []).map((item: Image, index) => {
                return <Card
                    key={uuid()}
                    image={item}
                />
            })}
        </div>
        <div className="loadMore">
            {pageIndex * 10 < total && <button
                className="button"
                onClick={handleLoadMore} >LoadMore
             </button>}
        </div>
        {isLoading && <Spinner className="loader" />}
    </React.Fragment>
    )
}
function mapStateToProps(state) {
    const { categories, selectedCategory, images, isLoading, total, pageIndex } = state
    return { categories, selectedCategory, images, isLoading, total, pageIndex };
}

export default connect(mapStateToProps)(Content)