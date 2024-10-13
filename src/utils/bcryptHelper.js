// utils/bcryptHelper.js
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

async function comparePasswords(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

module.exports = { hashPassword, comparePasswords };
