// models/Scheme.js

import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
      required: true,
    },
    totalAllocation: {
      type: Number,
      required: true,
    },
    onRequest: {
      type: Boolean,
      required: true,
    },
    recurring: {
      type: Boolean,
      required: true,
    },
    rotational: {
      type: Boolean,
      required: true,
    },
    perHeadAllowance: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    minimumQualifications: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Scheme = mongoose.model("Scheme", SchemeSchema);

export default Scheme;
