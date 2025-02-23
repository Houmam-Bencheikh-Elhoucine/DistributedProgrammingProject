const express = require("express")
const mongoose = require("mongoose")
const post_model = require("./models/post")

require("dotenv").config()

app = express()


app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.method, req.path)
    next()
})


app.get("/", async(req, res)=>{
    post_model.find().then((data) =>{
        res.status(200).json({
            "content": data
        })
    }).catch((error)=>{
        res.status(400).json({"message": error.message})
    })
})

app.get("/:id", async(req, res)=>{
    post_model.find({_id: req.params.id}).then((data) =>{
        res.status(200).json({
            "content": data
        })
    }).catch((error)=>{
        res.status(400).json({"message": error.message})
    })
})

app.post("/", (req, res)=>{
    const {title, author, content} = req.body
    console.log(req)
    console.log(`Title: ${title}\nAuthor: ${author}\nContent: ${content}`)
    post_model.create({"title": title, "author": author, "content": content})
    res.status(200).json({"message": "Success"})
})

app.delete("/:id", (req, res)=>{
    console.log(req.id)
    post_model.deleteOne({_id:req.params.id}).then(
        ()=>{
            res.status(200).json({"message": "Success"})
        }
    ).catch((error)=>{
        res.status(400).json({message: error.message})
    })
})
mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        app.listen(process.env.PORT)
        console.log(`Connected to DB and listening on port ${process.env.PORT}`)        
    }
).catch(
    (error)=>{
        console.error(error)
    }
)

