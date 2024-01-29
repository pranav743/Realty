const User = require("../models/users");



async function findUser(email) {
    var person = await User.findOne({ email }).exec();

    if (person) {
        try {
            person._doc.role = "USER";
        } catch (error) {
        }
        person = { ...person, role: 'USER' };
        return person
    }

}

module.exports = findUser;