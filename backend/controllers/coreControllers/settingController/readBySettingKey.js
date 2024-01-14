const mongoose = require('mongoose');

const Model = mongoose.model('Setting');

const readBySettingKey = async (req, res) => {
  try {
    // Find document by id
    const settingKey = req.params.settingKey || undefined;

    if (!settingKey) {
      return res.json({
        success: false,
        result: null,
        message: 'No settingKey provided ',
      });
    }

    const result = await Model.findOne({ settingKey });

    // If no results found, return document not found
    if (!result) {
      return res.json({
        success: false,
        result: null,
        message: 'No document found by this settingKey: ' + settingKey,
      });
    } else {
      // Return success resposne
      return res.json({
        success: true,
        result,
        message: 'we found this document by this settingKey: ' + settingKey,
      });
    }
  } catch (error) {
    // Server Error
    return res.json({
      success: false,
      result: null,
      message: error.message,
      error: error,
    });
  }
};

module.exports = readBySettingKey;