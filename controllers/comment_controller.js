/**
 * Created by jgrancha on 18/08/15.
 */


var commentController = {};
var models = require('../models/models.js');

commentController.load = function (req, res, next, commentId) {
    models.Comment.find({
        where: {id: Number(commentId)}
    }).then(function (comment) {
        if (comment) {
            req.comment = comment;
            next();
        } else {
            next(new Error('No existe commentId=' + commentId));
        }
    }).catch(function (error) {
        next(error);
    })

}

commentController.new = function (req, res) {
    res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

commentController.create = function (req, res) {
    var comment = models.Comment.build({texto: req.body.comment.texto, QuizId: req.params.quizId});
    comment.validate().then(function (err) {
        if (err) {
            res.render('comments/new.ejs', {comment: comment, quizid: req.params.quizId, errors: err.errors});
        } else {
            comment.save().then(function () {
                res.redirect('/quizes/' + req.params.quizId);
            })
        }
    }).catch(function (err) {
        next(err);
    })
};

commentController.publish = function(req,res){
    req.comment.publicado = true;

    req.comment.save({fields:['publicado']}).then(function(){
        res.redirect('/quizes/'+ req.params.quizId);
    }).catch(function(error){
        next(error);
    })
}
module.exports = commentController;

