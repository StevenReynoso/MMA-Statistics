import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FightSchema = new Schema ({
    ID: Number,
    Fight_Num: Number,
    Event_Card: String,
    Event_Weight: String,
    Red_Event_fighter_image: String,
    Red_Fighter_Name: String,
    Red_Fighter_Nickname: String,
    Blue_Fighter_Name: String,
    Blue_Event_fighter_image: String,
    Blue_Fighter_Nickname: String


    
});

const Fight = mongoose.model('Fight', FightSchema);

export default Fight;