const { model, Schema } = require("mongoose");

const ToDoSchema = new Schema({
    toDoName: String,
    time: {
        type: String,
        default: ""
    },
    day: {
        type: String,
        default: ""
    },
    month: {
        type: String,
        default: ""
    },
    year: {
        type: String,
        default: ""
    },
    username: String,
    body: String,
    isComplete: {
        type: Boolean,
        default: false
    },
    reminders: [
        {
            body: String,
            username: String,
            alertTime: String,
            alertDate: String
        }
    ],
    globality: {
        type: Boolean,
        default: true
    },
    canRemind: {type: Boolean, default: false},
    canComment: {type: Boolean, default: true},
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    category: String,
    isPublic: {type: Boolean, default: true},
    viewList: [
        {
            username: String
        }
    ],
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

module.exports = model("ToDos", ToDoSchema)