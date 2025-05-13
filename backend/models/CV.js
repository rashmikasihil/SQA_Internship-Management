import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gender:{
      type: String
    },
    nameWithInitials: {
      type : String
    },
    postalAddress : {
      type : String
    },
    district: {
      type : String
    },

    dateOfBirth: {
      type : Date
    },

    nic: {
      type: String
    },

    fullName:{
      type : String
    },
   
    internshipCategory: { type: String, required: true },
    higherEducationInstitute: { type: String, required: true },
    applyAs: {
      type: String,
      enum: ["internship", "dataoperator"],
      default: "internship",
    },
    olResults :{
      type : String
    },
    alResults:{
      type : String
    },
    mobileNumber:{
      type: String
    },
    landPhoneNumber: {
      type : String
    },
    email: {
      type: String
    },
    institute: {
      type : String
    },
    cvFile: { type: String }, // Optional field for uploaded PDF path
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    interview: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Interview" 
    },
    isAssigned: {
       type: Boolean, default: false
       },
    emergencyContact: {
      type : String
    },
    emergencyContactname: {
      type : String
    },
    emergencyContact2 :{
      type : String
    },
    emergencyContact2name :{
      type : String
    },
    referenceNumber: { type: String, unique: true },  
    interviewStatus: {
       type : String,
        enum: ["pending", "pass", "fail"],
        default: "pending",
      },
    
    additionalFiles: { type: String }, // Fixed typo
  }, { timestamps: true }); // Automatically adds createdAt and updatedAt fields
  
  const Internship = mongoose.model("Internship", internshipSchema);
  export default Internship;
  