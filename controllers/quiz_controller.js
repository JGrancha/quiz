/**
 * Created by jgrancha on 8/06/15.
 */

var quizController = {};
var models = require('../models/models.js')

quizController.question = function(req,res){
    models.Quiz.findAll().success(function(quiz){
        res.render('quizes/question',{title: 'Quiz', pregunta: quiz[0].pregunta , text_Inicio: 'Inicio'});
    });
}

quizController.answer = function(req,res){
    models.Quiz.findAll().success(function(quiz){
        if(req.query.respuesta === quiz[0].respuesta){
            res.render('quizes/answer',{title: 'Quiz', respuesta:'¡Correcta!', text_Boton_Volver: 'Volver a jugar', text_Inicio: 'Inicio'})
        }else{
            res.render('quizes/answer',{title: 'Quiz', respuesta:'¡Incorrecta!', text_Boton_Volver: 'Volver a intentarlo', text_Inicio: 'Inicio'});
        }
    });
}

module.exports = quizController;