const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    alunoId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nota: { type: Number, min: 1, max: 5, required: true },
    sentimento: { type: String, enum: ["positivo", "neutro", "negativo"], required: true },
    comentario: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
