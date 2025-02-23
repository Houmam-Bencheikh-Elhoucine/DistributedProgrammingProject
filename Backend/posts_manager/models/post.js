const mongoose = require("mongoose")

const Schema = mongoose.Schema

const post = {
    "title": {
        "type": "String", 
        "required": true,
    }, 
    "author": {
        "type":"Number", 
        required: true,
    }, 
    "content": {
        "type": "String", 
        required: true,
    }, 
}

module.exports = mongoose.model("post", new Schema(post, {timestamp: true}))