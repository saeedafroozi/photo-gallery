import React from 'react'
import { useEffect } from 'react'
import Menu from '../menu/index'
import { Card } from '../card/index'
import { connect } from 'react-redux'
import { Page_Index, Limit_Size } from '../../contansts/config/const'
import { initCategory, setCategory, loadMore } from '../../actions/index'
import { categoryApi, imageApi } from '../../contansts/config/api'
import uuid from 'uuid'
import { ReactComponent as Spinner } from '../../resources/icons/spinner.svg'
import { bindActionCreators } from 'redux'

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
    setCategory: (url: string, selectedCategory: number) => void;
    initCategory: (categoryApi: string, Page_Index: number, Limit_Size: number) => void;
    loadMore: (url: string) => void;
}

const Content = ({ dispatch, categories, selectedCategory, images, isLoading, total, pageIndex, initCategory, setCategory, loadMore }: ContentState & ContentProps) => {

    useEffect(() => {
        initCategory(categoryApi, Page_Index, Limit_Size);
    }, [initCategory])

    return (<React.Fragment>
        <Menu
            category={categories}
            selectedCategory={selectedCategory}
            onClick={(id) => setCategory(`${imageApi}?limit=${10}&page=${pageIndex}&category_ids=${id}`, id)}
            isLoading={isLoading}
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
                disabled={isLoading}
                onClick={() => loadMore(`${imageApi}?limit=${10}&page=${pageIndex + 1}&category_ids=${selectedCategory}`)} >LoadMore
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ initCategory, setCategory, loadMore }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)