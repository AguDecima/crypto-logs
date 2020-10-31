const {schemaValidation} = require('../utils/validationShema.utils');
const {messsageSchema} = require('./schema/message.schema');
const {getLogData, generateRandomHash, 
    setLogData, computeHashProofWork,
    generateHash} = require('../services/hash.service');

const receiveMessage = async (req, res) => {   

    let payload = req.body;

    try {
        schemaValidation('receiveMessage',payload, messsageSchema);
    } catch (error) {
        // add log
        return res.status(400).json({
            message: 'invalid body',
            code: 'bad_request'
        });
        return;
    }

    let {message} = payload;
    const logs = await getLogData();
    let prevHash;
    if(!logs.length) prevHash = generateRandomHash();
    else {
        let lastLog = logs[logs.length - 1];
        prevHash = generateHash(`${lastLog[0]},${lastLog[1]},${lastLog[2]}`);
    }

    const nonce = computeHashProofWork(prevHash,message);
    logs.push(`${prevHash},${message},${nonce}`.split(','));
    await setLogData(logs);
    return res.status(200).json({
        message: 'the message was sent'
    });
    
}

const validateIntegrity = async (req, res) => {
    const logs = await getLogData();
    for (let i = 0; i < logs.length - 1; i++) {
        let prevHash = generateHash(`${logs[i][0]},${logs[i][1]},${logs[i][2]}`);
        let nextHash = logs[i+1][0];
        if(prevHash === nextHash) continue;
        else {
            return res.status(400).json({messag: 'the data is altered'});
        }
    }
    return res.status(200).json({messag: 'the data is complete'});
} 

module.exports = {
    receiveMessage,
    validateIntegrity
};
