import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    ID: Number,
    Event_Name: String,
    Event_Date: String,
    Red_Fighter_images: String,
    Blue_Fighter_images: String,
    
});

const Event = mongoose.model('Event', EventSchema);

export default Event;