
const baseURL = (req) => {
    return `${req.protocol}://${req.get('host')}`;
}

module.exports = {baseURL}