/**
 * Created by jgrancha on 13/07/15.
 */

var authorController = {};

authorController.author = function(req,res){
    res.render('author/author',{title: 'Quiz', nombre: 'José', apellidos: 'Grancha Bonora'});
}

module.exports = authorController;