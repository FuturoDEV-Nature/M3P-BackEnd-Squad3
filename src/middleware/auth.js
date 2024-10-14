const { verify } = require("jsonwebtoken")


async function auth(req, res, next) {
    try {
        console.log("Executamos o Middleware auth")

        const { authorization } = req.headers;
        
        if (!authorization) {
            return res.status(401).json({ message: "Token não fornecido!" });
    }

    req.payload = verify(authorization, process.env.SECRET_JWT);
    next();
    
  } catch (error) {
    return res.status(401).json({
      message: "Autenticação falhou!",
      cause: error.message,
    });
  }
}

module.exports = { auth }