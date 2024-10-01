const { Router } = require('express')
const Local = require('../models/Local')
const { auth } = require('../middleware/auth')
const { verify } = require('jsonwebtoken')
const { default: axios } = require('axios')
const { openStreetMap } = require('../service/map.service')

const localRoutes = new Router()

//Criar Novo Local
localRoutes.post("/", auth, async(req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Usuário',
                schema: {
                    $nome: "Jardim Botânico de Florianópolis",
                    $descricao: "Lugar cheio de natureza e excelente para fazer um piquinique",
                    $localidade: "localizado no bairro Itacorubi",
                    $cep: "cep",
                    $usuarios_id: "14"      
            }
        }
    */

    try {
        const nome = req.body.nome 
        const descricao = req.body.descricao
        const localidade = req.body.localidade
        const cep = req.body.cep
        const usuarios_id = req.body.usuarios_id

        if (!cep) {
            return res.status(400).json({ message: 'O CEP é obrigatório' })
        }
        
        let resposta = await openStreetMap(cep)
        console.log(resposta)
        let coordenadas = `${resposta.display_name}, Lat: ${resposta.lat}, Lon: ${resposta.lon}`;

        
            const local = await Local.create({
                nome: nome,
                descricao: descricao,
                localidade: localidade,
                cep: cep,
                usuarios_id: usuarios_id,
                coordenadas: coordenadas                     
            })
                res.json(local)
            
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível criar o local!' })
    }
})


// Listar Local com base no Id do usuário logado.
localRoutes.get("/", auth, async (req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['parameterName'] = {
                in: 'query',
                description: 'Realiza o login no sistema.',
                type: "number"       
            }
        }
    */

    try {

        const token = req.headers.authorization;

        if (!token) {
            console.error(error, error)
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;
        console.log(req.id)

        const listarPorId = await Local.findAll({
            where: {
                usuarios_id: Token.sub
            }
        })
        res.status(200).json({listarPorId})

    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})


// Listar informações detalhadas de um local específico
localRoutes.get("/:id", auth, async(req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['id'] = {
                in: 'query',
                description: 'Lista informações detalhadas de um local selecionado pelo usuário.',
                type: "number"       
            }
        }
    */

    try {
        const { id } = req.params

        const token = req.headers.authorization;

        if (!token) {
            console.error(error, error)
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const listarLocal = await Local.findOne({
            where: {
                id: id,
                usuarios_id: Token.sub
            }
        })

        if (listarLocal){
            res.status(200).json({listarLocal})  
        } else {
            res.status(400).json({message: "não existe local cadastrado neste ID"})
        }
    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})


// Atualizar local
localRoutes.put("/:local_id", auth, async(req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['local_id'] = {
                in: 'path',
                description: 'Pega o Id do local no banco de dados.',
                type: "number"       
            }
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Atualiza um local cadastrado.',
                schema: {
                    $nome: "Jardim Botânico de Florianópolis",
                    $descricao: "Lugar cheio de natureza e excelente para fazer um piquinique e levar crianças para passear",
                    $localidade: "localizado no bairro Itacorubi",
                    $cep: "88015200",     
            }
        }
    */

    try {
        let { local_id } = req.params

        const nome = req.body.nome
        const descricao = req.body.descricao
        const localidade = req.body.localidade
        const cep = req.body.cep
        const usuarios_id = req.body.usuarios_id

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const editLocal = await Local.findOne({
            where: {
                id: local_id,
                usuarios_id: Token.sub
            }
        })

        if (editLocal){
            editLocal.update({
                nome : nome, 
                descricao : descricao, 
                localidade : localidade,
                cep : cep,
                usuarios_id : usuarios_id
            })
                
            await editLocal.save()

            res.status(200).json({message:"Local atualizado com sucesso!"})  
        } else {
            res.status(400).json({message: "não existe local cadastrado neste ID"})
        }
    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})


// Deletar local
localRoutes.delete("/:local_id", auth, async(req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['local_id'] = {
                in: 'path',
                description: 'Deleta o local do banco de dados',
                type: "number"       
            }
        }
    */

    try {
        const { local_id } = req.params

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const local = await Local.findOne({
            where: {
                id: local_id,
                usuarios_id: Token.sub
            }
        })

        if (local){
            local.destroy()
            res.status(204).json({})  
        } else {
            res.status(400).json({message: "Local não encontrado"})
        }

    } catch (error) {
         console.error("Erro ao validar o token JWT:", error);
         return res.status(401).json({ error: "Acesso negado"})
    }
})


//Disponibilizar link maps
localRoutes.get("/:local_id/maps", auth, async(req, res) => {
    /*  
            #swagger.tags = ['Link Maps'],
            #swagger.parameters['local_id'] = {
                in: 'path',
                description: 'Gera o link para o Google Maps',
                type: "number"       
            }
        }
    */
    try {
        const { local_id } = req.params

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token não é válido" });
        }

        const Token = verify(token, process.env.SECRET_JWT);
        req.id = Token.sub;

        const cep = await Local.findOne({
            where: {
                id: local_id,
                usuarios_id: Token.sub
            }
        })
        console.log(cep.cep)
    
        const buscar = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep.cep}&country=Brazil&limit=1`);
        console.log(buscar.data)

        if (buscar.data && buscar.data.length > 0) {
            const {lat, lon } = buscar.data[0];
            console.log(lat)
            console.log(lon)

            const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

            console.log(googleMapsLink);
            res.send({ googleMapsLink });
        }else {
            console.log("CEP não encontrado")
            res.status(404).send({ error: 'CEP não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        res.status(500).send({ error: 'Erro ao processar a solicitação' });
    }
    
})

module.exports = localRoutes
