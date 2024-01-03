const BigQuery = require("@google-cloud/bigquery").BigQuery
const instance = new BigQuery()

module.exports = async function pesquisar (filtro) {
    const opcoes = {
        query: 'SELECT * FROM atividades'
    };

    if(filtro) {
        opcoes.query = `${opcoes.query} WHERE ${filtro}`
    }

    const tabela = instance.dataset('forumAlura').table('atividades')
    const [trabalho] = await tabela.createQueryJob(opcoes)
    const [resultados] = await trabalho.getQueryResults()
    return resultados
}

