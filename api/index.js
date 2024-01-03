const Koa = require('koa')
const processador = require('koa-bodyparser')
const conversor = require('basic-auth')
const aplicacao = new Koa()
const pesquisar = require('../bigquery/pesquisar')
require("dotenv").config()

aplicacao.use(processador())
aplicacao.use(async (contexto) => {
    if(contexto.request.headers.authorization) {
        const usuarioESenha = conversor.parse(contexto.request.headers.authorization)
        const nome = process.env.USUARIO
        const senha = process.env.SENHA
        if(usuarioESenha.name !== nome || usuarioESenha.pass !== senha) {
            contexto.body = {
                mensagem: "Acesso negado"
            }
            return 
        }
        const corpoDaRequisicao = contexto.request.body
        contexto.status = 200
        //filtro é um dos atributos da propriedade requisição
        contexto.body = await pesquisar(corpoDaRequisicao.filtro)
    }
    else {
        contexto.body = {
            mensagem: "Acesso negado, insira a parte de autorização"
        }
    }
})

aplicacao.listen(3000)
console.log("A API está funcionando normalmente")

