const BigQuery = require('@google-cloud/bigquery').BigQuery
const instancia = new BigQuery()

module.exports = function inserir (linhas) {
    const dataset = instancia.dataset('Coloque o nome do dataset')
    const tabela = dataset.table('Coloque o nome da tabela do dataset') 

    return tabela.insert(linhas)
}

