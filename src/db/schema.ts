import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  money: {
    "1": String,
    "2": String,
    "3": String,
    "4": String,
    "5": String,
  },
  date: Date,
});

export const History =
  mongoose.model("history") || mongoose.model("history", historySchema);
