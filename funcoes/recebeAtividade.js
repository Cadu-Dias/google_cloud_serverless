const pubsub = require('./pubsub.js')

module.exports = async function recebeAtividade (requisicao, resposta) {
    const atividade = requisicao.body
    if (!atividade.hasOwnProperty('data_criacao_atividade')) {
        resposta.send('O campo data_criacao_atividade não foi enviado') 
        return
    }
    const tiposDeAtividade = ['criar-pergunta', 'responder-pergunta']
    if (tiposDeAtividade.indexOf(atividade.tipo_de_atividade) === -1) {
        resposta.send('O campo tipo_de_atividade está inválido ou não foi informado')
        return
    }
    if (!atividade.hasOwnProperty('nome_do_curso')) {
        resposta.send('O campo nome_do_curso não foi informado')
        return
    }
    if (!atividade.hasOwnProperty('nome_da_aula')) {
        resposta.send('O campo nome_da_aula não foi informado')
        return
    }
    if (!atividade.hasOwnProperty('texto')) {
        resposta.send('O campo texto não foi informado')
        return
    }
    if (atividade.texto.length > 255) {
        resposta.send('O campo texto é maior que 255 caracteres')
        resposta.send('Diminua o tamanho do texto!')
        return
    }
    const resultado = await pubsub(atividade, 'atividades')
    resposta.send(`Atividade enviada com sucesso: ${resultado}`)
}