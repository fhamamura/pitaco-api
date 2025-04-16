require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Class = require("./models/Class");
const Feedback = require("./models/Feedback");

connectDB();

async function testarModelos() {
  try {
    // Criar um professor
    const professor = await User.create({
      nome: "Professor Teste",
      email: "professor@email.com",
      senha: "123456",
      tipo: "professor",
    });

    // Criar um aluno
    const aluno = await User.create({
      nome: "Aluno Teste",
      email: "aluno@email.com",
      senha: "123456",
      tipo: "aluno",
    });

    // Criar uma aula
    const aula = await Class.create({
      titulo: "Matemática Básica",
      professorId: professor._id,
      data: new Date(),
    });

    // Criar um feedback
    const feedback = await Feedback.create({
      classId: aula._id,
      alunoId: aluno._id,
      professorId: professor._id,
      nota: 4,
      sentimento: "positivo",
      comentario: "A aula foi bem explicada!",
    });

    console.log("Testes concluídos com sucesso!");
  } catch (error) {
    console.error("Erro nos testes:", error);
  }
}

testarModelos();
