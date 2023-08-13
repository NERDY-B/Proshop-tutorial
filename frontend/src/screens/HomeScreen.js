import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            // console.log(await axios.get('api/product'));
            const { data } = await axios.get('/api/products')
            //interaction to our backend 

            setProducts(data)
        }

        fetchProduct()
    }, [])

    const history = useHistory();
    return (
        <>
            <h1>Latest Product</h1>
            <button onClick={() => history.push('/test')}>Go to Test</button>
            <Row>
                {
                    products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
export default HomeScreen