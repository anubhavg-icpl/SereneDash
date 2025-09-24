import React from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ToDo } from '@/stores/useToDoStore';
import { cn } from '@/lib/utils';
interface ToDoItemProps {
  todo: ToDo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}
export const ToDoItem: React.FC<ToDoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group flex items-center gap-4 p-2 rounded-md transition-colors duration-200 hover:bg-white/5"
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 rounded-[4px] border-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          'flex-grow cursor-pointer text-lg font-medium text-gray-300 transition-all duration-300',
          todo.completed && 'line-through text-gray-500'
        )}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-md text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/10 hover:text-gray-300"
        onClick={() => deleteTodo(todo.id)}
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};