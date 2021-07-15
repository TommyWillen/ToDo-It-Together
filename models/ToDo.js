const { model, Schema } = require("mongoose");

const ToDoSchema = new Schema({
    name: String,
    time: String,
    date: String,
    username: String,
    body: String,
    isComplete: Boolean,
    reminders: [
        {
            body: String,
            username: String,
            alertTime: String,
            alertDate: String
        }
    ],
    globality: Boolean,
    canRemind: {type: Boolean, default: false},
    canComment: {type: Boolean, default: false},
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    category: String,
    isPublic: {type: Boolean, default: false},
    viewList: [
        {
            username: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

module.exports = model("ToDos", ToDoSchema)