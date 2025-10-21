import jwt from "jsonwebtoken";

export default function verifyJWT(req,res,next){
        const header=req.header("Authorization");
        console.log("Authorization header:- ")
        console.log(header)

        if(header !=null){
            const token=header.replace("Bearer ","");
            console.log("User token:- ")
            console.log(token)
            jwt.verify(token,"random456",(err,decoded)=>{
                console.log("User details:- ")
                console.log(decoded)
                
                if (decoded!=null){
                    req.user=decoded
                    
                }
                
            }
            
        )
        }
        next();
    }