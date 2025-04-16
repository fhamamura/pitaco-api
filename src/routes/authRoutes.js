const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const gerarToken = require("../config/jwt");

const router = express.Router();

/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário criado com sucesso!"
 *                 token:
 *                   type: string
 *                   example: "jwt-token-aqui"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1234567890"
 *                     nome:
 *                       type: string
 *                       example: "Meu Nome"
 *                     email:
 *                       type: string
 *                       example: "meusuario@meuusuario.com"
 *                     tipo:
 *                       type: string
 *                       example: "aluno"
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "meusuario@meuusuario.com"
 *               senha:
 *                 type: string
 *                 example: "minhasenha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *                 token:
 *                   type: string
 *                   example: "jwt-token-aqui"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1234567890"
 *                     nome:
 *                       type: string
 *                       example: "Meu Nome"
 *                     email:
 *                       type: string
 *                       example: "meusuario@meuusuario.com"
 *                     tipo:
 *                       type: string
 *                       example: "aluno"
 *       400:
 *         description: Erro de validação ou credenciais inválidas
 *       500:
 *         description: Erro no servidor
 */

// Rota de Cadastro
router.post("/registro", async (req, res) => {
	try {
		const { nome, email, senha, tipo } = req.body;

		if (!nome || !email || !senha || !tipo) {
			return res
				.status(400)
				.json({ mensagem: "Preencha todos os campos!" });
		}

		const usuarioExistente = await User.findOne({ email });
		if (usuarioExistente) {
			return res.status(400).json({ mensagem: "Email já cadastrado!" });
		}

		const novoUsuario = await User.create({ nome, email, senha, tipo });

		res.status(201).json({
			mensagem: "Usuário criado com sucesso!",
			token: gerarToken(novoUsuario._id),
			usuario: { id: novoUsuario._id, nome, email, tipo },
		});
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro no servidor",
			erro: error.message,
		});
	}
});

// Rota de Login
router.post("/login", async (req, res) => {
	try {
		const { email, senha } = req.body;
		if (!email || !senha) {
			return res
				.status(400)
				.json({ mensagem: "Preencha todos os campos!" });
		}
		const usuario = await User.findOne({ email });
		if (!usuario) {
			return res
				.status(400)
				.json({ mensagem: "Usuário não encontrado!" });
		}

		const senhaValida = await bcrypt.compare(senha, usuario.senha);
		if (!senhaValida) {
			return res.status(400).json({ mensagem: "Senha incorreta!" });
		}

		res.json({
			mensagem: "Login realizado com sucesso!",
			token: gerarToken(usuario._id),
			usuario: {
				id: usuario._id,
				nome: usuario.nome,
				email: usuario.email,
				tipo: usuario.tipo,
			},
		});
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro no servidor",
			erro: error.message,
		});
	}
});

//logout
router.get("/logout", (req, res) => {
	res.json({
		auth: false,
		token: null,
		mensagem: "Logout realizado com sucesso!",
	});
});

module.exports = router;
