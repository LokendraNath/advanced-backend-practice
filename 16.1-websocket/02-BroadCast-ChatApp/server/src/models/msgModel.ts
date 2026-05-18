import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  groupId: { unique: true, type: String },
  senderId: String,
  message: String,
});
export const Message = mongoose.model("message", messageSchema);
