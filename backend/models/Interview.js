import mongoose from "mongoose";
import { type } from "os";

const interviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description:{
    type: String,
    require:true,
  },
  // assignedInterns: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "CV",
  //   },
  // ],
  

  adminID: { type: mongoose.Schema.Types.ObjectId, ref: "User",  },
  assignedInterns: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

}, { timestamps: true });

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
