// @ts-nocheck
import { RequestHandler } from "express";
import Kitchen from "#/model/kitechen";
import { isValidObjectId } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

export const createKitchen: RequestHandler = async (req, res) => {
  const {
    email,
    password,
    name,
    description,
    image,
    startTime,
    endTime,
    tags,
  } = req.body;

  try {
    // Check if a kitchen with the same name or email already exists
    const existingKitchen = await Kitchen.findOne({
      $or: [{ name }, { email }],
    });
    if (existingKitchen) {
      return res.status(400).json({ message: "Kitchen already exists!" });
    }

    // Create a new kitchen
    const newKitchen = new Kitchen({
      email,
      password,
      name,
      description,
      image,
      startTime,
      endTime,
      tags,
    });
    await newKitchen.save();

    // Send the newly created kitchen in the response
    return res.json({ newKitchen });
  } catch (error) {
    console.error("Error creating kitchen:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating kitchen" });
  }
};

export const getAllKitchens: RequestHandler = async (req, res) => {
  const kitchens = await Kitchen.find().select("-password");
  if (!kitchens)
    return res.status(400).json({ message: "Cannot find kitchens!" });
  return res.json({ kitchens });
};

export const getKitchenById: RequestHandler = async (req, res) => {
  const { kitchenId } = req.params;
  const kitchen = await Kitchen.findById(kitchenId);
  if (!kitchen)
    return res.status(400).json({ message: "Cannot find kitchen!" });
  return res.json({ kitchen });
};

export const updateKitchen: RequestHandler = async (req, res) => {
  const { kitchenId } = req.params;
  const { name, description, image, startTime, endTime, tags } = req.body;
  if (!isValidObjectId(kitchenId))
    return res.status(400).json({ message: "Invalid kitchen id!" });
  const kitchen = await Kitchen.findByIdAndUpdate(
    kitchenId,
    { name, description, image, startTime, endTime, tags },
    { new: true }
  );
  if (!kitchen)
    return res.status(400).json({ message: "Something went wrong!" });
  return res.json({ kitchen });
};

export const kitchenSignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the kitchen by email
    const kitchen = await Kitchen.findOne({ email });

    // Check if the kitchen exists
    if (!kitchen) {
      return res.status(403).json({ message: "Invalid email/password" });
    }

    // Compare the provided password with the stored password
    const matched = await kitchen.comparePassword(password);

    // Check if the passwords match
    if (!matched) {
      return res.status(403).json({ message: "Email/Password Mismatch!" });
    }

    // Generate JWT token
    // const token = jwt.sign({ kitchenId: kitchen._id, name: kitchen.name }, process.env.JWT_SECRET) as JwtPayload;
    const token = jwt.sign(
      { kitchenId: kitchen._id, name: kitchen.name },
      "secret"
    ) as JwtPayload;

    const decoded = jwt.decode(token) as JwtPayload;
    console.log(decoded);

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

// export const addProductToKitchen = async (req: Request, res: Response) =>{
//     const {productId} = req.body;
// }

export const approveKitchen: RequestHandler = async (req, res) => {
    const {kitchenId} = req.body;
    const kitchen = await Kitchen.findById(kitchenId);
    if(!kitchen) return res.status(400).json({message: "Something went wrong!"});
    if(kitchen.status === "pending"){
        kitchen.status = "active"
        await kitchen.save();
    }else{
        return res.status(400).json({message: "Kitchen already active!"})
    }
    res.json({message: true});
}