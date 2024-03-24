import { RequestHandler } from "express";
import Rider from "#/model/rider";
import jwt, { JwtPayload } from "jsonwebtoken"

export const riderSignUp: RequestHandler = async (req, res) =>{
    const {email, name, password, phone, licenseNumber} = req.body
    const rider = await Rider.findOne({email});
    if(rider) return res.status(400).json({message: "Rider email already exist!"});
    const newRider = new Rider({email, name, password, phone, licenseNumber});
    await newRider.save();
    res.status(201).json({message: "Rider created successfully!"});
}

export const riderSignIn: RequestHandler = async (req, res) => {
    const {email, password} = req.body;
    const rider = await Rider.findOne({email});
    if(!rider) return res.status(400).json({message: "Email/Paswword mismtach!"})
    const matched = rider.comparePassword(password);
    if(!matched) return res.status(400).json({message: "Email/Password mismatch!"});
    const token = jwt.sign({riderId: rider._id, name: rider.name, email: rider.email, phone: rider.phone, licenseNumber: rider.licenseNumber }, 'secret') as JwtPayload;
    const decoded = jwt.decode(token) as JwtPayload;
    console.log(decoded);
    res.json({token})
}

export const updateRiderDetails: RequestHandler = async (req, res) => {
    const riderId = req.params;
    const {} = req.body;
}