const isValidAdminToken = require('./isValidAdminToken');
const login = require('./login');
const logout = require('./logout');
const isValidMobileToken = require('./isValidMobileToken');
const mobilelogin = require('./mobilelogin');
const mobilelogout = require('./mobilelogout');

const authJwtController = {
  isValidAdminToken,
  login,
  logout,
  isValidMobileToken,
  mobilelogin,
  mobilelogout,
};

module.exports = authJwtController;
