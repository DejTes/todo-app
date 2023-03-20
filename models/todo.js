const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
    list: {
        type: String,
        required: true
    }
})

const todo = mongoose.model('Todo', todoSchema);
module.exports = todo;