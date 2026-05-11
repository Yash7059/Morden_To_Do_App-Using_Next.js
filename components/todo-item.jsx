import React from 'react'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodo, toggleTodo } from '@/actions/todo-action'
import { toast } from 'sonner'

const TodoItem = ({ todo }) => {
    const queryClient = useQueryClient()
    const { mutate: toggle } = useMutation({
        mutationFn: ({ id, completed }) => toggleTodo(id, completed),
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)
            toast.error(error)
        }
    })

    const { mutate: remove } = useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: () => {
            toast.success("Todo Is Deleted")
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)
            toast.error(error)
        }
    })

    return (
        <div className='flex items-center justify-between p-4 bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow mb-3'>
            <div className='flex items-center gap-3'>
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) => toggle({ id: todo._id, completed: checked })}
                    id={`todo-${todo._id}`}
                />

                <label htmlFor={`todo-${todo._id}`} className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                    todo.completed && "line-through text-muted-foreground"
                )}>
                    {todo.title}
                </label>
            </div>
            <Button
                onClick={() => remove(todo._id)}
                variant='destructive'
                size='icon'
            >
                <Trash size={18} />
            </Button>
        </div>
    )
}

export default TodoItem