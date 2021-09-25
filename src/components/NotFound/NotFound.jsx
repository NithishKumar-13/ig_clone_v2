import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './NotFound.scss'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Page Not Found - Instagram'
    },[])
    return (
      <div className='not-found'>
        <Navbar />
        <h2 className='not-found__heading not-found__heading--primary'>Sorry, this page isn't available.</h2>
        <p className='not-found__heading not-found__heading--secondary'>
          The link you followed may be broken, or the page may have been removed.
          <Link className='not-found__link' to='/'>Go back to Instagram</Link>
        </p>
      </div>
    );
}

export default NotFound