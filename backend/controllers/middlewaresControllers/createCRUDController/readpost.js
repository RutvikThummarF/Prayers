const readpost = async (Model, req, res) => {
  try {
    // Find document by id
    //const result = await Model.findOne({ _id: req.params.id, removed: false });
    const result = await Model.findOne({ _id: req.params.id, removed: false }).populate({
      path: 'postedBy',
      select: 'name surname email role photo',
    }).populate({
      path: 'comments.postedBy',
      select: 'name surname email role photo',
    }).populate({
      path: 'emojis.createdby',
      select: 'name surname email role photo',
    });

    //console.log(result);
    // If no results found, return document not found
    if (!result) {
      return res.json({
        success: false,
        result: null,
        message: 'No document found by this id: ' + req.params.id,
      });
    } else {
      // Return success resposne
      return res.json({
        success: true,
        result,
        message: 'we found this document by this id: ' + req.params.id,
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

module.exports = readpost;
