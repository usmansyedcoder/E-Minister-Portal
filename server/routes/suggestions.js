const express = require("express");
const router = express.Router();
const Suggestion = require("../models/Suggestion");
const { protect, ministerOnly } = require("../middleware/auth");

// Create suggestion
router.post("/", async (req, res) => {
  try {
    const suggestion = await Suggestion.create(req.body);
    res.status(201).json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all suggestions
router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: suggestions.length,
      data: suggestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get suggestions for minister dashboard
router.get("/minister", protect, ministerOnly, async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: suggestions.length,
      data: suggestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single suggestion
router.get("/:id", async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update suggestion status (Minister only)
router.put("/:id/status", protect, ministerOnly, async (req, res) => {
  try {
    const { status, ministerRemarks } = req.body;

    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    suggestion.status = status || suggestion.status;
    suggestion.ministerRemarks = ministerRemarks || suggestion.ministerRemarks;
    suggestion.updatedAt = Date.now();

    await suggestion.save();

    res.json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete suggestion
router.delete("/:id", protect, ministerOnly, async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    await suggestion.deleteOne();

    res.json({
      success: true,
      message: "Suggestion deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
