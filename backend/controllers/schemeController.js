// controllers/schemeController.js

import Scheme from "../models/Scheme.js";

// Create a new scheme
export const createScheme = async (req, res) => {
  try {
    const {
      schemeName,
      totalAllocation,
      onRequest,
      recurring,
      rotational,
      perHeadAllowance,
      description,
      minimumQualifications,
    } = req.body;

    const newScheme = new Scheme({
      schemeName,
      totalAllocation,
      onRequest,
      recurring,
      rotational,
      perHeadAllowance,
      description,
      minimumQualifications,
    });

    await newScheme.save();
    res.status(201).json({ message: "Scheme created successfully", scheme: newScheme });
  } catch (error) {
    res.status(500).json({ message: "Error creating scheme", error: error.message });
  }
};

// Get all schemes
export const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching schemes", error: error.message });
  }
};

// Get a single scheme by ID
export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json({ success: true, scheme });
  } catch (error) {
    res.status(500).json({ message: "Error fetching scheme", error: error.message });
  }
};

// Update a scheme
export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json({ message: "Scheme updated successfully", scheme });
  } catch (error) {
    res.status(500).json({ message: "Error updating scheme", error: error.message });
  }
};

// Delete a scheme
export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json({ message: "Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting scheme", error: error.message });
  }
};
