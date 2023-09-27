/*1°) Importações*/
const express = require('express');
const router = express.Router();

//vamos carregar nosso modelo 
const Responsavel = require("../models/Responsavel");

const verificarAutenticacao =
require('../middleware/VerificarAutenticacao');

/* Passo 2*/
router.get('/responsavel', verificarAutenticacao, (req, res) => {
    Responsavel.findAll().then((responsaveis) => {
        responsaveis = responsaveis.map((responsavel) => {
            return responsavel.toJSON();
        });
        res.render("admin/responsavel/responsavel", { responsaveis: responsaveis });
    });
});

/* Passo 3 */
router.get('/responsavel/add', (req, res) => {
    res.render("admin/responsavel/addresponsavel");
});

/* Passo 4 */
router.get('/editar_responsavel/:id', (req, res) => {
    Responsavel.findAll({ where: { 'id_responsavel': req.params.id } }).then((responsaveis) => {
        responsaveis = responsaveis.map((responsavel) => { return responsavel.toJSON() });
        res.render("admin/responsavel/editresponsavel", { responsaveis: responsaveis });
    });
});

/* Passo 5 */
router.post('/responsavel/nova', (req, res) => {
    Responsavel.create({
        nome_responsavel: req.body.nome_responsavel
    }).then(() => {
        /////////////////////////
        res.redirect("/rota_responsavel/responsavel");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});

/* Passo 6 */
router.post('/responsavel/editar_responsavel', (req, res) => {
    Responsavel.update({
        nome_responsavel: req.body.nome_responsavel
    },
        {
            where: { id_responsavel: req.body.id_responsavel }
        }).then(() => {
            res.redirect("/rota_responsavel/responsavel");
        }).catch((erro) => {
            res.send("Esta turma não existe " + erro);
        });
});

/* Passo 7 */
router.get('/deletar_responsavel/:id', (req, res) => {
    Responsavel.destroy({ where: { 'id_responsavel': req.params.id } }).then(() => {
        res.redirect("/rota_responsavel/responsavel");
    }).catch((err) => {
        res.render("Esse turma não existe");
    });
});
/*______ Fim das rotas da turma ___________ */
module.exports = router;