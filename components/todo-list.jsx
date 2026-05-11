"use client"
import React from 'react'
import TodoItem from './todo-item'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '@/actions/todo-action'
import { Loader2 } from 'lucide-react'

const TodoList = () => {
    const { data: todos, isPending, error } = useQuery({
        queryKey: ["todos"],
        queryFn: () => getTodos()
    })

    if (isPending) {
        return (
            <Loader2 className='animate-spin' />
        )
    }

    if (error) {
        return (
            <div className='flex justify-center p-8'>
                Failed to load Todos
            </div>
        )
    }

    if (!todos && todos.length === 0) {
        return (
            <div className='text-centeer p-8 text-muted-foreground'>
                No task yet, Add one to get Started
            </div>
        )
    }


    return (
        <div className='space-y-1'>
            {
                todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))
            }
        </div>
    )
}

export default TodoList