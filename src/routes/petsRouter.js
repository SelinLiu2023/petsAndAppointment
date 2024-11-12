import { Router } from "express";
import { getPetsData } from "../middlewares/getJsonData.js";
import { getPetById } from "../middlewares/getJsonData.js";
import { createNewPet } from "../middlewares/getJsonData.js";
import { updatePet } from "../middlewares/getJsonData.js";
import { deletePet } from "../middlewares/getJsonData.js";

export const petsRouter = Router();

// petsRouter.use("/", getPetsData);
petsRouter.get("/", getPetsData, (req, res)=>{
    res.status(200).json(req.pets);
});

petsRouter.get("/:id",getPetById, (req, res)=>{
    res.status(200).json(req.pet);
});

petsRouter.post("/",createNewPet, (req, res)=>{
    res.status(200).json(req.newPet);
});

petsRouter.put("/:id",updatePet, (req, res)=>{
    res.status(200).json(req.updatedPet);
});

petsRouter.delete("/:id",deletePet, (req, res)=>{
    res.status(200).json(req.updatedPetsData);
});

