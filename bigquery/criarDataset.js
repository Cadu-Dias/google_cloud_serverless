const BigQuery = require("@google-cloud/bigquery").BigQuery
const instance = new BigQuery()

async function criarDataset() {
    const [datasets] = await instance.getDatasets() 
    const nomeDataset = 'forumAlura'
    const datasetsFiltrados = datasets.filter(function (datasetAtual) {
        return datasetAtual.id === nomeDataset
    })

    if(datasetsFiltrados.length > 0) {
        console.log("Este dataset já é existente")
        return 
    }

    await instance.createDataset(nomeDataset)
    console.log("Dataset criado com sucesso!")
}

criarDataset()


