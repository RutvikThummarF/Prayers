const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const photo = async (req, res) => {
  try {
    console.log('🚀 ~ file: photo.js:10 ~ photo ~ req.body:', req.body);

    const updates = {
      photo: req.body.photo,
    };

    const tmpResult = await Admin.findOneAndUpdate(
      { _id: req.admin._id, removed: false },

      { $set: updates },
      { new: true, runValidators: true }
    );

    // If no results found, return document not found
    if (!tmpResult) {
      return res.json({
        success: false,
        result: null,
        message: 'No document found by this id: ' + req.params.id,
      });
    } else {
      // Return success resposne
      let result = {
        _id: tmpResult._id,
        enabled: tmpResult.enabled,
        email: tmpResult.email,
        name: tmpResult.name,
        surname: tmpResult.surname,
        photo: tmpResult.photo,
        role: tmpResult.role,
      };

      return res.json({
        success: true,
        result,
        message: 'we update this document photo by this id: ' + req.params.id,
      });
    }
  } catch (error) {
    // Server Error
    return res.json({
      success: false,
      result: null,
      error: error,
      message: error.message,
      error,
    });
  }
};
module.exports = photo;
