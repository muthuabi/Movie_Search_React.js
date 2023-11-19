import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class Display extends Component {
    
    state = { 
        item:[]
     } 

    componentDidMount=()=>    {
     
      fetch("http://localhost/temp/SelectSend.php").then(
        res=>res.json()
      ).then(
        (res)=>this.setState({item:res})
      ).catch((e)=>console.log("ERROR",e))

    }
    // componentDidUpdate=()=>{this.componentDidMount}
 
    render() {
 
        // const {item}=this.state
        // console.log("Items",item);
        return (
          
            <div className='container'>
                <div className='row'>
                {/* {"Name":"Madhubalan","Regno":"21UCS126",
                "Gender":"Male","Date":"2023-07-05",
                "Mobile":"2147483647","Email":"madhu@gmail.com",
                "Address":"St Xaviers COllege","Country":"INDIA",
                "Password":"Madhu123","CPassword":"Madhu123",
                "CreatedOn":"2023-07-23"} */}
               <div className='col-md-3 col-lg-12 '>
                {/* <button onClick={this.fetchdata} className='btn btn-primary'>Click</button> */}
                <div className='table table-responsive'>
                <h2 style={{}} className=' text-center p-2'>Table of Contents fetched via Fetch Api from PHP</h2>
                
                  <table className='table table-hover table-bordered'>
                    
                <thead  >
                    <tr className='text-uppercase text-center'>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Created On</th>
                        
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.item.map((it)=>(
                        
                        <tr key={it.Email}>
                        <td>{it.Email}</td>
                        <td>{it.Password}</td>
                        <td>{it.CreatedOn}</td>
                        
                      </tr>
                    ))
                    
                    
                }
                </tbody>
                </table>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default Display;
