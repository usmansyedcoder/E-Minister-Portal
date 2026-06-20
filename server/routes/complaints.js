const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { protect, ministerOnly } = require("../middleware/auth");

// Create complaint
router.post("/", async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all complaints (Public - for testing)
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get complaints for minister dashboard
router.get("/minister", protect, ministerOnly, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single complaint
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Add this route to complaints.js
// Get complaint by tracking ID (Public - for citizens to check status)
router.get("/track/:trackingId", async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      trackingId: req.params.trackingId.toUpperCase(),
    });

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found with this tracking ID",
      });
    }

    res.json({
      success: true,
      data: {
        trackingId: complaint.trackingId,
        citizenName: complaint.citizenName,
        subject: complaint.subject,
        category: complaint.category,
        status: complaint.status,
        ministerRemarks: complaint.ministerRemarks,
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt,
        resolvedDate: complaint.resolvedDate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
// Update complaint status (Minister only)
router.put("/:id/status", protect, ministerOnly, async (req, res) => {
  try {
    const { status, ministerRemarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status || complaint.status;
    complaint.ministerRemarks = ministerRemarks || complaint.ministerRemarks;
    complaint.updatedAt = Date.now();

    await complaint.save();

    res.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete complaint
router.delete("/:id", protect, ministerOnly, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    await complaint.deleteOne();

    res.json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
