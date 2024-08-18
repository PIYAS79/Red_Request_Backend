import { Request, Response } from "express"



const Route_Not_Found = (req:Request,res:Response)=>{
    res.json({
        success:false,
        message:"Route Not Found *"
    })
}


export default Route_Not_Found;