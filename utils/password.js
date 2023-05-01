const bcrypt = require("bcryptjs");

exports.cryptagePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  console.log("password", await bcrypt.hash(password, salt));
  return await bcrypt.hash(password, salt);
};
exports.matchPassword = async function (enteredPassword, password) {
  return await bcrypt.compare(enteredPassword, password);
};
