import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "please provided title for the todo"]

        },
        completed: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)

export default Todo