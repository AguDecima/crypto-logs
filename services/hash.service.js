const crypto = require('crypto');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify');

const generateRandomHash = () => {
    let currentDate = (new Date()).valueOf().toString(); 
    const regex = new RegExp('^00.*');
    let nonce = 0;
    while(true) {
        let hash = crypto.createHash('sha256')
                    .update(`${currentDate},${nonce}`)
                    .digest('hex')
                    .toString();
        if(regex.exec(hash)) return hash;
        else nonce += 1;
    }
}

const generateHash = (data) => {
    return crypto.createHash('sha256')
                    .update(data)
                    .digest('hex')
                    .toString();
}

const computeHashProofWork = (prevHash,message) => {
    let nonce = 0;
    const regex = new RegExp('^00.*');
    while (true) {
        let hash = generateHash(`${prevHash},${message},${nonce}`);
        if(regex.exec(hash)) return nonce;
        else nonce += 1;
    }
};

const getLogData = async () => {
    try {
        const fileContent = await fs.readFile(__dirname+'/../logs/crypto-logs.csv');
        let records = await parse(fileContent, { columns: false });
        return records;
    } catch (error) {
        // add log
        return [];
    }
}

const setLogData = async (newData) => {
    stringify(newData, {
        header: false
      }, async function (err, output) {
        if (err) throw err;
        await fs.writeFile(__dirname+'/../logs/crypto-logs.csv', output);
      });
}

module.exports = {
    generateHash,
    getLogData,
    setLogData,
    generateRandomHash,
    computeHashProofWork
};
