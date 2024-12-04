import express from "express";
import { PORT } from "./constants/constants.js";
import connectDb from "./db/connectDb.js";
import colors from "colors";
import mainRouter from "./routes/user.router.js";
import accountRouter from "./routes/account.route.js";

const app = express();
app.use(express.json());

app.use("/api/user", mainRouter);
app.use("/api/account", accountRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(
    colors.rainbow(`server is running in Dope-Mode on Port ${PORT}...`)
  );
});
