import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
export interface ToDo {
  id: string;
  text: string;
  completed: boolean;
}
interface ToDoState {
  todos: ToDo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}
export const useToDoStore = create<ToDoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => ({
          todos: [...state.todos, { id: uuidv4(), text, completed: false }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'serenedash-todo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);