const { cloudinary } = require("../utils/cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const uploadPhoto = async (req, res) => {
  try {
    const file = req.body.data;
    const resp = await cloudinary.uploader.upload(file, {
      upload_preset: "tsec",
    });
    console.log(resp);
    res.json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Error" });
  }
};
const getPhoto = async (req, res) => {
  //   try {
  //     const { resources } = await cloudinary.search
  //       .expression("folder : tsec")
  //       .sort_by("public_id", "desc")
  //       .max_results(30)
  //       .execute();
  //     const public_ids = resources.map((file) => file.public_id);
  //     res.send(public_ids);
  //     res.json({ msg: "Success" });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ err: "Error" });
  //   }
};

module.exports = { uploadPhoto, getPhoto };
