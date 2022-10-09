import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './reg.css';

function Registration(){
    const navigate = useNavigate();
    const[data,setData] = useState({
        name:'',
        email:'',
        password:'',
    })
    const handleChange = (e)=>{
        // const temp = data;
        // temp[e.target.name] = e.target.value;
        // const {name,email,password} = temp
        // setData({
        //     ...data,
        //     name,email,password
        // })
        setData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
        
    }
    const dataSend = async()=>{
        const {password,name,email} = data;
        const res = await axios.post("http://localhost:8800/signup",{
            password,name,email
        })
        .catch(err=>console.log(err));

        const Res = await res.data;
        return Res;
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // const {name,email,password} = data
        
        // const res = await fetch('http://localhost:8800/regestration',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify({
        //         name,email,password                
        //     })
        // })
        // const d =await res.json()
        dataSend()
        navigate('/login')
        setData({
            name:'',
            email:'',
            password:'',
        })
    } 
    return(
        <div className="main">
            <h1>Registratin</h1>
           <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="name" placeholder="Name" value={data.name} />
                <br/>
                <input value={data.email} onChange={handleChange} type="email" name="email" placeholder="Email" />
                <br />
                <input value={data.password} onChange={handleChange} type="password" name="password" placeholder="Password" />
                <br />
                <input type="submit" value="Submit" />
                {data.da? <p>{data.da.name}</p> : <p></p>}
           </form>
        </div>
    )
}
export default Registration