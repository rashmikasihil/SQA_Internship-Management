// controllers/userController.js
import User from "../models/User.js";
import { compare  }  from "bcrypt";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";


// Register user
export const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, fullname,namewithinitials,address,contactnumber,nic,dob,District,language,email, password, role, adminID } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      
      username,
      fullname,
      namewithinitials,
      address,
      contactnumber,
      nic,
      dob,
      District,
      language,
      email,
      password: hashedPassword,
      role,
      adminID,
    });

    // Save the user to the database
    const user = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        role: user.role, // You can choose not to send the password in the response
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Reusable function for login
const performLogin = async (identifier, password, roleField, res) => {
  try {
    // Find user based on provided identifier (adminID or email)
    const query = {};
    query[roleField] = identifier; // Dynamically match field (email/adminID)

    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate user role
    if (roleField === "adminID" && user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    if (roleField === "email" && user.role !== "intern") {
      return res.status(403).json({ message: "Not authorized as intern" });
    }

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { adminID, password } = req.body;

    // Find the user by adminID
    const user = await User.findOne({ adminID });
    if (!user) {
      return res.status(400).json({ message: "Invalid adminID or password" });
    }

    // Verify that the user has the admin role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid adminID or password" });
    }

    // Generate a JWT that expires in 1 hour
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Intern login
export const loginIntern = (req, res) => {
  const { email, password } = req.body;
  performLogin(email, password, "email", res);
};




//admin login
// export const loginadmin = async (req, res) => {
//   try {
//     const { adminID, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ adminID });
//     if (!user) return res.status(400).json({ message: "Invalid adminId or password" });

//     // Compare password
//     const isMatch = await compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid adminId or password" });

//     // Generate JWT with user ID and role
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };






const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads"); // Ensure absolute path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


// File filter for PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
}).single("file");

// Upload PDF function
export const uploadPDF = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      res.status(200).json({
        message: "File uploaded successfully",
        filePath: req.file.path,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
};


// Reset password




// Generate Reset Password Token
// export const requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Create reset token (valid for 1 hour)
//     const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Generate reset link
//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
//     const subject = 'Password Reset Request';
//     const text = `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`;

//     // Send email
//     await sendEmail(email, subject, text);

//     res.status(200).json({ message: 'Password reset link sent to your email' });
//   } catch (error) {
//     console.error('Error requesting password reset:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset Password
// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Update user password
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Error resetting password:', error.message);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(400).json({ message: 'Reset token expired' });
//     }
//     res.status(500).json({ message: 'Server error' });
//   }
// };



