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

/*router.post("/", (req, res) => {//body url nin içeriği
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
)*/

router.post("/", async (req, res) => {//yukardaki postun async await li hali
    const {title, contents} = req.body;
    if(!title || !contents){ 
        res.status(400).json({ message: "Gönderi için bir title ve content sağlayın"});
    }else{
        try {
            let response= await Post.insert({title, contents});
            let insertPost = await Post.findById(respnde.id);
            res.status(201).json(insertPost);
        } catch (error) {
            res.status(5000).json({message:"Veritabanına kaydedilemedi"});
        }
        Post.insert({title,contents}).then(({id}) => {
            Post.findById(id).then(findedPost => {
                res.status(201).json(findedPost);
            });
        }).catch( err => {
            res.status(5000).json({message:"Veritabanına kaydedilemedi"});
        })
           
        } 
    })

    router.put("/:id", async (req, res) =>{
        let existPost = await Post.findById(req.params.id);
        if(!existPost){
            res.status(500).json({message:"Belirtilen id li gönderi bulunamadı"});
        } else{
            let { title, contents} =req.body;
            if(!title || !contents){
                res.status(400).json({message:"Gönderi için title ve content sağlayın"});
            }else{
                try {
                    let updatedPostId = await Post.update(req.params.id, req.body);
                    let updatedPost = await Post.findById(updatedPostId);
                    res.status(200).json(updatedPost);
                } catch (error) {
                    res.status(500).json({message: "Gönderi bilgileri güncellenemedi"});
                }
            
            }
        }
    });

    router.delete("/:id", async (req, res) =>{
        try {
            let existPost = await Post.findById(req.params.id);
            if(!existPost){
                res.status(404).json({message: "Belirtilen id li post bulunamadı"});
            }else{
                await Post.remove(req.params.id);
                res.status(200).json(existPost);
            }
        } catch (e) {
            res.status(500).json({message: "Gönderi silinemedi"});
        }
    })

    router.get("/:id/comments", async (req, res) => {
        try {
            let existPost = await Post.findById(req.params.id);
            if(!existPost){
                res.status(404).json({message:"Girilen id'li gönderi bulunamadı"});
            }else {
                let comments = await Post.findPostComments(req.params.id);
                res.status(200).json(comments);
            }
        } catch (error) {
            res.status(500).json({message: "belirtilen id li cımmente ulaşılamadı"});
        }
    })
    
module.exports = router;