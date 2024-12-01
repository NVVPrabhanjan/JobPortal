import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";  // Import multer for handling file uploads

// Configure multer storage (you can customize this based on your needs)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // File name format
  }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type'), false);  // Reject the file
  }
};

const upload = multer({ storage, fileFilter });

// Update register to use file upload middleware
export const register = async (req, res) => {
  try {
    console.log("Hello");
    console.log(req.body);
    console.log(req.file);  // Check if the file is received

    const { fullName, email, phoneNumber, password, role } = req.body;
    const file = req.file;  // File will be available in req.file

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log("Here");
      return res.status(400).json({
        message: 'User already exists with this email.',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        photo: file ? file.path : null,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
          return res.status(400).json({
              message: "Something is missing",
              success: false
          });
      }

      let user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({
              message: "Incorrect email or password.",
              success: false,
          })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
          return res.status(400).json({
              message: "Incorrect email or password.",
              success: false,
          })
      }

      const normalizedRole = role.toLowerCase();
      if (normalizedRole !== user.role.toLowerCase()) {
          return res.status(400).json({
              message: "Account doesn't exist with current role.",
              success: false
          })
      }

      const tokenData = {
          userId: user._id
      }
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

      user = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
      }

      return res.status(200)
                .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
                .json({
                    message: `Welcome back ${user.fullName}`,
                    user,
                    success: true
                })
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
          message: "Server error, please try again later.",
          success: false
      });
  }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        if(fullName) user.fullName = fullName
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}