const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    data: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
