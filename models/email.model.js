import { Schema, model } from "mongoose";

const EmailSchema = new Schema({
  recipient: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  attachments: {
    type: Array,
  },
  scheduleTime: {
    type: Date,
    required: true,
  },
  recurrence: {
    type: String,
    enum: ["none", "daily", "weekly", "monthly", "quarterly"],
    default: "none",
  },
  recurrenceDetails: {
    type: Object,
  },
});

export default model("Email", EmailSchema);
