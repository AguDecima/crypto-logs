const {schemaValidation} = require('../utils/validationShema.utils');
const {messsageSchema} = require('./schema/message.schema');

const receiveMessage = async (req, res) => {   

    let payload = req.body;

    try {
        schemaValidation('receiveMessage',payload, messsageSchema);
    } catch (error) {
        // add log
        res.status(400).json({
            message: 'invalid body',
            code: 'bad_request'
        });
        return;
    }

    res.status(200).json(payload);
}

module.exports = {
    receiveMessage
};
