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

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
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

