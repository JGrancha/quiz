/**
 * Created by jgrancha on 13/08/15.
 */

//Definición del modelo quiz

module.exports = function(sequelize, DataTypes){
    return sequelize.define('Quiz',
        {
            pregunta: DataTypes.STRING,
            respuesta: DataTypes.STRING,
        });
}