const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Local = connection.define("locais", {
    nome: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING
    },
    localidade: {
        type: DataTypes.STRING
    },
    cep: {
        type: DataTypes.STRING
    },
    usuarios_id: {
        type: DataTypes.INTEGER
    },
    coordenadas: {
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
})

module.exports = Local