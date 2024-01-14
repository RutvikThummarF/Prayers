const sendreport = async (Model, req, res) => {
  try {
    // Find document by id and updates with the required fields
    const result = await Model.findOneAndUpdate({ _id: req.body.PostId, removed: false }, req.body, {
      new: true, // return the new result instead of the old one
      runValidators: true,
    }).exec();
    if (!result) {
      return res.json({
        success: false,
        result: null,
        message: 'No document found by this id: ' + req.body.PostId,
      });
    } else {
      return res.json({
        success: true,
        result,
        message: 'we update this document by this id: ' + req.body.PostId,
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

module.exports = sendreport;