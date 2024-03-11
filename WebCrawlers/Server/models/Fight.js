import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const FightSchema = new Schema ({
    ID: Number,
    Event_Card: String,
    Event_Weight: String,
    Red_Event_fighter_image: String,
    Red_Fighter_Name: String,
    Blue_Fighter_Name: String,
    Blue_Event_fighter_image: String

    
});

const Fight = mongoose.model('Fight', FightSchema);

export default Fight;