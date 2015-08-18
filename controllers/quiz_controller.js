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
    searchRequest.replace(' ', '%');
    models.Quiz.findAll({where: ['pregunta like ? order by pregunta asc', searchRequest]}).then(function (quizes) {
        if (quizes.length > 0 || req.query.search == undefined) {
            res.render('quizes/index', {quizes: quizes, cadena: '', errors: []});
        } else {
            res.render('quizes/index', {
                quizes: quizes,
                cadena: 'No hemos encontrado nada con: ' + req.query.search,
                errors: []
            });
        }
    });
};

quizController.show = function (req, res) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

quizController.answer = function (req, res) {
    var respuesta = '¡Incorrecta!';
    var textoBoton = 'Volver a intentarlo';

    if (req.query.respuesta === req.quiz.respuesta) {
        respuesta = '¡Correcta!';
        textoBoton = 'Volver a jugar';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: respuesta, text_Boton_Volver: textoBoton, errors: []})
};

quizController.new = function (req, res) {
    var quiz = models.Quiz.build({pregunta: '', respuesta: '', tematica: ''});
    res.render('quizes/new', {quiz: quiz, errors: []});
};

quizController.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

    quiz.validate().then(function (err) {
        if (err) {
            res.render('quizes/new', {quiz: quiz, errors: err.errors})
        } else {
            quiz.save({fields: ['pregunta', 'respuesta', 'tematica']}).then(function () {
                res.redirect('/quizes');
            });
        }
    });

};

quizController.edit = function (req, res) {
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: []})
};

quizController.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    req.quiz.validate().then(function (err) {
        if (err) {
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        } else {
            req.quiz.save({fields: ['pregunta', 'respuesta', 'tematica']}).then(function () {
                res.redirect('/quizes');
            })
        }
    })
};

quizController.destroy = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect('/quizes');
    }).catch(function (err) {
        next(err);
    })
};

module.exports = quizController;