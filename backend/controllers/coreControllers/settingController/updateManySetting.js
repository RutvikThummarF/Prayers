const mongoose = require('mongoose');

const Model = mongoose.model('Setting');

const updateManySetting = async (req, res) => {
  try {
    // req/body = [{settingKey:"",settingValue}]
    let settingsHasError = false;
    const updateDataArray = [];
    const { settings } = req.body;

    for (const setting of settings) {
      if (!setting.hasOwnProperty('settingKey') || !setting.hasOwnProperty('settingValue')) {
        settingsHasError = true;
        break;
      }

      const { settingKey, settingValue } = setting;

      updateDataArray.push({
        updateOne: {
          filter: { settingKey: settingKey },
          update: { settingValue: settingValue },
        },
      });
    }

    if (updateDataArray.length === 0) {
      return res.json({
        success: false,
        result: null,
        message: 'No settings provided ',
      });
    }
    if (settingsHasError) {
      return res.json({
        success: false,
        result: null,
        message: 'Settings provided has Error',
      });
    }
    const result = await Model.bulkWrite(updateDataArray);

    if (!result || result.nMatched < 1) {
      return res.json({
        success: false,
        result: null,
        message: 'No settings found by to update',
      });
    } else {
      return res.json({
        success: true,
        result: [],
        message: 'we update all settings',
      });
    }
  } catch (error) {
    // If error is thrown by Mongoose due to required validations
    if (error.name == 'ValidationError') {
      return res.json({
        success: false,
        result: null,
        message: 'Required fields are not supplied',
        error: error,
      });
    } else {
      // Server Error
      return res.json({
        success: false,
        result: null,
        message: error.message,
        error: error,
      });
    }
  }
};

module.exports = updateManySetting;
