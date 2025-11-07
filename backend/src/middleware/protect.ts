import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


interface JwtPayload {
  id: number;
  email: string;
}


export const protectRoute = async ( req: Request,res: Response,next: NextFunction)=>{
const token = req.cookies?.token;
if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = decoded; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}