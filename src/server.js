require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
//const redisClient = require("./config/redis");

const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const professorRoutes = require("./routes/professorRoutes");

const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração Swagger
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "PITACO API",
			version: "1.0.0",
			description: "API para Pitaco",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use("/users", userRoutes);
app.use("/classes", classRoutes);
app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/professores", professorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
