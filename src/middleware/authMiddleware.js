const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function autenticar(req, res, next) {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res
			.status(401)
			.json({ mensagem: "Acesso negado, token não fornecido!" });
	}
	//console.log(token);
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.usuario = await User.findById(decoded.id).select("-senha");
		//console.log(req.usuario);
		next();
	} catch (error) {
		res.status(401).json({ mensagem: "Token inválido!" });
	}
}

module.exports = autenticar;
