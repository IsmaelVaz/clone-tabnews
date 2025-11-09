import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("select 1 + 1 as sum;");
  console.log(result);
  response
    .status(200)
    .json({ mensagem: "Tudo dando certo em. é isso não tem até" });
}

export default status;
