const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/authController');

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], ctrl.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], ctrl.login);
console.log("CTRL:", ctrl);
console.log("CTRL:", ctrl);
console.log("REGISTER:", ctrl.register);
router.get('/me', ctrl.me);

module.exports = router;
