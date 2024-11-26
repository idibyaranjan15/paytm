import express from "express";
import { PORT } from "./constants/constants.js";
import connectDb from "./db/connectDb.js";

const app = express();
app.use(express.json());
connectDb();
app.listen(PORT, () => {
  console.log(`server is running in Dope-Mode on Port ${PORT}...`);
});
