import College from "../models/collegeSchema.js";
import Course from "../models/courseSchema.js";
import Faculty from "../models/FacultySchema.js";



export const addCourse = async (req, res) => {
  try {
    const { title, code, description, semester, department } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Course code is required" });
    }

    // Check if course already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course with this code already exists" });
    }

    const subjectId=code;
    // Find faculty using the same unique code
    const faculty = await Faculty.findOne({subjectId});
    if (!faculty) {
      return res.status(404).json({ message: "Faculty with this code not found" });
    }

    // Create course
    const newCourse = new Course({
      title,
      code,
      description,
      semester,
      department,
    });

    await newCourse.save();

    // Add course to faculty
    faculty.courses.push(newCourse._id);
    await faculty.save();

    res.status(201).json({
      message: "Course added and linked to faculty successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const allowedFields = [
      "title",
      "code",
      "description",
      "faculty",
      "semester",
      "department",
    ];
    const updateFields = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error editing course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getCourse = async (req, res) => {
  try {
   
    const facultyId = req.facultyId;
   
    // Find faculty and populate all related course data
    const faculty = await Faculty.findById(facultyId).populate({
      path: "courses",
      populate: [
        { path: "lectureMaterials" },
        { path: "CodingQuestions" },
        { path: "Codingsubmissions" },
        { path: "Assesments" },
        { path: "AssessmentsSubmissions" },
      ],
    });
   
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    console.log(faculty)
    return res.status(200).json({
      success: true,
      message: "Course data retrieved successfully",
      courses: faculty,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllCoursesByCollegeId = async (req, res) => {
  try {
    const collegeId = req.params.id;

    const college = await College.findById(collegeId).populate("courses");

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    return res.status(200).json({
      message: "Courses fetched successfully",
      courses: college.courses,
    });
  } catch (error) {
    console.error("Error fetching courses by college ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const enrollStudent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { studentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
      await course.save();
    }

    return res.status(200).json({
      success: true,
      message: "Student enrolled successfully",
      course,
    });
  } catch (error) {
    console.error("Error enrolling student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentsOfCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "enrolledStudents"
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({
      success: true,
      students: course.enrolledStudents,
    });
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCoursesByFacultyId = async (req, res) => {
  try {
    const facultyId = req.params.id;

    const courses = await Course.find({ faculty: facultyId });

    return res.status(200).json({
      success: true,
      message: "Courses by faculty fetched",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses by faculty:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCoursesEnrolledByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const courses = await Course.find({ enrolledStudents: studentId }).populate(
      "faculty"
    );

    return res.status(200).json({
      success: true,
      message: "Courses enrolled by student fetched",
      courses,
    });
  } catch (error) {
    console.error("Error fetching student’s courses:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
