const express = require("express");
const Feedback = require("../models/Feedback");
const Class = require("../models/Class");
const autenticar = require("../middleware/authMiddleware");
//const analisarSentimento = require("../services/sentimentAnalysis");

const router = express.Router();

/**
 * @swagger
 * /pitaco:
 *   post:
 *     summary: Envia um feedback (Pitaco) para uma aula
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *                 example: "643f1b2c3d4e5f6a7b8c9d0e"
 *               nota:
 *                 type: number
 *                 example: 4.5
 *               comentario:
 *                 type: string
 *                 example: "Ótima aula, muito bem explicada!"
 *     responses:
 *       201:
 *         description: Pitaco enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Pitaco enviado!"
 *                 feedback:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "643f1b2c3d4e5f6a7b8c9d0f"
 *                     classId:
 *                       type: string
 *                       example: "643f1b2c3d4e5f6a7b8c9d0e"
 *                     alunoId:
 *                       type: string
 *                       example: "643f1b2c3d4e5f6a7b8c9d0g"
 *                     professorId:
 *                       type: string
 *                       example: "643f1b2c3d4e5f6a7b8c9d0h"
 *                     nota:
 *                       type: number
 *                       example: 4.5
 *                     sentimento:
 *                       type: string
 *                       example: "positivo"
 *                     comentario:
 *                       type: string
 *                       example: "Ótima aula, muito bem explicada!"
 *       500:
 *         description: Erro ao enviar pitaco
 */

/**
 * @swagger
 * /pitaco/{classId}:
 *   get:
 *     summary: Obtém todos os feedbacks (Pitacos) de uma aula
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     responses:
 *       200:
 *         description: Lista de feedbacks obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "643f1b2c3d4e5f6a7b8c9d0f"
 *                   classId:
 *                     type: string
 *                     example: "643f1b2c3d4e5f6a7b8c9d0e"
 *                   alunoId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "643f1b2c3d4e5f6a7b8c9d0g"
 *                       nome:
 *                         type: string
 *                         example: "Aluno João"
 *                   professorId:
 *                     type: string
 *                     example: "643f1b2c3d4e5f6a7b8c9d0h"
 *                   nota:
 *                     type: number
 *                     example: 4.5
 *                   sentimento:
 *                     type: string
 *                     example: "positivo"
 *                   comentario:
 *                     type: string
 *                     example: "Ótima aula, muito bem explicada!"
 *       500:
 *         description: Erro ao buscar pitacos
 */

// Enviar Pitaco
router.post("/pitaco", autenticar, async (req, res) => {
	try {
		const { classId, nota, comentario } = req.body;
		const alunoId = req.usuario._id;
		const aula = await Class.findById(classId);
		if (!aula)
			return res.status(404).json({ mensagem: "Aula não encontrada!" });

		// Analisar sentimento
		//const sentimento = await analisarSentimento(comentario);
		const sentimento = "positivo"; // Placeholder para análise de sentimento

		const feedback = await Feedback.create({
			classId,
			alunoId,
			professorId: aula.professorId,
			nota,
			sentimento,
			comentario,
		});

		res.status(201).json({ mensagem: "Pitaco enviado!", feedback });
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao enviar pitaco",
			erro: error.message,
		});
	}
});

// Obter feedbacks de uma aula
router.get("/pitaco/:classId", autenticar, async (req, res) => {
	try {
		const { classId } = req.params;
		const feedbacks = await Feedback.find({ classId }).populate(
			"alunoId",
			"nome"
		);
		res.json(feedbacks);
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao buscar pitacos",
			erro: error.message,
		});
	}
});

module.exports = router;
