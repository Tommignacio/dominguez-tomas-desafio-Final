const { genSalt, hash, compare } = require("bcrypt");

const encrypt = async (inputPassword) => await hash(inputPassword, await genSalt(10));

const compareEncrypted = async (inputPassword, userPassword) => await compare(inputPassword, userPassword);

module.exports = { encrypt, compareEncrypted };