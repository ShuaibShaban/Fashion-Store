import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    const redirect = useNavigate()
  return (
    <div className='error_error'><h1>404 Page Not found :( <br />
    <span onClick={()=>{redirect('/products')}} style={{color:'purple'}}>Go Back to Shop</span></h1>
    </div>
  )
}

export default NotFound