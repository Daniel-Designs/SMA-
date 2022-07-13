const jwt = require('jsonwebtoken');
const infoToken = (token) => {
    return jwt.verify(token, process.env.JWT);
}
module.exports = { infoToken }