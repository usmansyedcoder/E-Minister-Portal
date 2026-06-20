const mongoose = require("mongoose");

// Generate tracking ID
const generateTrackingId = () => {
  const prefix = "SUG";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const suggestionSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    default: generateTrackingId,
  },
  citizenName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Healthcare",
      "Education",
      "Infrastructure",
      "Agriculture",
      "Electricity",
      "Water",
      "Roads",
      "Other",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  ministerRemarks: {
    type: String,
    default: "",
  },
  resolvedDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp on save
suggestionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
