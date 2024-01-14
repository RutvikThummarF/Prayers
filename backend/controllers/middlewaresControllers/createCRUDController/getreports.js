const sendreport = async (Model, req, res) => {
    try {
        // Find document by id and updates with the required fields
        let flag = req.body.flag;

        const result = await Model.find({ isreported: flag, removed: false })
            .exec();

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
        return res.json({
            success: false,
            result: null,
            message: error.message,
            error: error,
        });
    }
};

module.exports = sendreport;
