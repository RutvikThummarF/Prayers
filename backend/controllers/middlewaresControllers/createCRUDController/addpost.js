const addpost = async (Model, req, res) => {
  try {
    // Creating a new document in the collection
    let getbody = req.body;
    let newbody = {
      title: getbody.title,
      body: getbody.body,
      postedBy: req.admin || null,
      ispublic: getbody.ispublic,
    };

    const result = await new Model(newbody).save();

    // Returning successfull response
    return res.json({
      success: true,
      result,
      message: 'Successfully Created the document in Model ',
    });
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

module.exports = addpost;
