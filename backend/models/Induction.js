
import { Schema, model } from "mongoose";

const InductionSchema = new Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: String, required: true }
});

export default model("Induction", InductionSchema);
