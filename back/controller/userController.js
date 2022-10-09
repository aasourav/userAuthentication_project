const UserModel  = require('../models/registration')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const signup = async(req,res)=>{
    
    try{
        const hash = await bcrypt.hash(req.body.password,10)
        const uer = new UserModel({
            name:req.body.name,
            email:req.body.email,
            password: hash
        })
        await uer.save();
        console.log("User Created")
        res.send("User Created")
    }catch(e){
        console.log(e)
        res.status(500).json("User not created")
    }
    
}
const login = async(req,res)=>{
    try{
        const exist = await UserModel.findOne({name:req.body.user})
        // console.log(exist._id)
        if(exist){
            const chk = await bcrypt.compare(req.body.pass,exist.password);
            if(chk){
                const token = jwt.sign({
                    id:exist._id,
                    name:exist.name
                },process.env.JWT,{
                    expiresIn:60*0.5
                })
                // if(req.cookies[`${exist._id}`]){
                //     req.cookies[`${exist._id}`] = ''
                // }
                res.cookie(String(exist._id),token,{
                    path:'/',
                    expires:new Date(Date.now()+1000*30),
                    httpOnly: true,
                    sameSite: 'lax'
                })
                console.log("Logged In")
                res.json({status:'success',token,id:exist})
            }
            else{
                res.status(401).json("wrong Pass")
            }
        }
        else{
            req.status(401).send("User not Found!")
        }
        
    }catch(e){
        console.log(e)
        res.status(500).json("User Not found")
    }
    
}
const varifyToken = async(req,res,next)=>{
    const cookies = req.headers.cookie
     console.log(cookies);
    if(cookies){
        const authToken = cookies.split("=")[1]
        console.log("Verifying.....")
        try{
            const validate = jwt.verify(authToken,process.env.JWT)
             console.log(validate)
             if(validate){
                req.Id = validate.id
                // res.send({id:validate})
                next()
             }
        } 
        catch(er){
            console.log("Verify Token Error");
        }
    }
}

const getUser = async(req,res)=>{
    const Id = req.Id;
    // console.log(Id)
    try{
        user = await UserModel.findById(Id,"-password") 
        if(!user){
            return res.status(401).json("user not found")
        }
        // res.status(200).send({user})
        res.status(200).send(user)
    }
    catch(e){
        console.log(e)
    }
}

const refreshToken  = async(req,res,next)=>{
    const cookies = req.headers.cookie;
    try{
        if(cookies){
            const prevToken = cookies.split("=")[1]

            console.log("Prev Token: ",prevToken)

            const Res =  jwt.verify(prevToken,process.env.JWT)
            if(!Res){
                return res.status(403).json("User not Verifed refToken")
            }
            res.clearCookie(`${Res.id}`)
            req.cookies[`${Res.id}`]=''//remove cookie from header
  
            const token = jwt.sign({id:Res.id},process.env.JWT,{
                expiresIn:60*0.5
            })

            console.log("New Token: ",token)
            

            res.cookie(String(Res.id),token,{
                path:'/',
                expires:new Date(Date.now()+1000*30 ),
                httpOnly: true,
                sameSite: 'lax'
            })
            req.id = Res.id;
            next() 
        }   
        else{
            res.status(400).json("Couldn't find prevToken")
        }
    }
    catch(er){
        console.log("Error in backend refreshToken:",er)
    }
}
const logout = (req,res,next)=>{
    const cookies = req.headers.cookie;
    try{
        if(cookies){
            const prevToken = cookies.split("=")[1]

            // console.log("Prev Token: ",prevToken)

            const Res =  jwt.verify(prevToken,process.env.JWT)
            if(!Res){
                return res.status(403).json("User not Verifed refToken")
            }
            res.clearCookie(`${Res.id}`)
            req.cookies[`${Res.id}`]=''//remove cookie from header

            res.status(200).json({message: "Successfully logged out"})
        }   
        else{
            res.status(400).json("Couldn't find prevToken")
        }
    }
    catch(er){
        console.log("Error in backend refreshToken:",er)
    }
}

module.exports =  {
    signup,
    login,
    varifyToken,
    getUser,
    refreshToken, 
    logout
}