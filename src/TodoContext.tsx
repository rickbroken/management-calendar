import * as React from 'react';

export type Todo = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  createdAt: Date;
};

interface TodoContextValue {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, updates: Partial<Omit<Todo, 'id'>>) => void;
  removeTodo: (id: number) => void;
}

const TodoContext = React.createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    setTodos((prev) => [...prev, { ...todo, id: Date.now() }]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const updateTodo = (id: number, updates: Partial<Omit<Todo, 'id'>>) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, updateTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoStore() {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoStore must be used within a TodoProvider');
  }
  return context;
}

