import mongoose from "mongoose";

const Schema = mongoose.Schema;


// Fighter Schema
const FighterSchema = new Schema({
    Fighter_ID : {
      type: Number,
      required: true,
    },
    First: {
     type: String,
     required: false,
    },
    Last: {
     type: String,
     required: false,
    }, 
    Nickname: {
     type: String,
     required: false,
    },
    "Ht.": {
    type: String,
    required: false,
    },
    "Wt.": {
     type: String,
     required: false,
       },
    Reach: {
     type: String,
     required: false,
       },
    Stance: {
     type: String,
     required: false,
    },
    "Weight Class": {
     type: String,
     required: false,
    },
    // Add other fighter attributes and statistics here
},
 { toJSON: { getters: true }}
);

const Fighter = mongoose.model('Fighter', FighterSchema);

export default Fighter;