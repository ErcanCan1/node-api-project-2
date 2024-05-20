// server için gerekli olanları burada ayarlayın
const express = require("express");
const server = express();
server.use(express.json());
// posts router'ını buraya require edin ve bağlayın
const router = require("./posts/posts-router.js");
server.use("/api/posts", router);

module.exports =server;
