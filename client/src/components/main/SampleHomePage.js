import React from 'react'
import Video from "../assets/video1.mp4";
import './sampleHome.css'
import { redirect, useNavigate } from 'react-router-dom';
function SampleHomePage() {
    const redirect = useNavigate()
    function handleClick(){
        redirect('/products')
    }
  return (
  
    <>
    <div className='home_page_container'>
         <div className="video_play">
        <video autoPlay muted loop id="video">
          <source src={Video} type="video/mp4" />
        </video>
        </div>
        <div className="home_text_content" style={{color:'white'}}>
            <div className='page_text'>
                <h1 >Fashionnova !</h1>
                <p>Your ultimate destination for all things trendy.</p> <br />
                <button onClick={handleClick}>shop</button>
            </div>
        </div>
       
    </div>

    </>
  )
}

export default SampleHomePage