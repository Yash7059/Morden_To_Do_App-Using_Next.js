"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '@/actions/todo-action'
import { toast } from 'sonner'

const TodoForm = () => {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState("")
    const mutaion = useMutation({
        mutationFn: (data) => addTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["todos"]
            })
            toast.success("todo added successfully")
        },
        onError: (error) => {
            toast.error("failed to add todo")
            console.error(error)

        }
    })

    const handlesubmit = async (e) => {
        e.preventDefault()
        mutaion.mutate({ title },{
            onSuccess:()=>{
                setTitle("")
            }
        })
    }


    return (
        <form action="" onSubmit={handlesubmit} className='flex gap-2 mb-8'>
            <Input
                type={"text"}
                value={title}
                placeholder="Add a new Task"
                onChange={(e) => setTitle(e.target.value)}
                className={"flex-1"}
                disabled={mutaion.isPending}
            />
            <Button type="submit">
                <Plus size={20} className='mr-2' />
                {
                    mutaion.isPending ? "Adding..." : "Add"
                }
            </Button>
        </form>
    )
}

export default TodoForm