const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtém todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "643f1b2c3d4e5f6a7b8c9d0e"
 *                   nome:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     example: "joao.silva@email.com"
 *                   tipo:
 *                     type: string
 *                     example: "aluno"
 *       500:
 *         description: Erro ao buscar usuários
 */

// Obter todos os usuários
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao buscar usuários",
			erro: error.message,
		});
	}
});

module.exports = router;
