const express = require("express");
const Feedback = require("../models/Feedback");
const autenticar = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /professores/dashboard:
 *   get:
 *     summary: Painel geral do professor com estatísticas de feedbacks
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Painel carregado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFeedbacks:
 *                   type: integer
 *                   example: 10
 *                 mediaNota:
 *                   type: string
 *                   example: "4.5"
 *                 sentimentos:
 *                   type: object
 *                   properties:
 *                     positivo:
 *                       type: integer
 *                       example: 7
 *                     neutro:
 *                       type: integer
 *                       example: 2
 *                     negativo:
 *                       type: integer
 *                       example: 1
 *                 alerta:
 *                   type: string
 *                   example: "Tudo sob controle"
 *       500:
 *         description: Erro ao carregar painel
 */

/**
 * @swagger
 * /professores/relatorio/{classId}:
 *   get:
 *     summary: Relatório detalhado de feedbacks de uma aula
 *     tags: [Professores]
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
 *         description: Relatório carregado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classId:
 *                   type: string
 *                   example: "643f1b2c3d4e5f6a7b8c9d0e"
 *                 totalFeedbacks:
 *                   type: integer
 *                   example: 5
 *                 mediaNota:
 *                   type: string
 *                   example: "4.2"
 *                 sentimentos:
 *                   type: object
 *                   properties:
 *                     positivo:
 *                       type: integer
 *                       example: 3
 *                     neutro:
 *                       type: integer
 *                       example: 1
 *                     negativo:
 *                       type: integer
 *                       example: 1
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "643f1b2c3d4e5f6a7b8c9d0f"
 *                       classId:
 *                         type: string
 *                         example: "643f1b2c3d4e5f6a7b8c9d0e"
 *                       alunoId:
 *                         type: string
 *                         example: "643f1b2c3d4e5f6a7b8c9d0g"
 *                       nota:
 *                         type: number
 *                         example: 4.5
 *                       sentimento:
 *                         type: string
 *                         example: "positivo"
 *                       comentario:
 *                         type: string
 *                         example: "Ótima aula, muito bem explicada!"
 *       500:
 *         description: Erro ao carregar relatório
 */

//Painel Geral do Professor
router.get("/dashboard", autenticar, async (req, res) => {
	try {
		const professorId = req.usuario._id;
		const feedbacks = await Feedback.find({ professorId });

		if (!feedbacks.length) {
			return res.json({ mensagem: "Ainda não há feedbacks." });
		}

		const totalNotas = feedbacks.reduce((soma, f) => soma + f.nota, 0);
		const mediaNota = (totalNotas / feedbacks.length).toFixed(2);
		const sentimentos = { positivo: 0, neutro: 0, negativo: 0 };
		feedbacks.forEach((f) => sentimentos[f.sentimento]++);
		const alerta =
			sentimentos.negativo > feedbacks.length * 0.3
				? "Muitos feedbacks negativos!"
				: "Tudo sob controle";

		res.json({
			totalFeedbacks: feedbacks.length,
			mediaNota,
			sentimentos,
			alerta,
		});
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao carregar painel",
			erro: error.message,
		});
	}
});

//Relatório de uma Aula
router.get("/relatorio/:classId", autenticar, async (req, res) => {
	try {
		const { classId } = req.params;

		const feedbacks = await Feedback.find({ classId });

		if (!feedbacks.length) {
			return res.json({
				mensagem: "Ainda não há feedbacks para esta aula.",
			});
		}

		const totalNotas = feedbacks.reduce((soma, f) => soma + f.nota, 0);
		const mediaNota = (totalNotas / feedbacks.length).toFixed(2);
		const sentimentos = { positivo: 0, neutro: 0, negativo: 0 };
		feedbacks.forEach((f) => sentimentos[f.sentimento]++);

		res.json({
			classId,
			totalFeedbacks: feedbacks.length,
			mediaNota,
			sentimentos,
			feedbacks,
		});
	} catch (error) {
		res.status(500).json({
			mensagem: "Erro ao carregar relatório",
			erro: error.message,
		});
	}
});

module.exports = router;
