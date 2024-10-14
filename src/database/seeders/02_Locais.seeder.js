const { QueryInterface, Sequelize } = require("sequelize");
const Local = require("../../models/Local");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Local.bulkCreate([
            {
                nome: "Jardim Botânico de Florianópolis",
                descricao: "Parque incrível para um passeio ecológico e muito contato com a natureza, no coração da cidade",
                cep: "88034000",
                rua: "Rod. Admar Gonzaga",
                cidade: "Florianópolis",
                bairro: "Itacorubi",
                uf: "SC",
                latitude: "-27.57891733607178",
                longitude: "-48.50859746172482",
                usuarios_id: 1
            },
            {
                nome: "Fortaleza de São José da Ponta Grossa",
                descricao: "Uma das mais importantes fortificações do Brasil colonial. Foi construída em 1740",
                cep: "88010000",
                rua: "Serv. da Carioca ",
                cidade: "Florianópolis",
                bairro: "Praia do Forte",
                uf: "SC",
                latitude: "-27.43146368866134",
                longitude: "-48.517840386506045",
                usuarios_id: 2
            },
            {
                nome: "Mirante do Morro da Lagoa da Conceição",
                descricao: "Mirante no ponto mais alto da Lagoa da Conceição com um deslumbrante panorama de Florianópolis",
                cep: "88062001",
                rua: "Rod. Admar Gonzaga",
                cidade: "Florianópolis",
                bairro: "Itacorubi",
                uf: "SC",
                latitude: "-27.60024520555293",
                longitude: "-48.48155446421892",
                usuarios_id: 3
            },
            {
                nome: "Praia Brava",
                descricao: "Praia de águas claras, paisagens impressionantes e ondas altas, um paraíso para os surfistas",
                cep: "88056850",
                rua: "Praia Brava",
                cidade: "Florianópolis",
                bairro: "Praia Brava",
                uf: "SC",
                latitude: "-27.401502100265265",
                longitude: "-48.41306939758473",
                usuarios_id: 4
            },
            {
                nome: "Lagoa do Peri",
                descricao: "Lagoa de água doce em um parque natural com área de recreação",
                cep: "88010102",
                rua: "Rod. Francisco Thomaz dos Santos",
                cidade: "Florianópolis",
                bairro: "Morro das Pedras",
                uf: "SC",
                latitude: "-27.729548493594947",
                longitude: "-48.52308748515427",
                usuarios_id: 5
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Local.destroy({
            usuarios_id: [
                1, 
                2,
                3,
                4,
                5,
            ] 
        })
    }
}