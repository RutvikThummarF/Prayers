const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const search = async (req, res) => {
  // console.log(req.query.fields)

  // console.log(fields)
  try {
    if (req.query.q === undefined || req.query.q === '' || req.query.q === ' ') {
      return res
        
        .json({
          success: false,
          result: [],
          message: 'No document found by this request',
        })
        .end();
    }

    const fieldsArray = req.query.fields
      ? req.query.fields.split(',')
      : ['name', 'surname', 'email'];

    const fields = { $or: [] };

    for (const field of fieldsArray) {
      fields.$or.push({ [field]: { $regex: new RegExp(req.query.q, 'i') } });
    }
    let result = await Admin.find(fields).where('removed', false).sort({ name: 'asc' }).limit(10);

    for (let admin of result) {
      admin.password = undefined;
      admin.loggedSessions = undefined;
    }
    if (result.length >= 1) {
      return res.json({
        success: true,
        result,
        message: 'Successfully found all documents',
      });
    } else {
      return res.json({
        success: false,
        result: [],
        message: 'No document found by this request',
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      result: [],
      message: error.message,
      error,
    });
  }
};
module.exports = search;
