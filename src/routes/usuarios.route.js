const { Router } = require('express')
const Usuario = require('../models/Usuario')
const { auth } = require('../middleware/auth')
const { hashPassword } = require('../utils/bcryptHelper');

const usuarioRoutes = new Router()

usuarioRoutes.post("/", async(req, res) => {
    /*  
            #swagger.tags = ['Usuário'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Usuário',
                schema: {
                    $nome: "Novo Usuário",
                    $cpf: "03834285120",
                    $sexo: "masculino",
                    $cep: "88117410",
                    $rua: "Rua dos Maracujás",                    
                    $bairro: "Açaí",
                    $cidade: "Florianópolis",
                    $uf: "SC",
                    $dataNascimento: "1996-12-15",
                    $email: "usuario123@gmail.com",
                    $password: "senha123456",      
            }
        }
    */

    try {
        const nome = req.body.nome 
        let cpf = req.body.cpf
        const sexo = req.body.sexo
        const cep = req.body.cep
        const rua = req.body.rua
        const bairro = req.body.bairro
        const cidade = req.body.cidade
        const uf = req.body.uf
        const dataNascimento = req.body.dataNascimento
        const email = req.body.email
        const password = req.body.password

        cpf = cpf.replace(/\D/g, '')

        // console.log(cpf)
        const validCpf = (cpf) => cpf.length === 11;
        if (!validCpf(cpf)) {
            return res.status(400).json({ message: "CPF inválido" });
        }

        
        if(!validCpf(cpf) ){
            return res.status(400).json({message: "CPF inválido"})
        }


        const VerifyCpf = await Usuario.findOne({
            where: {
                cpf: cpf,
            }
        })
        const VerifyEmail = await Usuario.findOne({
            where: {
                email: email,
            }
        })

        if (VerifyCpf){
            return res.status(409).json({ message: "CPF já cadastrado!"})
        }

        if (VerifyEmail){
            return res.status(409).json({ message: "Email já cadastrado!"})
        }

        const hashedPassword = await hashPassword(password); // Criptografando a senha

        const usuario = await Usuario.create({
            nome: nome,
            cpf: cpf,
            sexo: sexo,
            cep: cep,
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            dataNascimento: dataNascimento,
            email: email,
            password: hashedPassword
        })
        res.status(201).json(usuario)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário' })
    }
})

usuarioRoutes.get("/ativos", async(req, res) => {
     /*  
            #swagger.tags = ['Usuário'],
    */
    try {
        const totalUsuarios = await Usuario.count({where: {loggedIn: true}})

        res.status(200).json(totalUsuarios);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Erro no servidor, não foi possível localizar os usuários ativos' })
    }
})

module.exports = usuarioRoutes