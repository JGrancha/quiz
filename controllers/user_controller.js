/**
 * Created by jgrancha on 18/08/15.
 */

var userController = {};

var users = {
    admin: {id: 1, username: 'admin', password: 'admin'},
    pepe: {id: 2, username: 'pepe', password: 'pepe'}
};

userController.autenticar = function (login, password, callback) {
    if (users[login]) {
        if (password === users[login].password) {
            callback(null, users[login]);
        } else {
            callback(new Error('Password Erróneo'));
        }
    } else {
        callback(new Error('No existe el usuario'));
    }

};

module.exports = userController;



