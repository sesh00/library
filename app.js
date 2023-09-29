const express = require("express");
const server = express();
const routes = require("./routes");
server.use("/", routes);
server.listen(3000, ()=>{ // Запуск
    console.log("Server started at http://localhost:3000/page")
});
