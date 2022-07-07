const router = require('express').Router();
const { route } = require('./controllers/homeController');
const homeController = require('./controllers/homeController');
 const authController = require('./controllers/authControllers')
const publicationController = require('./controllers/publicationController');


router.use(homeController);
router.use(authController);
router.use(publicationController);
module.exports = router;