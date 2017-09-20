const jwt = require('jsonwebtoken');
const _ = require('lodash');
const defaultAdmins = [
    {
        id: 1,
        username: 'admin',
        password: '21232f297a57a5a743894a0e4a801fc3'
    }
];
module.exports = async (req, res) => {
    let { username, password } = req.body;
    let admins = req.app.locals.admins || defaultAdmins;
    let admin = _.find(admins, { username, password });
    if (!admin) {
        res.status(401.1).send({error: '用户名密码错误！'});
        return;
    }
    let token = jwt.sign({ user_id: admin.id }, 'ZG91cGFpNjY2', { expiresIn: 24 * 3600 });
    res.cookie('sm_token', token, { path: req.app.locals.basePath});
    res.status(204).send();
}