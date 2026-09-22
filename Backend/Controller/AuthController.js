const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const UserModel = require("../Models/UserModels");
<<<<<<< HEAD
const bcrypt = require("bcrypt");
=======
const bcrypt = require("bcryptjs");
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
const jwt = require("jsonwebtoken");
const DirectoryModel = require("../Models/DirectoryModel");

const SignUp = async (req, res) => {
  try {
<<<<<<< HEAD
    console.log("Signup request body:", req.body);
    const { email, userName, password } = req.body;
=======
    const { email, userName, password } = req.body;
    
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
    if (!email || !userName || !password) {
      return res
        .status(404)
        .json({ message: "Please fill all fields", success: false });
    }

<<<<<<< HEAD
    const isEmailExist = await UserModel.findOne({ email });
=======
    const isEmailExist = await UserModel.findOne({ email }); // it is not showing suggesion for .findOne
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
    const isUserNameExist = await UserModel.findOne({ userName });

    if (isEmailExist) {
      return res
        .status(400)
        .json({ message: "Email Already Exist", success: false });
    }
    if (isUserNameExist) {
      return res
        .status(400)
        .json({ message: "UserName already Exist", success: false });
    }

    const newUser = new UserModel({ email, userName, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    const s3Client = new S3Client({
      region: process.env.REGION,
<<<<<<< HEAD
      endpoint: `https://s3.${process.env.REGION}.amazonaws.com`,
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.ACCESS_SECRET,
      },
    });
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${userName}/`,
    });
    const respond = await s3Client.send(command);
<<<<<<< HEAD
    const newDirectory = new DirectoryModel({ name: userName, type: "folder", path: `${userName}/` });
    await newDirectory.save();
=======
    const newDirectory=new DirectoryModel({name:userName,type:"folder",path:`${userName}/`})
    await newDirectory.save()
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
    res
      .status(201)
      .json({ message: "Signup successfully", success: true });
  } catch (error) {
<<<<<<< HEAD
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
=======
    res.status(500).json({ message: "Internal server error", success: false });
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
  }
};

const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    if (!userName || !password) {
      return res.status(400).json({ message: "Please fill all fields" ,success:false});
    }

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }
    const key = process.env.JWT_SECRET_KEY;
    const jwtToken = jwt.sign({ userName }, key, { expiresIn: "5d" });

<<<<<<< HEAD

   res.cookie("token", jwtToken, {
     httpOnly: true,
     secure: false, // false for localhost, true for production
     sameSite: "Lax", // Lax for localhost, None for cross-site/production
   });
=======
   res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: true, // Set to true in production with HTTPS
  sameSite: "None",
});
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

    res
      .status(200)
      .json({ message: "SignIn succesfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error, success: false });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(400).json({ message: "Access Denied", success: false });
    }
    const key = process.env.JWT_SECRET_KEY;
    const verify = jwt.verify(token, key);
    if (verify) {
      res.status(200).json({ message: "", success: true, user: verify });
    } else {
      res.status(400).json({ message: "Access denied", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal sever error ", success: false, error });
  }
};

const SignOut=async(req,res)=>{
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });        
    res.status(200).json({message:'SignOut successfully',success:true})
  } catch (error) {
    res.status(500).json({message:"Internal server error",success:false,error})
  }
}

module.exports = { SignUp, Login ,verifyToken,SignOut};
