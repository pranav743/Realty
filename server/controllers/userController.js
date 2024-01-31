const { cloudinary } = require("../utils/cloudinary");
const User = require("../models/users");

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

const getAllUsers = async (req, res) => {
  try {
    const reqQuery = { ...req.query };
    const removeFields = ["select", "sort", "limit", "page"];
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    query = User.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments(query);

    query = query.skip(startIndex).limit(limit);
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    const users = await query;
    if (!users) {
      return res
        .status(401)
        .json({ success: false, msg: "There are no users" });
    }
    return res
      .status(200)
      .json({ success: true, count: total, pagination, data: users });
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({ success: false, msg: error.message });
  }
};

module.exports = { uploadPhoto, getPhoto };
