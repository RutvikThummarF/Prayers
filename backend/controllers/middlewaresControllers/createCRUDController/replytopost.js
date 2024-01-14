const { ObjectId } = require('mongodb');

const replytopost = async (Model, req, res) => {
  try {
    // Find document by id and updates with the required fields
    //console.log(req);

    let existingDocument = await Model.findOne({
      _id: req.body.PostId,
      removed: false,
    }).exec();

    if (!existingDocument) {
      return res.json({
        success: false,
        result: null,
        message: 'No document found by this id: ' + req.body.PostId,
      });
    }

    //const targetCreatedBy = new ObjectId(req.admin._id);

    // Using findIndex and splice:
    // existingDocument.comments = existingDocument.comments.filter(
    //   (item) => !item.createdby.equals(targetCreatedBy)
    // );
    //console.log(existingDocument.comments);

    // Add a new emoji to the existing comments array

    //console.log(req.admin);
    existingDocument.comments.push({
      text: req.body.text,
      postedBy: req.admin || null,
    });

    let updatebody = {
      comments: existingDocument.comments,
    };

    const result = await Model.findOneAndUpdate(
      { _id: req.body.PostId, removed: false },
      updatebody,
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();
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

module.exports = replytopost;
