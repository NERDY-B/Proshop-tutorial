import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//useDispatch to call in action, a method of react -redux that allows us connect react with redux store
//useSElector to select part of the state or( the specified state in the reducer in the store.js file)
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Paginate from '../component/Paginate'
import ProductCarousel from '../component/ProductCarousel'
import Meta from '../component/Meta'
import { listProducts } from '../action/productActions'

const HomeScreen = ({ history, match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])



    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'></Link>}
            <h1>Latest Product</h1>
            <button onClick={() => history.push('/test')}>Go to Test</button>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                    <Row>
                        {
                            products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}

        </>
    )
}
export default HomeScreen