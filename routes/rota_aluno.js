/* rota aluno */
/*1°) Importações*/
const express = require('express');
const router = express.Router();
//vamos carregar nosso modelo 
const Turma = require("../models/Turma");
const Aluno = require("../models/Aluno");
const verificarAutenticacao =
require('../middleware/VerificarAutenticacao');

//_____________ Rotas dos Alunos __________________ 
router.get('/aluno', verificarAutenticacao, (req, res) => {
    Aluno.sequelize.query("select * from selecAluno",
    { model: Aluno }).then(function (alunos) {
    var nalunos = JSON.parse(JSON.stringify(alunos));
    res.render("admin/aluno/aluno",
    { alunos: nalunos });
    });
});

router.get('/aluno/add', (req, res) => {
    Turma.findAll().then((turmas) => { 
    var nturmas = JSON.parse(JSON.stringify(turmas));
    ///////////////////////////
    res.render("admin/aluno/addaluno", { turmas: nturmas});
    }); 
});

router.get('/editar_aluno/:id', (req, res) => {
    Aluno.findAll({ where: { 'id_aluno': req.params.id } }).then((alunos)=> { Turma.findAll().then((turmas) => {
    var nturmas = JSON.parse(JSON.stringify(turmas));
    var nalunos = JSON.parse(JSON.stringify(alunos));
    ////////////////////////////
    res.render("admin/aluno/editaluno", { alunos: nalunos, 
    turmas: nturmas });
    });
    });
});

router.post('/aluno/nova', (req, res) => {
    Aluno.create({
    matricula: req.body.matricula,
    nome: req.body.nome,
    fk_turma: req.body.fk_turma
    }).then(() => {
    res.redirect("/rota_aluno/aluno");
    }).catch((erro) => {
        /////////////////////////////////////////////////////////
    res.send('Houve um erro: ' + erro);
    });
});

router.post('/aluno/editar_aluno', (req, res) => {
    Aluno.update({
    matricula: req.body.matricula,
    nome: req.body.nome,
    fk_turma: req.body.fk_turma
    },
    {
    where: { id_aluno: req.body.id_aluno }
    }).then(() => {
    res.redirect("/rota_aluno/aluno");
    }).catch((erro) => {
        //////////////////////////////////////
    res.send("Este aluno não existe " + erro);
    });
});

router.get('/deletar_aluno/:id', (req, res) => {
    Aluno.destroy({ where: { 'id_aluno': req.params.id } }).then(() => {
    res.redirect("/rota_aluno/aluno");
    }).catch((err) => {
    res.render("Esse aluno não existe");
    });
});
module.exports = router;