import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function saveUser(req,res){

    if(req.body.role=="admin"){
        if(req.user==null){
            res.status(403).json(
                {
                    message:"Please login as admin before creating and admin account"
                }
            )
            return;

        }

        if(req.user.role!="admin"){
            res.status(403).json(
                {
                    message:"You are not authorized to create an admin account"
                }
            )
            return;
        }

    }


    //To create the hashed password
    console.log(req.body)
    const hashedPassword=bcrypt.hashSync(req.body.password,10);
    
    console.log(hashedPassword);
    const user=new User(
        {
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            role:req.body.role,
            password:hashedPassword,
            phone:req.body.phone,
            isDisabled:req.body.isDisabled,
            isEmailVerified:req.body.isEmailVerified

        }
    );


    user.save()
    .then(
        ()=>{
            res.json(
                {
                    message:"User saved successfully"
                }
            )
        }
    )
    .catch(
        ()=>{
            res.status(500).json(
                {
                    message:"User saved not successfull"
                }
            )
        }
    )

}

export function loginUser(req,res){
    const email=req.body.email;
    const password=req.body.password;
    User.findOne(
        {//search by using email
            email:email
        }
    ).then(
        (user)=>{
            if(user==null){
                res.status(404).json(
                    {
                        message:"Invalid Email"
                    }
                )

            }else{
                const isPasswordCorrect=bcrypt.compareSync(password,user.password)
                if(isPasswordCorrect){
                    
                    const userData={
                        email:user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        role:user.role,
                        phone:user.phone,
                        isDisabled:user.isDisabled,
                        isEmailVerified:user.isEmailVerified
                    }
                    
                    console.log("Registered user details")
                    console.log(userData)

                    //To generate the token
                    const token=jwt.sign(userData,"random456")
                    console.log("user successfully loggedin to the the system")
                    res.json(
                        {
                            message:"Login Successful",
                            token:token
                        }
                    )

                }else{
                    res.status(403).json(
                        {
                            message:"Invalid Passowrd"
                        }
                    )
                }

            }
        }
    )
}