import mongoose from "mongoose";

const CathSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cath =
  mongoose.models.Categories || mongoose.model("Categories", CathSchema);

export default Cath;
