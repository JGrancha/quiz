/**
 * Created by jgrancha on 13/08/15.
 */

var path = require('path');

//POSGRES DATABASEURL  Postgres: postgres://user:passwd@host:port/database
//SQLITE SQLite: sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd,
    {   dialect: protocol,
        protocol: protocol,
        port: port,
        host: host,
        storge: storage,
        omitNull: true
    });

var quiz_path =path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

var comment_path =path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;

sequelize.sync().then(function () {
    Quiz.count().then(function (count) {
        if (count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma',
                tematica: 'Geografía'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa',
                tematica: 'Geografía'
            }).then(function () {
                console.log('Base de Datos inicializada');
            });
        }
    });
});