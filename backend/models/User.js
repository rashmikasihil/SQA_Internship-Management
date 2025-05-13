// models/User.js
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  adminID: { type: String },
  fullname: { type: String, required: true },
  namewithinitials: { type: String, required: true },
  address: { type: String, required: true },
  contactnumber: { type: String, required: true },
  nic: { type: String, required: true, unique: true, sparse: true },
  dob: { type: Date, required: true },
  District: { type: String, required: true },
  language: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "intern", "supervisor"], default: "intern", required: true },
  resetToken: String,
  resetTokenExpire: Date,
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Verify password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default User;
