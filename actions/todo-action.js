"use server"
import { connectDb } from "@/lib/db"
import Todo from "@/models/todo"
import { todoSchema } from "@/schemas/todo-schema"


export async function addTodo(data) {
    await connectDb()
    const valdatedFields = todoSchema.safeParse(data)

    if (!valdatedFields.success) {
        return { error: 'Invalid Fields' }
    }

    try {
        const newTodo = await Todo.create(valdatedFields.data)
        return JSON.parse(JSON.stringify(newTodo))
    } catch (error) {
        console.error("Failed to create todo:", error)
        return { error: "failed to create todo" }
    }
}

export async function getTodos() {
    await connectDb()
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 })
        return JSON.parse(JSON.stringify(todos))
    } catch (error) {
        console.error("Failed to fatch todo:", error)
        return { error: "failed to fetch todo" }
    }
}

export async function toggleTodo(id, completed) {
    await connectDb()
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        )
        return JSON.parse(JSON.stringify(updatedTodo))
    } catch (error) {
        console.error("Failed to toggle todo:", error)
        return { error: "failed to toggle todo" }
    }
}

export async function deleteTodo(id) {
    await connectDb()
    try {
        await Todo.findByIdAndDelete(id)

        return {
            success: true
        }
    } catch (error) {
        console.error("Failed to delete todo:", error)
        return { error: "failed to delete todo" }
    }
}

