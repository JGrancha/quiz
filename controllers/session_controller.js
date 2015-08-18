/**
 * Created by jgrancha on 18/08/15.
 */

var sessionController = {};

sessionController.loginRequired = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


sessionController.new = function (req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};
    res.render('sessions/new', {errors: errors});
};

sessionController.create = function (req, res) {
    var login = req.body.login;
    var password = req.body.password;

    var userController = require('./user_controller.js');

    userController.autenticar(login, password, function (error, user) {
        if (error) {
            req.session.errors = [{'message': 'Se ha producido un ' + error}];
            res.redirect('/login');
            return;
        }
        req.session.user = {id: user.id, username: user.username};
        res.redirect(req.session.redir.toString());
    });
};

sessionController.destroy = function (req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};

module.exports = sessionController;