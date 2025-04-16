const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analisarSentimento(comentario) {
  if (!comentario) return "neutro";

  const prompt = `Classifique o seguinte comentário em: positivo, neutro ou negativo.\n\n"${comentario}"`;

  try {
    const resposta = await openai.completions.create({
      model: "gpt-4o-mini",
      prompt,
      max_tokens: 10,
    });

    const sentimento = resposta.choices[0].text.trim().toLowerCase();
    return ["positivo", "neutro", "negativo"].includes(sentimento) ? sentimento : "neutro";
  } catch (error) {
    console.error("Erro na análise de sentimentos:", error);
    return "neutro";
  }
}

module.exports = analisarSentimento;
