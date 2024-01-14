const listpost = async (Model, req, res) => {
  const sort = parseInt(req.query.sort) || 'desc';
  try {
    const fields = { $or: [] };
    fields.$or.push({ ['isrepoted']: '0' });
    //console.log(fields)
    //  Query the database for a list of all results
    const result = await Model.find(fields).where('removed', false).sort({ created: sort }).populate();
    //console.log(result);
    if (result.length > 0) {
      return res.json({
        success: true,
        result,
        message: 'Successfully found all documents',
      });
    } else {
      return res.json({
        success: true,
        result: [],
        message: 'Collection is Empty',
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      result: [],
      message: error.message,
      error: error,
    });
  }
};

module.exports = listpost;
