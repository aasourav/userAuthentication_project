import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './reg.css';
export default function Login(){
    const navigate = useNavigate()
    const [data,setData] = useState({
        user:'',
        pass:'',
    })
    const dataSend = async()=>{
        const {pass,user} = data;
        try{
            const res = await axios.post("http://localhost:8800/login",{
            pass,user
             })
            //  const Res = res.data;
             return res.data
        }
        catch(err){
            console.log("Login : Error In DataSend")
        }

        
    }
    const handleChange = (e)=>{
        setData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async(e)=>{
            e.preventDefault();
            try{
                const Data = await dataSend()
                console.log(Data)
                
            }
            catch(er){
                console.log("Error On Handle SUbmit In Login")
            }
            navigate('/')
            // console.log(d.id.name)
        
        // const {email,pass} = data
        // const res = await fetch('http://localhost:8800/login',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type' : 'application/json'
        //     },
        //     body:JSON.stringify({
        //         email,pass
        //     })
        // })
        // const d = await res.json()
        // if(d.user){
        //     alert('Login Successful')
        //     localStorage.setItem('token',d.user)
        //     window.location.href='/'
        //     // console.log(localStorage.getItem('token'))
        // }
        // else{
        //     alert('Login Failed')
        // }
    }
    return(
        <div className="main">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={data.user} name='user' onChange={handleChange} />
                <br />
                <input type="password" name="pass" value={data.pass} onChange={handleChange} />
                <br />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}