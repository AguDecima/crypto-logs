const receiveMessage = async (req, res) => {
    res.status(200).send({
        message: 'its works'
    })
}

module.exports = {
    receiveMessage
};
