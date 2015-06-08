/**
 * Created by jgrancha on 8/06/15.
 */

var quizController = {};

quizController.question = function(req,res){
    res.render('quizes/question',{title: 'Quiz', pregunta: 'Capital de Italia', text_Inicio: 'Inicio'});
}

quizController.answer = function(req,res){
    req.query.respuesta == 'Roma' ? res.render('quizes/answer',{title: 'Quiz', respuesta:'¡Correcta!', text_Boton_Volver: 'Volver a jugar', text_Inicio: 'Inicio'}) : res.render('quizes/answer',{title: 'Quiz', respuesta:'¡Incorrecta!', text_Boton_Volver: 'Volver a intentarlo', text_Inicio: 'Inicio'});
}

module.exports = quizController;