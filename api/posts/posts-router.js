// posts için gerekli routerları buraya yazın
const express = require("express");
const Post = require("./posts-model.js");
const router = express.Router();

router.get("/", (req, res) => {
    Post.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({message: "Gönderiler alınamadı"});
    })
});

router.get("/:id", (req,res) => {//params urlnin sonuna yazılan değer
    Post.findById(req.params.id).then(findPost => {
        if(!findPost){
            res.status(404).json({ message: "ID bulunamadı"});
        }else {
            res.json(findPost);
        }
    }).catch(err => {
        res.status(500).json({ message: "Gönderi bilgisi alınamadı"});
    });
});

router.post("/", (req, res) => {//body url nin içeriği
    const {title, contents} = req.body;
    if(!title || !contents){ 
        res.status(400).json({ message: "Gönderi için bir title ve content sağlayın"});
    }else{
        Post.insert({title,contents}).then(({id}) => {
            Post.findById(id).then(findedPost => {
                res.status(201).json(findedPost);
            });
        }).catch( err => {
            res.status(5000).json({message:"Veritabanına kaydedilemedi"});
        })
           
        } 
    }
)

module.exports = router;