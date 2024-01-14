const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const filter = async (req, res) => {
  try {
    if (req.query.filter === undefined || req.query.equal === undefined) {
      return res.json({
        success: false,
        result: null,
        message: 'filter not provided correctly',
      });
    }
    const result = await Admin.find({ removed: false })
      .where(req.query.filter)
      .equals(req.query.equal);

    for (let admin of result) {
      admin.password = undefined;
    }
    return res.json({
      success: true,
      result,
      message: 'Successfully found all documents where equal to : ' + req.params.equal,
    });
  } catch (error) {
    return res.json({
      success: false,
      result: null,
      message: error.message,
      error,
    });
  }
};

module.exports = filter;
