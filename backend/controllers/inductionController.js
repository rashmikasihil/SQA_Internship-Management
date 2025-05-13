import Induction from "../models/Induction.js";

export async function getAllInductions(req, res) {
  try {
    const inductions = await Induction.find(); // 
    res.json(inductions);
  } catch (error) {
    console.error("Error fetching inductions:", error); // Logs error for debugging
    res.status(500).json({ message: "Server error" });
  }
}

export async function createInduction(req, res) {
  try {
    const newInduction = new Induction(req.body);
    await newInduction.save();
    res.status(201).json(newInduction);
  } catch (error) {
    res.status(400).json({ message: "Error creating induction" });
  }
}

export async function deleteInduction(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.json({ message: "Induction deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting induction" });
  }
}

//get all inductions
