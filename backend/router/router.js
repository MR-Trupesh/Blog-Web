const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  addblog,
  getBlog,
  updatedblog,
  deleteblog,
} = require("../controllers/postcontrollers");

const {
  register,
  login,
  getUser,
  deleteUser,
  updateUser,
  logout,
} = require("../controllers/controllers");
const { authenticateUser, authorizeUser } = require("../Middleware/auth"); // Uncomment when middleware is ready
const router = express.Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.get("/getuser", authenticateUser, getUser);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeUser("admin"),
  deleteUser
);
router.put("/update/:id", authenticateUser, authorizeUser("admin"), updateUser);
router.post("/logout", logout);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    console.log(storage);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

// Middleware for handling file upload
const handleFileUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Blog routes
router.post(
  "/addblog",
  upload.single("image"),
  authenticateUser,
  authorizeUser("editor"),
  handleFileUploadError,
  addblog
);
router.get("/getblog", getBlog);
router.put(
  "/updateblog/:id",
  upload.single("image"),
  authenticateUser,
  authorizeUser("admin", "editor"),
  handleFileUploadError,
  updatedblog
);
router.delete(
  "/deleteblog/:id",
  authenticateUser,
  authorizeUser("admin", "editor"),
  deleteblog
);

module.exports = router;
