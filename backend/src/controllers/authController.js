import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
};

export const registerUser=async(req,res)=>{
    
    const {name,email,password,role}=req.body;

    const userExists=await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:"User already registered with this email"});

    }

    const salt=await bcrypt.genSalt(16);

    const hashedPassword=await bcrypt.hash(password,salt);

    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        role:role||"customer",
    });

    res.status(201).json({
        token:generateToken(user._id),
    });
};

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.status(401).json({message:"invalid email"});
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(401).json({message:"invalid password"});
    }

    res.json({
        token:generateToken(user._id),
    });
};