/**
 * Created by jgrancha on 8/06/15.
 */

var quizController = {};
var models = require('../models/models.js');

quizController.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(function (quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error('No existe ese quizId: ' + quizId));
        }
    }).catch(function (error) {
        next(error);
    })
};

quizController.index = function (req, res) {
    var searchRequest = '%' + req.query.search + '%';
    searchRequest.replace(' ','%');
    models.Quiz.findAll({where: ['pregunta like ? order by pregunta asc', searchRequest]}).then(function (quizes) {
        if(quizes.length > 0){
            res.render('quizes/index.ejs', {quizes: quizes,cadena:''});
        }else if(req.query.search == undefined){
            res.render('quizes/index.ejs', {quizes: quizes, cadena:''});
        }else{
            res.render('quizes/index.ejs', {quizes: quizes, cadena:'No hemos encontrado nada con: ' + req.query.search});
        }
    });
};

quizController.show = function (req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};

quizController.answer = function (req, res) {
    var respuesta = '¡Incorrecta!';
    var textoBoton = 'Volver a intentarlo';

    if (req.query.respuesta === req.quiz.respuesta) {
        respuesta = '¡Correcta!';
        textoBoton = 'Volver a jugar';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: respuesta, text_Boton_Volver: textoBoton})
};

module.exports = quizController;