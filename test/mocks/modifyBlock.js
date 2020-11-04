const {getLogData, setLogData} = require('../../services/hash.service');
const faker = require('faker');

const modifyBlock = async () => {
    try {
        const data = await getLogData();
        data[0][1] = faker.lorem.words();
        await setLogData(data);
    } catch (error){
        throw error;
    }
}

module.exports = {
    modifyBlock
};
