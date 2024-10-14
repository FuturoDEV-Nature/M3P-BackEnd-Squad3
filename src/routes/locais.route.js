const { Router } = require('express')
const Local = require('../models/Local')
const { auth } = require('../middleware/auth')
const { verify } = require('jsonwebtoken')
const { default: axios } = require('axios')

const localRoutes = new Router()

//Criar Novo Local
localRoutes.post("/", async(req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo local',
                schema: {
                    $nome: "Jardim Botânico de Florianópolis",
                    $descricao: "Lugar cheio de natureza e excelente para fazer um piquinique",                   
                    $cep: "88015200",
                    $rua: "Rua A",
                    $cidade: "Florianópolis",
                    $bairro: "Itacorubi",
                    $uf: "SC",
                    $latitude: "-47.123123",
                    $longitude: "-90.123123",
                    $usuarios_id: "14"      
            }
        }
    */

    try {
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const rua = req.body.rua;
        const cidade = req.body.cidade;
        const bairro = req.body.bairro;
        const uf = req.body.uf;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const cep = req.body.cep;
        const usuarios_id = req.body.usuarios_id;

        console.log("Recebido do frontend:", req.body); // Verifica os dados recebidos do frontend

        const local = await Local.create({
            nome: nome,
            descricao: descricao,
            rua: rua,
            cidade: cidade,
            bairro: bairro,
            uf: uf,
            latitude: latitude,
            longitude: longitude,
            cep: cep,
            usuarios_id : usuarios_id                         
        });

        res.status(201).json(local);
    } catch (error) {
        console.error("Erro ao criar local:", error.message); // Exibe o erro detalhado no log
        res.status(500).json({ error: 'Não foi possível criar o local!' });
    }
});



// Listar Local com base no ID do usuário logado.
localRoutes.get("/", auth, async (req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['parameterName'] = {
                in: 'query',
                description: 'Lista Locais com base no ID do usuário logado.',
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


 // Listar todos os locais.
 localRoutes.get("/all", async (req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['parameterName'] = {
                in: 'query',
                description: 'Lista todos os locais cadastrados.',
                type: "number"       
            }
        }
    */

    try {

        const listarAll = await Local.findAll({
        })
        res.status(200).json({listarAll})

    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar os locais"})
    }
})


// Listar informações detalhadas de um local específico
localRoutes.get("/:id", auth, async(req, res) => {
    /*  
            #swagger.tags = ['Local'],
            #swagger.parameters['id'] = {
                in: 'query',
                description: 'Filtrar local',
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
                id: id
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
                    $rua: "Rua A",
                    $cidade: "Florianópolis",
                    $bairro: "Itacorubi",
                    $uf: "SC",
                    $latitude: "-47.123123",
                    $longitude: "-90.123123",
                    $cep: "88015200" 
            }
        }
    */

    try {
        let { local_id } = req.params

        const nome = req.body.nome
        const descricao = req.body.descricao
        const rua = req.body.rua
        const cidade = req.body.cidade
        const bairro = req.body.bairro
        const uf = req.body.uf
        const latitude = req.body.latitude
        const longitude = req.body.longitude
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
                rua : rua,
                cidade : cidade,
                bairro : bairro,
                uf : uf,
                latitude : latitude,
                longitude : longitude,
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
localRoutes.delete("/:local_id", auth, async (req, res) => {
    try {
        const { local_id } = req.params;

        const userId = req.payload.sub;

        const local = await Local.findOne({
            where: {
                id: local_id,
                usuarios_id: userId
            }
        });

        if (local) {
            await local.destroy();
            res.status(204).json({});
        } else {
            res.status(400).json({ message: "Local não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar o local:", error);
        return res.status(401).json({ error: "Acesso negado" });
    }
});


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
