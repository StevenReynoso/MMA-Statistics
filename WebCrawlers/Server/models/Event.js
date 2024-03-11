import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const EventSchema = new Schema ({
    ID: Number,
    Event_Name: String,
    Event_Date: String,
    Red_Fighter_images: String,
    Blue_Fighter_images: String,
    
});

const Event = mongoose.model('Event', EventSchema);

export default Event;