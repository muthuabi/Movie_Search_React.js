import React, { Component } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import {FaRegStar,FaStar,FaSearch} from 'react-icons/fa';
import SimpleImageSlider from 'react-simple-image-slider';
import {DiReact} from 'react-icons/di';
import AnchorLink from 'react-anchor-link-smooth-scroll';
const Star=(props)=>
{
    //console.log(props);
    const icons=[]
    for(var i=0;i<props.count;i++)
    {
        icons.push(i);
    }
    //console.log(icons);
    const StarIcons=icons.map(element=>{
        return(
            
           <FaStar key={element} size={10} ></FaStar>
        )
    })
    //console.log(StarIcons);
    return (
        <div className='d-flex gap-2 bg-light px-1 mt-1 align-items-center' style={{width:"fit-content"}}>{props.rate}{StarIcons}</div>
    )

}
const NotFound=()=>{
    return(
        <h1>No Movies</h1>
    )
}
class MovieList extends Component {
    state = { 
        movie:[],
        movies:[1,3,4],
        search:"",
        dis:"none",
        toplink:0,
        // notfound:false,
     } 
    componentDidMount=()=>{
        // fetch("http://universities.hipolabs.com/search?country=India")
        // fetch("https://gist.github.com/saniyusuf/406b843afdfb9c6")
         fetch("http://localhost:5000/movie-data",{method:'POST'})
        // fetch("http://localhost/temp/Film.php")
        .then(res=>res.json())
        .then((res)=>
        {
           // console.log(res)
            this.setState({movie:res})
            //console.log("Sucess",this.state.movie)
        })
        .catch(e=>console.log("Error",e))
    }
    onchange=(e)=>{
        if(e.target.value==="")
            this.setState({search:""})
        
    }
    
    onclick=(e)=>{
        const val=document.getElementById("input-search").value;
        this.setState({search:val})
    }
    ondis=(e)=>{
        if(this.state.dis==="none")
        this.setState({dis:"flex"})
        else
        this.setState({dis:"none"})
    }
   keyhandle=(e)=>{
    //console.log(e.key)
    if(e.key=="Enter")
        document.getElementById("search-btn").click();
   }
   handleScroll=(e)=>{
    //console.log(e.currentTarget.scrollTop)
    this.setState({toplink:80})
   }
  
    render() { 
        window.onscroll=this.handleScroll
        return (

            <div id="main" className='container p-3' >

            <AnchorLink href="#main" id="toplink" style={{position:"fixed",right:0,bottom:20,textDecoration:"none",fontSize:"xx-large",borderRadius:40,width:40,height:40,backgroundColor:"black",textAlign:"center",opacity:this.state.toplink, transition:"opacity 1s"}}>^</AnchorLink>
            {/* <a href="#Doctor Strange">Doctor Strange</a> */}
            <div className='d-flexbox py-2'>
            <h2 className='text-white text-center text-uppercase text-bg-dark p-2 position-relative' >Movie Details<button className='btn bt-dark btn-outline-light  mx-3 mx-lg-5 my-md-1 p-1 position-absolute' onClick={(e)=>this.ondis(e)} ><FaSearch size={20} ></FaSearch></button></h2>
            <div className='form-group w-md-100 gap-2 justify-content-center' style={{display:this.state.dis}}>
                <input type="search" placeholder='Search Here...' onKeyDown={(e)=>this.keyhandle(e)} onChange={(e)=>this.onchange(e)} className='form-control w-50' id="input-search"/>
                <button className="btn btn-outline-dark" id="search-btn"  onClick={(e)=>this.onclick(e)}  >Search</button>
            </div>
            </div>
                <div className='row d-flex gap-3' >
                {
                    this.state.movie.filter(element=>this.state.search.trim()===""?true:element.Title.toUpperCase().match(this.state.search.toUpperCase().trim())).map(element=>(
    
                    <div key={element.Title} id={element.Title} onScroll={this.handleScroll} className='col-*-12 d-flex gap-1 bg-light p-2' style={{minHeight:"max-content"}} >
                    {/* {this.state.notfound ? <NotFound/>:false} */}
                        
                        <img className='img img-fluid col-4  object-fit-fill   min-vh-100 p-2 ' sm  src={element.Poster} alt="Image"/>  
                        <div className='col-8 px-2  d-flex flex-column gap-lg-2 gap-md-1   '>
                            <h3 className='card-title text-capitalize  '>{element.Title}</h3>
                            <div className='d-flex  flex-column ' >
                                <p className='fw-semibold m-0 mt-1' >{element.Released}</p>
                                <p className='m-0 mt-1'>{element.Genre}</p>
                                <Star count={element.imdbRating} rate={element.imdbRating} />  
                            </div>
                            <strong className='text-bg-light px-1 my-1 ' style={{width:"fit-content"}} >{element.Rated}</strong>
                            <p className=''>{element.Plot}</p>
                            <p><strong>Starring:</strong> {element.Actors}</p>
                            <div className='d-lg-flex d-none' >
                            <SimpleImageSlider 
                               
                                width={'50%'} 
                                height={'45%'} 
                                navStyle={2}
                                navSize={30}
                                showBullets={true}  
                                images={element.Images}
                                showNavs={true} 
                                loop={true}
                                autoPlay={true}
                                slideDuration={1}
                            />
                            </div>
                        </div>
                    </div>
                ))}
                </div> 
            </div>
        );
    }
}
 
export default MovieList;