import { Router } from "express";
import { getAppointmentData } from "../middlewares/getJsonData.js";
import { getAppointmentById } from "../middlewares/getJsonData.js";
import { createNewAppointment } from "../middlewares/getJsonData.js";
import { updateAppointment } from "../middlewares/getJsonData.js";
import { deleteAppointment } from "../middlewares/getJsonData.js";


export const appointmentRouter = Router();

appointmentRouter.get("/", getAppointmentData, (req, res)=>{
    res.status(200).json(req.appointments);
});

appointmentRouter.get("/:id",getAppointmentById,  (req, res)=>{
    res.status(200).json(req.appointment);
});

appointmentRouter.post("/",createNewAppointment,  (req, res)=>{
    res.status(200).json(req.newAppointment);
});

appointmentRouter.put("/:id",updateAppointment,  (req, res)=>{
    res.status(200).json(req.updatedAppointment);
});

appointmentRouter.delete("/:id",deleteAppointment, (req, res)=>{
    res.status(200).json(req.updatedAppointmentData);
});