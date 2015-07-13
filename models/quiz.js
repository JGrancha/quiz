/**
 * Created by jgrancha on 13/07/15.
 */

module.exports = function(sequelize,DataTypes){
    return sequelize.define('Quiz',
        {
            pregunta : DataTypes.STRING,
            respuesta : DataTypes.STRING
        });
    };