import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from "../constants/userConstants"
import { ORDER_LIST_MY_RESET } from '../constants/orderConstant'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )

        console.log(data, 'data')

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })

}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        //where and what library does this belongs to the config beneath?
        //Speak to abiola

        console.log(userInfo, 'user info')
        console.log(userInfo.token, `userinfo token`)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        //check axio documentation and see what config param enables
        const { data } = await axios.get(
            `/api/users/${id}`, config
        )


        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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
        const { data } = await axios.put(
            `/api/users/profile`, user, config
        )
        //adds new data into the credentials in the routes backend using bcos of the put method
        //received in or passed from the argument as object passed into d parameter

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listUsers = (user) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: USER_LIST_REQUEST
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
        const { data } = await axios.get(
            `/api/users`, config
        )
        //adds new data into the credentials in the routes backend using bcos of the put method
        //received in or passed from the argument as object passed into d parameter

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    //getState() returns object: holds the list of all state that is in our redux store creaton
    try {
        dispatch({
            type: USER_DELETE_REQUEST
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
        const { data } = await axios.delete(
            `/api/users/${id}`, config
        )
        //adds new data into the credentials in the routes backend using bcos of the put method
        //received in or passed from the argument as object passed into d parameter

        dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}