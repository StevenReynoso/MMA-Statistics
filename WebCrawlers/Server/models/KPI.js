import mongoose from "mongoose";

const Schema = mongoose.Schema;


// // Event Schema
// const EventSchema = new Schema({
//     eventName: String,
//     date: Date,
//     location: String,
//     mainCardFighters: [{ type: Schema.Types.ObjectId, ref: 'Fighter' }],
//     undercardFighters: [{ type: Schema.Types.ObjectId, ref: 'Fighter' }],
//     // Add other event attributes here
// });

// KPI Schema
const KPISchema = new Schema({
    Fighter_ID : {
        type: Number,
        required: true,
    },
    W: Number,
    L: Number,
    D: Number,
    Belt: Number,
    SLpM: Number,               
    "Str.Acc":  {
        type: String,
        required: false,
    },  
    SApM: Number,
    "Str.Def":  {
        type: String,
        required: false,
    },
    "TD Avg": Number,
    "TD Acc":  {
        type: String,
        required: false,
    },
    "TD Def":  {
        type: String,
        required: false,
    },
    "Sub. Avg": Number,
    "Total Fights": Number,
    // Add other KPIs here
},
    { toJSON: { getters: true }}
);

// Compile models from schemas

//const Event = mongoose.model('Event', EventSchema);
const KPI = mongoose.model("KPI", KPISchema);

export default KPI; // add event when data is ready for it