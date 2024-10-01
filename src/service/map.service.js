const axios = require('axios');

async function getCepCoordinates(cep) {
    try {
        // Consulta o CEP na API Nominatim para obter as coordenadas
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
        
        if (response.data && response.data.length > 0) {
            // Extrai as coordenadas do resultado da consulta
            const { lat, lon } = response.data[0];
            
            // Gera o link do Google Maps com as coordenadas
      
            return { lat, lon } ;
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        throw new Error('Erro ao processar a solicitação');
    }
}

async function openStreetMap(cep) {
    try {
        // Consulta o CEP na API Nominatim para obter as coordenadas
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
        
        if (response.data && response.data.length > 0) {
            return response.data[0];
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        throw new Error('Erro ao processar a solicitação');
    }
}

module.exports = { getCepCoordinates, openStreetMap };