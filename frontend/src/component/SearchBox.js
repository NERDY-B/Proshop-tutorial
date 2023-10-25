import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import '../../src/index.css'
import '../index.css'

//ask nedu what is the difference between this (in Header.js)const searchBox = ({history}) the destrucutre as opposed 
//to homescreen component used in the App with <Route> 

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='txt-black'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'

            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox