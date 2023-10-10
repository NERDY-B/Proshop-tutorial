import axios from 'axios'
import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_FAIL
} from '../constants/orderConstant'

export const createOrder = (order) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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
        const { data } = await axios.post(`/api/orders`, order, config)
        console.log('got here and config file')
        //adds new data into the credentials in the routes backend using bcos of the put method
        //received in or passed from the argument as object passed into d parameter

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //where and what library does this belongs to the config beneath?
        //Speak to abiola
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        //check axio documentation and see what config param enables
        const { data } = await axios.get(`/api/orders/${id}`, config)
        //'Content-Type': 'application/json', get request dont require the content-type

        //adds new data into the credentials in the routes backend using bcos of the put method
        //received in or passed from the argument as object passed into d parameter

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
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
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        //'Content-Type': 'application/json', get request dont require the content-type
        console.log('got here and config file')
        //adds new data into the credentials in the routes backend using bcos of the put method
        //received in or passed from the argument as object passed into d parameter

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
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
        const { data } = await axios.get(`/api/orders/myorders`, config)
        //'Content-Type': 'application/json', get request dont require the content-type
        console.log('got here and config file')

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}