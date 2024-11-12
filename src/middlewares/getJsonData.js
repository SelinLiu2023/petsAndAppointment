import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { v4 } from "uuid";

async function getFileData(filePath) {
    try{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const fullPath = join(__dirname, filePath);
        const file = await fs.readFile(fullPath, 'utf8');
        const data = JSON.parse(file);
        return data;
    }catch(error){
        console.log("error", error)
        throw new Error("failed to get file");
    }
};
async function setFileData(filePath, data) {
    try{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const fullPath = join(__dirname, filePath);
        await fs.writeFile(fullPath, JSON.stringify(data));
    }catch(error){
        console.log("error", error)
        throw new Error("failed to write file");
    }
};

export async function getPetsData(req, res, next) {
    try{
        const petsData = await getFileData("../../animals.json");
        req.pets = petsData;
        next();
    }catch(error){
        next("pets data failed to get.");
    }
};

export async function getPetById(req, res, next) {
    try{
        const id = req.params.id;
        const petsData = await getFileData("../../animals.json");
        const pet = petsData.find(pet=>pet.id === id);
        if(pet === undefined){
            const error = new Error("Can't find this pet.");
            error.status = 404; 
            throw error;
        }
        req.pet = pet;
        next();
    }catch(error){
        next(error);
    }
};
export async function createNewPet(req, res, next) {
    try{
        const petsData = await getFileData("../../animals.json");
        if(!req.body.owner || !req.body.name){
            throw new Error("Please input at least owner's name and pet's name.");
        }
        const pet = petsData.find(pet=>pet.owner === req.body.owner && pet.name === req.body.name);
        if(pet !== undefined){
            throw new Error(`Mr.${req.name} has already a pet named ${req.body.name}`);
        }
        const newPet = req.body;
        newPet.id = v4();
        petsData.push(newPet);
        await setFileData("../../animals.json", petsData);
        req.newPet = newPet;
        next();
    }catch(error){
        next(error);
    }
};
export async function updatePet(req, res, next) {
    try{
        const id = req.params.id;
        const petsData = await getFileData("../../animals.json");
        const pet = petsData.find(pet=>pet.id === id);
        if(pet === undefined){
            const error = new Error("This pet does't exist in our database.");
            error.status = 404; 
            throw error;
        }
        console.log("pet", pet);
        Object.keys(req.body).forEach(key => key !== "id" && (pet[key] = req.body[key]));
        await setFileData("../../animals.json", petsData);
        req.updatedPet = pet;
        next();
    }catch(error){
        next(error);
    }
};
export async function deletePet(req, res, next) {
    try{
        const id = req.params.id;
        let petsData = await getFileData("../../animals.json");
        const pet = petsData.find(pet=>pet.id === id);
        if(pet === undefined){
            const error = new Error("This pet does't exist in our database.");
            error.status = 404; 
            throw error;
        }
        petsData = petsData.filter(pet=> pet.id !== id);
        await setFileData("../../animals.json", petsData);
        req.updatedPetsData = petsData;
        next();
    }catch(error){
        next(error);
    }
};

export async function getAppointmentData(req, res, next) {
    try{
        const appointmentData = await getFileData("../../appointment.json");
        req.appointments = appointmentData;
        console.log(appointmentData);
        next();
    }catch(error){
        next("appointment data failed to get.");
    }
};
export async function getAppointmentById(req, res, next) {
    try{
        const id = req.params.id;
        const appointmentData = await getFileData("../../appointment.json");
        const appointment = appointmentData.find(appointment=>appointment.id === id);
        if(appointment === undefined){

            const error = new Error("Can't find this appointment.");
            error.status = 404; 
            throw error;
        }
        req.appointment = appointment;
        next();
    }catch(error){
        next(error);
    }
};
export async function createNewAppointment(req, res, next) {
    try{

        const petsData = await getFileData("../../animals.json");
        const pet = petsData.find(pet=>pet.id === req.body.petId);
        if(pet === undefined){
            const error = new Error("Can't find this pet for appointment.");
            error.status = 404; 
            throw error;
        }

        const appointmentData = await getFileData("../../appointment.json");
        const appointment = appointmentData.find(appointment=>appointment.date === req.body.date);
        if(appointment !== undefined){
            throw new Error("Termin at this date already exist.");
        }
       
        const newAppointment = req.body;
        newAppointment.id = v4();
        appointmentData.push(newAppointment);
        await setFileData("../../appointment.json", appointmentData);
        req.newAppointment = newAppointment;
        next();
    }catch(error){
        next(error);
    }
};
export async function updateAppointment(req, res, next) {
    try{
        const id = req.params.id;
        const appointmentData = await getFileData("../../appointment.json");
        const appointment = appointmentData.find(pet=>pet.id === id);
        if(appointment === undefined){
            const error = new Error("This appointment does't exist in our database.");
            error.status = 404; 
            throw error;

        }
        // console.log("appointment", appointment);
        Object.keys(req.body).forEach(key => key !== "id" && (appointment[key] = req.body[key]));
        await setFileData("../../appointment.json", appointmentData);
        req.updatedAppointment = appointment;
        next();
    }catch(error){
        next(error);
    }
};
export async function deleteAppointment(req, res, next) {
    try{
        const id = req.params.id;
        let appointmentData = await getFileData("../../appointment.json");
        const appointment = appointmentData.find(pet=>pet.id === id);
        if(appointment === undefined){
            const error = new Error("This appointment does't exist in our database.");
            error.status = 404; 
            throw error;
        }
        appointmentData = appointmentData.filter(appointment=> appointment.id !== id);
        await setFileData("../../appointment.json", appointmentData);
        req.updatedAppointmentData = appointmentData;
        next();
    }catch(error){
        next(error);
    }
};

