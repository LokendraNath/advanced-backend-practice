import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Group = mongoose.model("group", groupSchema);
