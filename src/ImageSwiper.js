import React, { Component } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import 'react-simple-image-slider';
const images=[
"http://localhost/temp/img2.jpg",
"http://localhost/temp/img3.jpg",
"http://localhost/temp/img4.jpg"
]

class ImageSwiper extends Component
 {
    render(){
        return(
            <div className='d-block' style={{width:"fit-content"}}>
            
            <SimpleImageSlider 
            width={'100%'} 
            height={'50%'} 
           
            showBullets={true}  
            showNavs={true} 
            images={images}
            loop={true}
            autoPlay={true}
            slideDuration={1}
            style={{}}
            />
            </div>
        );
    }
           
}

export default ImageSwiper;