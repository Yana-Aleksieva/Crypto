const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../src/config/env');



router.get('/login', (req, res) => {

    res.render('login');
});

router.get('/register', (req, res) => {

    res.render('register');
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (email, password) {


        const user = await authService.login(email, password);
        const token = await authService.createToken(user);
        res.cookie(COOKIE_NAME, token, {httpOnly: true});

        res.redirect('/');

    }

});

router.post('/register', async (req, res) => {

    const { username, email, password, repeatPassword } = req.body;
    if (password != repeatPassword) {
        throw new Error('Passwords dont match!');
    }

    const createdUser = await authService.create({ username, email, password });
    const token = await authService.createToken(createdUser);
    res.cookie('user', token, { httpOnly: true });
    res.redirect('/');
});


router.get('/logout', (req, res) => {

    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});



module.exports = router;