const { schemaValidation } = require('../utils/validationShema.utils');
const { messsageSchema } = require('./schema/message.schema');
const { getLogData, generateRandomHash,
    setLogData, computeHashProofWork,
    generateHash } = require('../services/hash.service');
const logger = require('../utils/logger.utils');

const receiveMessage = async (req, res) => {

    let payload = req.body;

    try {
        schemaValidation('receiveMessage', payload, messsageSchema);
    } catch (error) {
        return res.status(400).json({
            message: 'invalid body',
            code: 'bad_request'
        });
        return;
    }

    let { message } = payload;
    try {
        const logs = await getLogData();
        let prevHash;
        if (!logs.length) prevHash = generateRandomHash();
        else {
            let lastLog = logs[logs.length - 1];
            prevHash = generateHash(`${lastLog[0]},${lastLog[1]},${lastLog[2]}`);
        }

        const nonce = computeHashProofWork(prevHash, message);
        logs.push(`${prevHash},${message},${nonce}`.split(','));
        await setLogData(logs);
        return res.status(200).json({
            message: 'the message was sent'
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'internal server error'
        });
    }


}

const validateIntegrity = async (req, res) => {

    try {
        const logs = await getLogData();
        for (let i = 0; i < logs.length - 1; i++) {
            let prevHash = generateHash(`${logs[i][0]},${logs[i][1]},${logs[i][2]}`);
            let nextHash = logs[i + 1][0];
            if (prevHash === nextHash) continue;
            else {
                logger.error(`the data was altered`);
                return res.status(400).json({ message: 'the data was altered' });
            }
        }
        return res.status(200).json({ message: 'the data is complete' });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'internal server error'
        });
    }

}

module.exports = {
    receiveMessage,
    validateIntegrity
};
