import mongoose from "mongoose";
import { Db_Name, MONGODB_URI } from "../constants/constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${Db_Name}`
    );
    console.log(
      `Database Connected Successfully with  ${connectionInstance.connection.host} !!!`
    );
  } catch (error) {
    console.log("Error while connecting with Database", error);
    process.exit(1);
  }
};

export default connectDb;
