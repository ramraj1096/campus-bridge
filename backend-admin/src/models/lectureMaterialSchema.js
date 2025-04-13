import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LectureMaterialSchema = new Schema(
  {
    title: { type: String, required: true }, 
    type: {
      type: String,
      enum: ["GoogleDriveLink", "VideoLink"],
      default: "VideoLink",
    },
    fileUrl: { type: String, required: true }, 

    topic: { type: String }, 
    description: { type: String }, 
  },
  {
    timestamps: true,
  }
);

const LectureMaterial = model("LectureMaterial", LectureMaterialSchema);
export default LectureMaterial;
