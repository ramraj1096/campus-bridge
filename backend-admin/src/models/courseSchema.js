import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CourseSchema = new Schema(
  {
    title: { type: String, required: true }, // e.g., "Operating Systems"
    code: { type: String, required: true, unique: true }, // e.g., "CS301"
    description: { type: String }, // Optional course intro
    
    semester: { type: String }, // e.g., "5th Semester"
    department: { type: String }, // e.g., "CSE"
    
    enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "Student" }], // student list
    lectureMaterials:[{type:Schema.Types.ObjectId,ref:"LectureMaterial"}],
    CodingQuestions:[{type:Schema.Types.ObjectId,ref:"CodingQuestion"}],
    Codingsubmissions:[{type:Schema.Types.ObjectId,ref:"CodingQuestionSubmission"}],
    Assesments:[{type:Schema.Types.ObjectId,ref:"Assessment"}],
    AssessmentsSubmissions:[{type:Schema.Types.ObjectId,ref:"Submission"}]
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", CourseSchema);
export default Course;
