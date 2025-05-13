import Interview from "../models/Interview.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Create a new interview
export const createInterview = async (req, res) => {
  try {
    const { title, date, time, location,description, adminID, assignInterns } = req.body;

    const interview = new Interview({
      title,
      date,
      time,
      location,
      description,
      adminID,
      assignedInterns: assignInterns,
      
    });

    await interview.save();
    res.status(201).json({ success: true, message: "Interview created successfully", interview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating interview", error });
  }
};

// Assign interns to an interview
export const assignInterns = async (req, res) => {
  try {
    const { interviewID, internIDs } = req.body;

    const interview = await Interview.findById(interviewID);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    // Add the interns to the interview
    interview.assignedInterns = [...new Set([...interview.assignedInterns, ...internIDs])];

    await interview.save();
    res.status(200).json({ success: true, message: "Interns assigned successfully", interview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error assigning interns", error });
  }
};

// Get all interviews
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("adminID", "fullname email").populate("assignedInterns", "fullname email");
    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving interviews", error });
  }
};

// Get a specific interview
export const getInterviewById = async (req, res) => {
  try {
    const { interviewID } = req.params;

    const interview = await Interview.findById(interviewID).populate("assignedInterns.objectId", "fullname email");

    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    // Extract the assigned interns array
    const assignedInterns = interview.assignedInterns;

    res.status(200).json({ success: true, interview, assignedInterns });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving interview", error });
  }
};


// Delete an interview
export const deleteInterview = async (req, res) => {
  try {
    const { interviewID } = req.params;

    const interview = await Interview.findByIdAndDelete(interviewID);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    res.status(200).json({ success: true, message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting interview", error });
  }
};


//get all interview 
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving interviews", error });
  }
};


