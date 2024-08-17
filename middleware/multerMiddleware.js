import multer from "multer";
import { nanoid } from "nanoid";

const MIMI_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // null is error, another is distination.
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = MIMI_TYPE_MAP[file.mimetype];
    // contructing file name with extension
    const fileName = nanoid() + "." + ext;
    // null is error, another is file name.
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
