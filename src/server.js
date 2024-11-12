import express from "express";
import { petsRouter } from "./routes/petsRouter.js";
import { appointmentRouter } from "./routes/appointmentRouter.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/pets", petsRouter);
app.use("/appointment", appointmentRouter);
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(err.status || 400).json({ message: err.message });
});

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});