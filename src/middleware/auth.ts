import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthorInstance } from "../model/authorModel";

// generate token
export const generateToken=(authorData:{[key:string]:unknown})=>{ 
    return jwt.sign({authorData}, process.env.MY_SECRET as string, {expiresIn:'7d'})
  }

// verify token
export async function verifyToken(req: Request, res:Response, next:NextFunction){
   
try {
 
    // const bearerHeader = req.headers.authorization
    const  bearerHeader = req.cookies.authorized

    
    // check if bearer is undefined 
    if(!bearerHeader ){
      //  res.status(404).json({ Error: "Author not verified" });
       return res.redirect('/')
    }
      // const token  = bearerHeader.split(' ')[1]   
      const token  = bearerHeader  
    
      

        let verified = jwt.verify(token, process.env.MY_SECRET as string);
        if(!verified){
         return  res.redirect('/')

            // return res.status(403).json({ Error: "Unauthorized user" })
        }
       
        const { authorData } = verified as Record<string, string>;
        const author = await AuthorInstance.findOne({ where: { id:authorData } });
        if (!author) {
            // return res.status(403).json({ Error: "Author not verified" });
           return res.redirect('/')
          }
       
          req.authorId = authorData
        next() 


       
} catch (error) {
  res.redirect('/')
    
    // res.status(403).json({Error: "Unauthorized"});
}
}
