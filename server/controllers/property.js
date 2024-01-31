const Property = require("../models/properties");

const deslugify = (slug) => {
  return slug.replace(/-/g, " ").replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

const findNearestProperties = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    console.log(req.body);
    const listOfProperties = await Property.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000,
        },
      },
    }).limit(10);

    return res.status(200).json({ success: true, data: listOfProperties });
  } catch (error) {
    console.error(`${error.message} (error)`);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const reqQuery = { ...req.query };
    if (reqQuery.title) {
      reqQuery.title = deslugify(reqQuery.title);
    }
    const removeFields = ["select", "sort", "limit", "page"];
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    query = Property.find(JSON.parse(queryStr));

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
    const total = await Property.countDocuments(query);

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
    const properties = await query;
    if (!properties) {
      return res
        .status(401)
        .json({ success: false, msg: "There are no Properties" });
    }
    return res
      .status(200)
      .json({ success: true, count: total, pagination, data: properties });
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({ success: false, msg: error.message });
  }
};

const searchNearbyPlaces = async () => {
  try {
    const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby';
    const apiKey = 'AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU';

    const requestData = {
      includedTypes: ['airport','bus_stop', 'restaurant', 'doctor', 'hospital', 'school'],
      maxResultCount: 10,
      // rankPreference: "DISTANCE",
      locationRestriction: {
        circle: {
          center: {
            latitude: 19.0963747,
            longitude: 72.9199405
          },
          radius: 500.0
        }
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': "AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU",
      'X-Goog-FieldMask': 'places.displayName'
    };

    const response = await axios.post(apiUrl, requestData, { headers });

    // Handle the response from the Google Places API
    const places = response.data;
    console.log(places);
    return places;
  } catch (error) {
    console.error(`${error.message} (error)`);
    throw error;
  }
};

module.exports = {
  findNearestProperties,
  getAllProperties,
  searchNearbyPlaces
};
