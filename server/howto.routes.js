module.exports = app => {
  const howtos = require("./howto.controller.js");

  app.post("/howtos", howtos.create);

  app.get("/howtos/", howtos.findAll);

  app.get("/howtos/:howtoId", howtos.findOne);

  app.put("/howtos/:howtoId", howtos.update);

  app.delete("howtos/:howtoId", howtos.delete);
};
