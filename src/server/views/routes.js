const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dashboardRoutes = require('./dashboard');
const apiRoutes = require('./api');
const login = require('./api/login');

router.post('/login', login);

router.use(function(req, res, next){
    if (!req.cookies.sm_token) {
        res.redirect('/login');
        return;
    }
    let result = jwt.verify(req.cookies.sm_token, 'ZG91cGFpNjY2');
    req.user_id = result.user_id;
    next();
});
router.use('/api', apiRoutes);
router.use('/', dashboardRoutes);

module.exports = router;
