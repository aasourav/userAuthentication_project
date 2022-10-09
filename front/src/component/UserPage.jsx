import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials= true;
let firstRender  = true;

export default function UserPage(){
    const [user,setUser] = useState();
    
    const refreshToken = async()=>{
        try{
            const res = await axios.get('http://localhost:8800/refresh',{
                 withCredentials:true
            })
            console.log("Ref Data: ",res.data.name)
            return res.data;
        }
        catch(er){
            console.log("Error in RefreshToken axios")
        }
        
    }
    const sendRequest = async()=>{
        try{
            console.log("I am Calling Get Request...")
            const res =  await axios.get('http://localhost:8800/user',{
            withCredentials:true
        })
        //   const Ret = await res.data;
        // if(res.status===200)
        //     return res.data;
            // console.log("Ref Data: ",res.data.name)
            return res.data
        }
        catch(er){
            console.log("User: Error In sendRequest")
        }

        
    }
    // useEffect(()=>{
    //     const getData = async()=>{
    //         try{
    //            const Val = await sendRequest() 
    //            console.log("HellO:",Val.name)
    //            setUser({
    //             user:Val.name
    //            })
    //         }catch(er){
    //             // console.log("User: error in useEffect")
    //             console.log(er)
    //         }
    //     }
    //     getData();
    // },[])
    
    useEffect(()=>{
        if(firstRender ){
            firstRender = false
            sendRequest().then((p)=> setUser(p.name))
        }
        else{
            let interval = setInterval(()=>{
                refreshToken().then(data=>setUser(data.name))
                console.log("Interval Runniong...")
            },1000*20) 
            
            return ()=>{
                console.log("clear interval called")
                clearInterval(interval)
            }
        }
    },[user])
    console.log(firstRender)

    
    const hanldleLogout = async()=>{
        try{
            console.log("I am Logging out...")
            const res =  await axios.post('http://localhost:8800/logout',{
            withCredentials:true
        })
            // return res.data
            console.log(res.data)
        }
        catch(er){
            console.log("User: Error In sendRequest")
        }
    }
    return(
        <div>
           {user? <h3>Hello {user}</h3>  : <h3>Guest User</h3>}
           {user? <button onClick={hanldleLogout}>Logout</button> : <p></p>}
        </div>
    )
}