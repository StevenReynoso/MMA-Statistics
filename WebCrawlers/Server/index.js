import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import fightRoutes from "./routes/fight.js"
import fighterRoutes from "./routes/fighter.js";
import eventRoutes from "./routes/event.js";
import KPI from "./models/KPI.js";
import Fighter from "./models/Fighter.js";
import Event from "./models/Event.js";
import Fight from "./models/Fight.js";
import { data } from "../UFC Stats_Scrapped/data.js";
import { Events_dates_data } from "../UFC Stats_Scrapped/UFC_Events/Event_Dates_data.js";
import { Events_Fights_data } from "../UFC Stats_Scrapped/UFC_Events/Event_Fights_data.js";


/* Configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* Routes */
app.use("/kpi", kpiRoutes);
app.use("/fighter", fighterRoutes);
app.use("/event", eventRoutes);
app.use("/fight", fightRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    
  })
  .then(async () => {
    // Drop the database
    await mongoose.connection.db.dropDatabase();
    
      // grab data when needed
    await Fighter.insertMany(data);
    await KPI.insertMany(data);
    await Event.insertMany(Events_dates_data);
    await Fight.insertMany(Events_Fights_data)

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

