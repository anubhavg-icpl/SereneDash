import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useFocusStore } from '@/stores/useFocusStore';
import { useToDoStore, ToDo } from '@/stores/useToDoStore';
import { ToDoItem } from '@/components/ToDoItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
const quotes = [
    "The secret of getting ahead is getting started.",
    "The best way to predict the future is to create it.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Well done is better than well said."
];
const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
export function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState(getGreeting());
  const [quote, setQuote] = useState('');
  const { focus, setFocus } = useFocusStore();
  const { todos, addTodo, toggleTodo, deleteTodo } = useToDoStore();
  const [newTodoText, setNewTodoText] = useState('');
  const [showTodoInput, setShowTodoInput] = useState(false);
  const todoInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const greetingTimer = setInterval(() => setGreeting(getGreeting()), 60000);
    setQuote(getRandomQuote());
    return () => {
      clearInterval(timer);
      clearInterval(greetingTimer);
    };
  }, []);
  useEffect(() => {
    if (showTodoInput) {
      todoInputRef.current?.focus();
    }
  }, [showTodoInput]);
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
      setShowTodoInput(false);
    }
  };
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center font-sans">
      <div className="fixed inset-0 bg-gradient-animation -z-10" />
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center"
      >
        <div className="flex flex-col items-center space-y-12 md:space-y-16">
          <motion.div variants={itemVariants} className="w-full">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white tracking-tighter">
              {greeting}
            </h1>
            <p className="text-2xl md:text-3xl font-mono text-gray-300 mt-2">
              {format(currentTime, 'HH:mm:ss')}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-2xl font-semibold text-gray-200">What is your main focus for today?</h2>
            <Input
              type="text"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="Type your focus here..."
              className="mt-4 w-full max-w-lg mx-auto bg-white/5 border-0 text-white text-center text-xl placeholder:text-gray-500 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 h-14 rounded-lg"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="w-full text-left">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-200">To-Do List</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowTodoInput(true)} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                    <Plus className="w-5 h-5"/>
                </Button>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {todos.map((todo: ToDo) => (
                  <ToDoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {showTodoInput && (
                  <motion.form
                    onSubmit={handleAddTodo}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Input
                      ref={todoInputRef}
                      value={newTodoText}
                      onChange={(e) => setNewTodoText(e.target.value)}
                      onBlur={() => { if(!newTodoText) setShowTodoInput(false) }}
                      placeholder="Add a new task..."
                      className="flex-grow bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-gray-900 h-11 rounded-md"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-center text-gray-500 text-sm"
      >
        <p>{quote}</p>
      </motion.footer>
    </div>
  );
}