const db = require('./db');
//reproduzindo a tabela Turma 
const Turma = db.sequelize.define('turma', {
    id_turma: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
},
    descricao: {
    type: db.Sequelize.TEXT
},
    responsavel_fk:{
        type: db.Sequelize.INTEGER,
        references: {model: 'responsavel', key:'id_responsavel'},
        onDelete: 'CASCADE',
        allowNull: false,
    }
//freezeTableName: true define 
//o nome da tabela sem o S 
}, { freezeTableName: true });
module.exports = Turma;