const express = require("express");
const Class = require("../models/Class");
const autenticar = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Obtém todas as aulas
 *     tags: [Aulas]
 *     responses:
 *       200:
 *         description: Lista de aulas obtida com sucesso
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
 *                   titulo:
 *                     type: string
 *                     example: "Aula de Matemática"
 *                   data:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-14T12:00:00.000Z"
 *                   professorId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "643f1b2c3d4e5f6a7b8c9d0f"
 *                       nome:
 *                         type: string
 *                         example: "Professor João"
 *       500:
 *         description: Erro ao buscar aulas
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Cria uma nova aula
 *     tags: [Aulas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Aula de Física"
 *               professorId:
 *                 type: string
 *                 example: "643f1b2c3d4e5f6a7b8c9d0f"
 *     responses:
 *       201:
 *         description: Aula criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Aula criada!"
 *                 aula:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "643f1b2c3d4e5f6a7b8c9d0e"
 *                     titulo:
 *                       type: string
 *                       example: "Aula de Física"
 *                     data:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-14T12:00:00.000Z"
 *                     professorId:
 *                       type: string
 *                       example: "643f1b2c3d4e5f6a7b8c9d0f"
 *       500:
 *         description: Erro ao criar aula
 */

// obter todas as aulas
router.get("/", async (req, res) => {
	try {
		const aulas = await Class.find().populate("professorId", "nome");
		res.json(aulas);
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao buscar aulas",
			erro: error.message,
		});
	}
});

// criar aula
router.post("/", async (req, res) => {
	try {
		const data = new Date();
		const { titulo, professorId } = req.body;
		const aula = await Class.create({ titulo, data, professorId });
		res.status(201).json({ mensagem: "Aula criada!", aula });
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao criar aula",
			erro: error.message,
		});
	}
});

module.exports = router;
