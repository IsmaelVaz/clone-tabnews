function status(request, response) {
  response
    .status(200)
    .json({ mensagem: "Tudo dando certo em. é isso não tem até" });
}

export default status;
