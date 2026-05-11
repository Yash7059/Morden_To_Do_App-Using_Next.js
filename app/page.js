import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { Button } from "@/components/ui/button";
import { connectDb } from "@/lib/db";
import { CheckCircle } from "lucide-react";


export default async function Home() {
  await connectDb()

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 sm:p-12 md:p-24">
      <main className="w-full max-w-2xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <CheckCircle size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
              Quest Log
            </h1>
          </div>
          <p className="text-slate-500 dark:text-zinc-400">
            Organize your daily tasks and archive your goals.
          </p>


        </header>
        <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <TodoForm />
          <TodoList />
        </section>

        <footer className="pt-8 text-center border-t border-slate-200 dark:border-zinc-800">
          <p className="text-sm text-slate-400 dark:text-zinc-500">
            powered by Next.js , Mongoose & Tanstack Query
          </p>
        </footer>
      </main>
    </div>
  );
}
