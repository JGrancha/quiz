/**
 * Created by jgrancha on 8/06/15.
 */

var quizController = {};
var models = require('../models/models');

quizController.question = function(req,res){
    models.Quiz.findAll().success(function(quiz){
        res.render('quizes/question',{pregunta: quiz[0].pregunta , respuesta : quiz[0].respuesta , text_Inicio: 'Inicio'});
    });

}

quizController.answer = function(req,res){
    models.Quiz.findAll().success(function(quiz){
        req.query.respuesta === quiz[0].respuesta ? res.render('quizes/answer',{ respuesta:'¡Correcta!', text_Boton_Volver: 'Volver a jugar'}) : res.render('quizes/answer',{respuesta:'¡Incorrecta!', text_Boton_Volver: 'Volver a intentarlo'});
    });

}

module.exports = quizController;