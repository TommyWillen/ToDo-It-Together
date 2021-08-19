const { model, Schema } = require("mongoose");

const ToDoSchema = new Schema({
    toDoName: {
        type: String,
        default: "todo"
    },
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
    category: {type: String, default: "todo"},
    isPublic: {type: Boolean, default: true},
    viewList: [
        {
            username: String
        }
    ],
    createdAt: String,
    color: {type: String, default: "green"},
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

module.exports = model("ToDos", ToDoSchema)