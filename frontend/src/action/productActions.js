import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL

}
    from "../constants/productConstants"

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        //ask nedu to explain this newly request of get in the conroller it isn't defined as it is here, only
        //get `api/product` explain why does it work even without query string added in the product controller
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

//at this point we are left to dispatch this action creator in our main home screen component see video for more 


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        //but the console after it , isn't working and then the catch block is executed 

        const { data } = await axios.get(`/api/products/${id}`)



        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,

        })

        //remove value later
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //where and what library does this belongs to the config beneath?
        //Speak to abiola
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        //check axio documentation and see what config param enables
        await axios.delete(`/api/products/${id}`, config)
        //'Content-Type': 'application/json', get request dont require the content-type
        console.log('got here and config file')

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //where and what library does this belongs to the config beneath?
        //Speak to abiola
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        //check axio documentation and see what config param enables
        const { data } = await axios.post(`/api/products`, {}, config)
        //'Content-Type': 'application/json', get request dont require the content-type
        console.log('got here and config file')

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //where and what library does this belongs to the config beneath?
        //Speak to abiola
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        //check axio documentation and see what config param enables
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)
        //'Content-Type': 'application/json', get request dont require the content-type
        console.log('got here and config file', config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //where and what library does this belongs to the config beneath?
        //Speak to abiola
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        //check axio documentation and see what config param enables
        await axios.post(`/api/products/${productId}/reviews`, review, config)
        //'Content-Type': 'application/json', get request dont require the content-type
        console.log('got here and config file', config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get('/api/products/top')

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}