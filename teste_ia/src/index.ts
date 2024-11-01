import axios from "axios";
import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post("/ia", (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send("O campo 'text' é obrigatório.");
  }

  Promise.all([
    axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: text,
      stream: false,
      timeOut: 2000
    }),
  ])
    .then((response) => {
      const responseData = response[0].data.response.toString();
      res.send(responseData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Erro ao processar a solicitação.");
    });
});
app.listen(3003, () => {
    console.log(`The server is running on the port: http://localhost:3003`);
});
