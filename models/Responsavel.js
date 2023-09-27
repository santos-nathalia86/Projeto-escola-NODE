const db = require('./db');
//reproduzindo a tabela Turma 
const Responsavel = db.sequelize.define('responsavel', {
    id_responsavel: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_responsavel: {
        type: db.Sequelize.TEXT
    }
    //freezeTableName: true define 
    //o nome da tabela sem o S 
}, { freezeTableName: true });
module.exports = Responsavel;