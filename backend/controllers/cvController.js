import Internship from "../models/CV.js";
import { upload } from "../middleware/uploadMiddleware.js"; // Import multer configuration
import Interview from "../models/Interview.js";

// Controller to add a new CV
export const addNewCV = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { 
        gender,
        nameWithInitials,
        postalAddress,
        district,
        dateOfBirth,
        nic,
        fullName,
        internshipCategory,
        higherEducationInstitute,
        applyAs,
        olResults,
        alResults,
        mobileNumber,
        landPhoneNumber,
        emergencyContact,
        emergencyContact2,
        emergencyContactname,
        emergencyContact2name,
        email,
        institute,
       
      } = req.body;

      const cvFile = req.files?.cvFile?.[0]?.path || null;
      const additionalFiles = req.files?.additionalFiles?.[0]?.path || null;

      // Get user ID from the token (set by middleware)
      const user = req.user?.id;

      if (!user) {
        return res.status(403).json({ message: "User ID is missing" });
      }

      // Generate Reference Number (Auto-incrementing)
      const latestCV = await Internship.findOne().sort({ createdAt: -1 }); // Get the latest added CV
      let newReferenceNumber = "CV-2024-001"; // Default for first CV

      if (latestCV && latestCV.referenceNumber) {
        const lastNumber = parseInt(latestCV.referenceNumber.split("-")[2], 10); // Extract number
        newReferenceNumber = `CV-2024-${(lastNumber + 1).toString().padStart(3, "0")}`;
      }

      // Create a new Internship document
      const newCV = new Internship({
        user,
        gender,
        nameWithInitials,
        postalAddress,
        district,
        dateOfBirth,
        nic,
        fullName,
        internshipCategory,
        higherEducationInstitute,
        applyAs,
        olResults,
        alResults,
        mobileNumber,
        landPhoneNumber,
        email,
        institute,
        emergencyContact,
        emergencyContact2,
        emergencyContactname,
        emergencyContact2name,
        cvFile,
        additionalFiles,
        referenceNumber: newReferenceNumber, // Assign reference number
      });

      const savedCV = await newCV.save();

      res.status(201).json({
        message: "CV added successfully",
        cv: savedCV,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to add CV",
        error: error.message,
      });
    }
  });
};



// get all cvs
export const getAllCVs = async (req, res) => {
  try {
    const cvs = await Internship.find();

    res.status(200).json({ cvs });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};



// Controller to update a CV
export const updateCV = async (req, res) => {
  const cvId = req.params.id;
  const updateData = req.body; // For instance, { status: 'approved' }

  try {
    // Find the CV by ID and update it with the new data
    const updatedCV = await Internship.findByIdAndUpdate(cvId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the schema
    });

    if (!updatedCV) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({
      message: "CV updated successfully",
      cv: updatedCV,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update CV",
      error: error.message,
    });
  }
};

// Alternatively, if you want a dedicated controller for updating just the status:
export const updateCVStatus = async (req, res) => {
  const cvId = req.params.id;
  const { status } = req.body; // For example, status could be 'approved' or 'pending'

  try {
    const cv = await Internship.findById(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Update only the status field
    cv.status = status;
    const savedCV = await cv.save();

    res.status(200).json({
      message: "CV status updated successfully",
      cv: savedCV,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update CV status",
      error: error.message,
    });
  }
};




// get all pending cvs
export const getAllPendingCVs = async (req, res) => {
  try {
    const cvs = await Internship.find({ status: "pending" });

    res.status(200).json({ cvs });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};


//get all approved cvs
export const getAllApprovedCVs = async (req, res) => {
  try {
    const cvs = await Internship.find({ status: "approved" ,isAssigned:false});

    res.status(200).json({ cvs });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};


// Controller to assign an interview to a CV
export const assignInterviewToCV = async (req, res) => {
  const { interviewID } = req.body; // Interview ID from request
  const cvId = req.params.id; // CV ID from URL

  try {
    // Find the CV
    const cv = await Internship.findById(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Find the Interview
    const interview = await Interview.findById(interviewID);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Assign the interview to the CV
    cv.interview = interviewID;
    cv.isAssigned = true; // Set the flag
    await cv.save();

    

    // Add the intern fullname  to the Interview's assignedInterns array (avoid duplicates)
    if (!interview.assignedInterns.includes(cvId,)) {
      interview.assignedInterns.push(cvId);
      await interview.save();
    }

    res.status(200).json({
      message: "CV assigned to interview successfully",
      cv,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to assign CV to interview",
      error: error.message,
    });
  }
};



export const getAllScheduleCVs = async (req, res) => {
  try {
    const cvs = await Internship.find({  isAssigned:true });

    res.status(200).json({ cvs });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};
export const getallinterview = async (req, res) => {
  try {
    const cvs = await Internship.find({ interviewStatus: "pending" });

    res.status(200).json({ cvs });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};

export const getpassinterview = async (req, res) => {
  try {
    const cvs = await Internship.find({ interviewStatus: "pending" });

    res.status(200).json({ cvs });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CVs",
      error: error.message,
    });
  }
};







// get by id 
export const getCVById = async (req, res) => {
  const cvId = req.params.id;

  try {
    const cv = await Internship.findById(cvId);

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({ cv });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CV",
      error: error.message,
    });
  }
};




// update interview status
export const updateInternshipStatus = async (req, res) => {
  const cvId = req.params.id;
  const { interviewStatus } = req.body; // For example, status could be 'pass' or 'fail'

  try {
    const cv = await Internship.findById(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Update only the status field
    cv.interviewStatus = interviewStatus;
    const savedCV = await cv.save();

    res.status(200).json({
      message: "CV interview status updated successfully",
      cv: savedCV,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update CV interview status",
      error: error.message,
    });
  }
};

export const getCVStatusByUserId = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const cv = await Internship.findOne({ user: userId }).select(
      "status referenceNumber nameWithInitials applyAs"
    );

    if (!cv) {
      return res.status(404).json({ message: "No CV found for this user" });
    }

    res.status(200).json({
      status: cv.status,
      referenceNumber: cv.referenceNumber,
      nameWithInitials: cv.nameWithInitials,
      applyAs: cv.applyAs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch CV status",
      error: error.message,
    });
  }
};

