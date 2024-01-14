const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const {
  isValidAdminToken,
  login,
  logout,
  isValidMobileToken,
  mobilelogin,
  mobilelogout,
} = require('@/controllers/coreControllers/authJwtController');

router.route('/login').post(catchErrors(login));
router.route('/logout').post(isValidAdminToken, catchErrors(logout));
router.route('/mobilelogin').post(catchErrors(mobilelogin));
router.route('/mobilelogout').post(isValidMobileToken, catchErrors(mobilelogout));

module.exports = router;
