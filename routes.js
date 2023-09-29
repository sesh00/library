const express = require("express");
const router = express.Router();
router.get("/page", (req, res, next) => {
    res.end(`Here is a page`); // Ответ
    next(); // Переход к следующему обработчику
});
router.get("/", (req, res, next)=>{
    res.end("ROOT PAGE");
    next();
});
router.get("*", (req, res)=>{
    res.status(404); // Ошибка – нет такой страницы
    res.end("Page not found");
});
module.exports = router;

